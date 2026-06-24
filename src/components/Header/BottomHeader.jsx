import { IoMenu } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./BottomHeader.css";

const NAV_LINKS = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/shop" },
  { title: "Deals", path: "/deals" },
  { title: "New Arrivals", path: "/new-arrivals" },
  { title: "Brands", path: "/brands" },
];

function BottomHeader() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bottom-header">
      {/* Categories button + dropdown */}
      <div className="categories-wrapper" ref={dropdownRef}>
        <button
          className="categories-btn"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <IoMenu className="cat-menu-icon" />
          <span className="cat-label">Categories</span>
          <IoChevronDown
            className={`cat-chevron ${open ? "cat-chevron--open" : ""}`}
          />
        </button>

        {open && (
          <ul className="category-dropdown" role="menu">
            {categories.map((category, index) => (
              <li key={index} role="none">
                <Link
                  to={`/category/${category.slug}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <div className="header-divider" aria-hidden="true" />

      {/* Nav links */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <ul className="nav-list">
          {NAV_LINKS.map((link) => (
            <li key={link.title}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
                end={link.path === "/"}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default BottomHeader;
