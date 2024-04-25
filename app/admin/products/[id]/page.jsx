"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const HomePage = ({ params }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProduct(params.id);
      if (data) {
        setProductData(data.product);
      }
    };
    fetchData();
  }, [params.id]);

  if (!productData) {
    // Itt kezelheted az adatok betöltésének állapotát, pl. loading ikon vagy üzenet
    return <p>Betöltés...</p>;
  }

  return <UpdateProduct data={productData} />;
};

export default HomePage;
