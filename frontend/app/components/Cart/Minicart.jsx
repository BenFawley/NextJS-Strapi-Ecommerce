"use client";

import CartContext from "../../context/cart-context";
import { useContext } from "react";
import { X } from "lucide-react";
import CartItem from "./CartItem";

const emptyCart = <p>You have no items in the cart.</p>;

const Minicart = () => {
  const cartCtx = useContext(CartContext);
  const visible = cartCtx.cartState.isVisible;
  const cartItems = cartCtx.cartState.items;

  return (
    <div className="relative mx-auto px-6 xl:max-w-7xl">
      <div className="absolute right-0 w-2/5">
        <div
          className={`${
            visible ? "z-40 translate-y-0 opacity-100" : "-translate-y-full"
          }  fixed  w-4/5 max-w-lg border-2 border-slate-100 bg-slate-100 bg-white p-6 opacity-0 transition-all duration-300`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <X onClick={cartCtx.onShowCart} className="hover:cursor-pointer" />
          </div>
          <div className="flex flex-col items-center justify-center">
            {cartItems < 1
              ? emptyCart
              : cartItems.map((item) => {
                  return (
                    <CartItem
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                    />
                  );
                })}
          </div>
          <p className="mt-4">
            Total price:{" "}
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Minicart;
