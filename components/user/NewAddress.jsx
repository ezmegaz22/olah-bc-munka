"use client";

import React, { useState, useContext, useEffect } from "react";

import Sidebar from "../layouts/Sidebar";

import { countries } from "countries-list";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

const NewAddress = () => {
  const { error, addNewAddress, clearErrors } = useContext(AuthContext);

  const countriesList = Object.values(countries);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhonoNo] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const newAddress = {
      street,
      city,
      zipCode,
      phoneNo,
      country,
    };

    addNewAddress(newAddress);
  };

  return (
    <>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
                style={{ maxWidth: "480px" }}
              >
                <form onSubmit={submitHandler}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Hozz létre egy új címet
                  </h2>

                  <div className="mb-4 md:col-span-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1">Utca</label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder=""
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Város</label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1">Posta kód</label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder=""
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1">Telefonszám</label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="tel"
                        placeholder=""
                        value={phoneNo}
                        onChange={(e) => setPhonoNo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1">Ország</label>
                    <select
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Hozzáadás
                  </button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAddress;
