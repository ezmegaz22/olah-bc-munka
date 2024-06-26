import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Jelentkezz be, hogy elérd a következő útvonalat!", 401));
  }

  req.user = session.user;

  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Nem (${req.user.role}) rendelkezik jogosultsággal ehhez az erőforráshoz.`
        )
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
