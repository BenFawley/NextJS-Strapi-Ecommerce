import Navbar from "./Navbar";

async function getNavLinks() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${url}/api/categories`);
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

const Header = async () => {
  const links = await getNavLinks();

  return (
    <header className="h-25 sticky left-0 right-0 top-0 z-50 z-50 flex items-center justify-between border-b border-slate-300 bg-white shadow-sm">
      <Navbar links={links} />
    </header>
  );
};

export default Header;
