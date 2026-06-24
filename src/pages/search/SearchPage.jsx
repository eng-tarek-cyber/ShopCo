import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/product/Product";
import "./SearchPage.css";
function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );

        const data = await res.json();

        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="search-page">
      <aside className="search-sidebar">
        <h3>Filters</h3>

        <div className="filter-box">
          <h4>Category</h4>
          <p>Beauty</p>
          <p>Fragrances</p>
          <p>Furniture</p>
          <p>Groceries</p>
        </div>

        <div className="filter-box">
          <h4>Rating</h4>
          <p>⭐⭐⭐⭐⭐</p>
          <p>⭐⭐⭐⭐ & Up</p>
          <p>⭐⭐⭐ & Up</p>
        </div>
      </aside>

      <main className="search-main">
        <div className="search-header">
          <h2>
            Results for <span>"{query}"</span>
          </h2>

          <p>{products.length} results</p>
        </div>

        <div className="products-grid">
          {products.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
