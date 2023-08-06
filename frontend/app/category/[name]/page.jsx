import Product from "@/app/components/Product/Product";

async function getProducts(name) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${url}/api/products?filters[categories][name][$eq]=${name}&populate[0]=image`
    );
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const CategoryPage = async ({ params: { name } }) => {
  const products = await getProducts(name);
  console.log(products);

  return (
    <div className="mx-auto px-6 xl:max-w-7xl">
      <h2 className="my-8 text-4xl capitalize">{name}</h2>
      <div className="flex items-center justify-start gap-4">
        {products.data.map((product) => (
          <Product
            key={product.id}
            slug={product.attributes.slug}
            name={product.attributes.name}
            price={product.attributes.price}
            description={product.attributes.description}
            image={product.attributes.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
