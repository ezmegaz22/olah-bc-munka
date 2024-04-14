import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const getAddresses = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });

  return data?.addresses;
};

const ProfilePage = async () => {
  try {
    const addresses = await getAddresses();
    console.log("Fetched addresses:", addresses); // Log fetched addresses

    return <Profile addresses={addresses} />;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    // Handle error gracefully, e.g., display an error message
    return <div>Error fetching addresses. Please try again later.</div>;
  }
};

export default ProfilePage;
