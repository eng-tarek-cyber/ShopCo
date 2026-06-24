// src/pages/CategoryProducts/CategoryProducts.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${slug}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(console.error);
  }, [slug]);

  return (
    <div className="container">
      <h2>{slug}</h2>

      <div className="category-page">
        <h2 className="category-title">{slug}</h2>

        <div className="category-products">
          {products.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
