"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "@/components/admin/Products";
import queryString from "query-string";

const getProducts = async (searchParams) => {
  try {
    const urlParams = {
      page: searchParams.page,
    };
    const searchQuery = queryString.stringify(urlParams);
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

const HomePage = ({ searchParams }) => {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(searchParams);
      if (data) {
        setProductsData(data);
      }
    };
    fetchData();
  }, [searchParams]);

  if (!productsData) {
    // betoltes alapot
    return <p>Loading...</p>;
  }

  return <Products data={productsData} />;
};

export default HomePage;
