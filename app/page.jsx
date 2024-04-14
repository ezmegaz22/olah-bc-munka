import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";

import queryString from "query-string";

// const getProducts = async (searchParams) => {
//   const urlParams = {
//     keyword: searchParams.keyword,
//     page: searchParams.page,
//     category: searchParams.category,
//     "price[gte]": searchParams.min,
//     "price[lte]": searchParams.max,
//     "ratings[gte]": searchParams.ratings,
//   };

//   const searchQuery = queryString.stringify(urlParams);

//   const { data } = await axios.get(
//     `${process.env.API_URL}/api/products?${searchQuery}`
//   );
//   return data;
// };

const Page = async ({ searchParams }) => {
  //const productsData = await getProducts(searchParams);

  return (
    <ListProducts
      data={{
        resPerPage: 1,
        productsCount: 1,
        filteredProductsCount: 1,
        products: [
          {
            _id: "asdasdas",
            name: "asdasdas",
            description: "asdsadsadasa",
            price: 145,
            category: "Monitor",
            seller: "test",
            stock: 345,
            ratings: 3,
            user: "asdasdsadasdasdas312312",
            images: [],
            reviews: [],
          },
        ],
      }}
    />
  );
};

export default Page;
