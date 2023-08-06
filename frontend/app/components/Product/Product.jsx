import Link from "next/link";
import Image from "next/image";

const Product = ({ slug, name, price, description, image }) => {
  const imgUrl = process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url;
  return (
    <Link className="w-1/2 overflow-hidden md:w-3/12" href={`/product/${slug}`}>
      <div className="relative">
        <Image
          src={imgUrl}
          alt={name}
          width={image.data.attributes.width}
          height={image.data.attributes.height}
          className="max-w-full"
        />
        <div className="absolute left-0 top-0 h-full w-full cursor-pointer bg-black bg-opacity-80 text-white opacity-0 transition-all duration-300 hover:opacity-100">
          <h3 className="p-5 text-xl">{name}</h3>
          <p className="p-5">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-3">
        <p className="font-medium">{name}</p>
        <p className="font-medium">{price}</p>
      </div>
    </Link>
  );
};

export default Product;
