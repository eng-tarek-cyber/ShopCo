import { CiSearch, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import "./TopHeader.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../../pages/Login/Login";

function TopHeader() {
  const { cartItems, wishlist } = useContext(CartContext);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${value}`,
      );

      const data = await res.json();

      setSuggestions(data.products.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setSuggestions([]);
    navigate(`/search?q=${searchTerm}`);
  };
  return (
    <header className="top-header">
      {/* Logo */}
      <a href="/" className="logo">
        <FaShoppingCart className="logo-icon" />
        <span className="logo-title">
          Shop<span className="logo-accent">Co</span>
        </span>
      </a>

      {/* Search */}
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button className="search-btn" onClick={handleSearch}>
          <CiSearch />
        </button>
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className="suggestion-item"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  setSuggestions([]);
                }}
              >
                <img src={item.thumbnail} alt={item.title} />

                <div className="suggestion-info">
                  <h4>{item.title}</h4>

                  <span className="category">{item.category}</span>

                  <p className="price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="header-actions">
        {/* Wishlist */}
        <button className="action-btn" onClick={() => navigate("/wishlist")}>
          <CiHeart className="action-icon" />
          <span className="action-label">Wishlist</span>
          <span className="wishlist-badge">{wishlist.length}</span>
        </button>

        {/* Cart */}
        <button className="action-btn" onClick={() => navigate("/cart")}>
          <CiShoppingCart className="action-icon" />
          <span className="action-label">Cart</span>
          <span className="cart-badge">{cartItems.length}</span>
        </button>

        {/* User */}
        <button className="action-btn" onClick={() => navigate("/login")}>
          <CiUser className="action-icon" />

          <span className="action-label">Login / Register</span>
        </button>
      </div>
    </header>
  );
}

export default TopHeader;
