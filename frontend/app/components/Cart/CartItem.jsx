"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

const CartItem = ({ name, price, quantity, image }) => {
  const imgUrl = process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url;
  return (
    <div className="mt-5 flex w-full justify-between ">
      <Image
        src={imgUrl}
        alt={name}
        width={image.data.attributes.width}
        height={image.data.attributes.height}
        className="w-20"
      />
      <div className="flex w-4/5 justify-between">
        <div className="p-2">
          <p className="mb-2 font-semibold">{name}</p>
          <p>Qty: {quantity}</p>
        </div>
        <div className="p-2">
          <Trash2 className="mb-2 ml-auto hover:cursor-pointer" />
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
