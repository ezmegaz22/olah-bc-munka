"use client";

import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/navigation";
import { getPriceQueryParams } from "@/helpers/helpers";

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const router = useRouter();

  let queryParams;

  function handleClick(checkbox) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      // Delete the filter from query
      queryParams.delete(checkbox.name);
    } else {
      // Set filter in the query
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  }

  function handleButtonClick() {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      queryParams = getPriceQueryParams(queryParams, "min", min);
      queryParams = getPriceQueryParams(queryParams, "max", max);

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 px-4">
      {/* Ár (€) szűrő */}
      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <h3 className="text-lg font-semibold mb-3">Ár (€)</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Minimum ár */}
          <input
            name="min"
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          {/* Maximum ár */}
          <input
            name="max"
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        {/* Szűrés gomb */}
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:bg-blue-600"
          onClick={handleButtonClick}
        >
          Szűrés
        </button>
      </div>

      {/* Kategória szűrő */}
      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <h3 className="text-lg font-semibold mb-3">Kategória</h3>
        <ul className="space-y-2">
          {/* Laptop checkbox */}
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Laptop"
                className="h-4 w-4 mr-2 text-blue-500"
                defaultChecked={checkHandler("category", "Laptop")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="text-gray-800">Laptop</span>
            </label>
          </li>
          {/* Fejhallgató checkbox */}
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Fejhallgató"
                className="h-4 w-4 mr-2 text-blue-500"
                defaultChecked={checkHandler("category", "Fejhallgató")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="text-gray-800">Fejhallgató</span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Monitor"
                className="h-4 w-4 mr-2 text-blue-500"
                defaultChecked={checkHandler("category", "Monitor")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="text-gray-800">Monitor</span>
            </label>
          </li>
        </ul>
      </div>

      {/* Értékelés szűrő */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Értékelés</h3>
        <ul className="space-y-2">
          {/* Csillagok checkbox */}
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <label className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4 mr-2 text-blue-500"
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="text-gray-800">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
