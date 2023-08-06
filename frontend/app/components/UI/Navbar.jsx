"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.webp";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { useState, useContext } from "react";
import CartContext from "@/app/context/cart-context";

const Navbar = ({ links }) => {
  const [isClosed, setIsClosed] = useState(false);

  const cartCtx = useContext(CartContext);

  const toggleMenu = () => {
    setIsClosed((prevState) => !prevState);
  };
  return (
    <div className="container mx-auto flex h-full w-full items-center justify-between px-4 xl:max-w-7xl">
      <Link href="/">
        <Image
          src={Logo}
          alt="JLM Logo"
          quality={100}
          width={100}
          height={100}
        />
      </Link>
      <nav className="hidden  gap-5 md:flex">
        {links.data.map((link) => {
          return (
            <Link
              key={link.id}
              id={link.id}
              className="bg-transparents p-3 capitalize text-black underline-offset-4 transition-all hover:underline active:underline"
              href={`/category/${link.attributes.name}`}
            >
              {link.attributes.name}
            </Link>
          );
        })}
        <div className="flex flex-col items-center justify-center">
          <ul className="flex items-center gap-3">
            <li title="Search">
              <Search className="cursor-pointer" />
            </li>
            <li title="Profile">
              <Link href="/profile">
                <User className="cursor-pointer" />
              </Link>
            </li>
            <li title="Minicart">
              <div className="relative" onClick={cartCtx.onShowCart}>
                {/* <Link href="/checkout"> */}
                <ShoppingCart className="cursor-pointer" />
                {cartCtx.cartState.totalQuantity > 0 && (
                  <span className="absolute -right-4 -top-3 z-10 w-7 rounded-full border-2 border-black bg-white text-center text-sm">
                    {cartCtx.cartState.totalQuantity}
                  </span>
                )}
                {/* </Link> */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {isClosed ? (
        <X
          onClick={toggleMenu}
          className="mr-2 h-6 w-6 cursor-pointer md:hidden"
        />
      ) : (
        <Menu
          onClick={toggleMenu}
          className="mr-2 h-6 w-6 cursor-pointer md:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
