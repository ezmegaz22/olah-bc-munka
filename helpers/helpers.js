export const getPriceQueryParams = (queryParams, key, value) => {
  const hasValueInParam = queryParams.has(key);

  if (value && hasValueInParam) {
    queryParams.set(key, value);
  } else if (value) {
    queryParams.append(key, value);
  } else if (hasValueInParam) {
    queryParams.delete(key);
  }
  return queryParams;
};

export const parseCallbackUrl = (url) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
  return res;
};

export const getUserReview = (reviews, userId) => {
  let userReview = null;

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview = review;
    }
  });

  return userReview;
};
//
export const getCookiesName = () => {
  let cookieNames = "";

  if (process.env.NODE_ENV === "development") {
    cookieNames = "next-auth.session-token";
  }

  if (process.env.NODE_ENV === "production") {
    cookieNames = "__Secure-next-auth.session-token";
  }
  return cookieNames;
};
