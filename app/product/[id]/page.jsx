import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import React from "react";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);
  return data?.product;
};

const ProductDetailsPage = async ({ params }) => {
  //ha rossz a url, akkor iranyitson vissza sima fooldal routera
  const validID = mongoose.isValidObjectId(params?.id);

  if (!validID) {
    return redirect("/");
  }

  const product = await getProductDetails(params.id);

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
