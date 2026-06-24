import HeroSlider from "../../components/HeroSlider";
import SlideProduct from "../../components/product/SlideProduct";
import "./Home.css";
import { useState, useEffect } from "react";

const CATEGORIES = [
  "smartphones",
  "mobile-accessories",
  "sports-accessories",
  "kitchen-accessories",
  "groceries",
  "mens-watches",
  "laptops",
  "womens-watches",
  "mens-shirts",
  "skincare",
  "womens-shoes",
  "tops",
];

function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          CATEGORIES.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}?limit=10`,
            );
            const data = await res.json();
            return { [category]: data.products };
          }),
        );
        setProducts(Object.assign({}, ...results));
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="home-page">
      {/* 1 — Hero slider */}
      <HeroSlider />

      {/* 2 — Product sliders */}
      {loading ? (
        <div className="home-loading">
          {CATEGORIES.map((c) => (
            <div key={c} className="home-skeleton" />
          ))}
        </div>
      ) : (
        CATEGORIES.map((category) =>
          products[category]?.length ? (
            <SlideProduct
              key={category}
              title={category}
              categorySlug={category}
              data={products[category]}
            />
          ) : null,
        )
      )}
    </div>
  );
}

export default Home;
