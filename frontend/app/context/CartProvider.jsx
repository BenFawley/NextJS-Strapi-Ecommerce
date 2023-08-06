"use client";

import { CartContextProvider } from "./cart-context";

const CartProvider = ({ children }) => {
  return <CartContextProvider>{children} </CartContextProvider>;
};

export default CartProvider;
