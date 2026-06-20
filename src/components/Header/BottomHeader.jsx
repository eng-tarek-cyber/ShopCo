// import React from "react";
import { IoMenu } from "react-icons/io5"; // أيقونة أقرب للتصميم
import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

const NavLinks = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/shop" },
  { title: "Deals", path: "/deals" },
  { title: "New Arrivals", path: "/new-arrivals" },
  { title: "Brands", path: "/brands" },
];
function BottomHeader() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="header-container">
      {/* زر الـ Categories */}
      <div className="categories-btn"
       onClick={() => setOpen(!open)}>
        <IoMenu className="iconCategories" />
        <span>Categories</span>
        {open && (
          <div className="category_nav_list">
            {categories.map((category, index) => (
              <Link key={index} to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* الروابط */}
      {/* الروابط - تم استخدام المصفوفة هنا */}
      <nav className="navbar">
        <ul className="nav-links">
          {NavLinks.map((link) => (
            <li key={link.title}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default BottomHeader;
