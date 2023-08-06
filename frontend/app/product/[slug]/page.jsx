import ProductDetails from "@/app/components/Product/ProductDetails";

async function getProductDetails(slug) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${url}/api/products?filters[slug][$eq]=${slug}&populate[0]=image`
    );
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const ProductDetailsPage = async ({ params: { slug } }) => {
  const productArray = await getProductDetails(slug);
  const product = productArray.data[0];

  return (
    <ProductDetails
      id={product.id}
      name={product.attributes.name}
      price={product.attributes.price}
      description={product.attributes.description}
      image={product.attributes.image}
    />
  );
};

export default ProductDetailsPage;
