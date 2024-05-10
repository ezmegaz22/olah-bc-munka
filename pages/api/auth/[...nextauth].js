import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";


export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Nem sikerült azonosítani a felhasználót. Kérjük, ellenőrizze az e-mail címét és a jelszót!");
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error("Nem sikerült azonosítani a felhasználót. Kérjük, ellenőrizze az e-mail címét és a jelszót!");
          }
          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        if (req.url === "/api/auth/session?update") {
         

          const updatedUser = await User.findById(token.user._id);
          token.user = updatedUser;
        }

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;

        // toroljuk a sessionbol a jelszót ne lassak a felhasznalok
        delete session?.user?.password;

        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
