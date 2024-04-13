"use client";

import Chatbot from "@/components/chatbot/chatbot";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <SessionProvider>{children}</SessionProvider>
              <Chatbot />
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
