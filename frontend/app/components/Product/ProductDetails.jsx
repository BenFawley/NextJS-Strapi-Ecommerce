"use client";

import { useContext } from "react";
import CartContext from "@/app/context/cart-context";
import Image from "next/image";

const ProductDetails = ({ id, name, price, description, image }) => {
  const cartCtx = useContext(CartContext);

  const addToCart = () => {
    cartCtx.onAddToCart({
      id: id,
      name: name,
      price: Number(price.toFixed(2)),
      description: description,
      image,
      quantity: 1,
    });
  };

  const imgUrl = process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url;

  return (
    <div className="mt-10 flex justify-between">
      <div className="w-3/5">
        <Image
          src={imgUrl}
          alt={name}
          width={image.data.attributes.width}
          height={image.data.attributes.height}
        />
      </div>
      <div className="w-2/5">
        <h1 className="text-4xl font-semibold">{name}</h1>
        <p>{price}</p>
        <p>{description}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
