import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const getAddresses = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  console.log("sessiontoken", nextAuthSessionToken);
  console.log("api_url", process.env.API_URL);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${"__Secure-next-auth.session-token"}=${"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ISf0mARG941owisX.Nl-jDSqPJEsPAIOwiFXr8Txdlliv2-egdkjJGWLkuhQybqjLNnd-gaCHap5RLnFU6x1Xz0DK5aBaGEVwsdL5ASZNCM2XjSlcjno4Bzu7XjCqJSCycRqhV9ukLbiNc4uLCtDmZGFpsTSBMllRccCTmkn-lU9u1eskukoUlx2dSM3QBOL_TSwPck4bO0bA4_F3vlnoBPfo1s7ciShJwMUAGNvX-qYCKl547fF03-VLgPk3b2i92C-144tUylKBTrjjUDXn42Etgj1Bqm7lD7zEGwF9AMogeUXUBQZNpnuoRiXzz6X6Lr_8GJ3CZI7n2frxzdOiPfkUkTz272sTNJxAK7sVtrJEHvMMaUZzh2aeeCYDMXM0ZIz95S0gQpHBipYwrXs.y4fu5rO_N8WwXr9Xtj84hg"}`,
    },
  });

  return data?.addresses;
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
