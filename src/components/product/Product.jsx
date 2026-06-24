import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import "./Product.css";
import "../../index.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function StarRating({ rating }) {
  return (
    <div className="prod-stars">
      {[1, 2, 3, 4, 5].map((s) => {
        if (s <= Math.floor(rating))
          return <FaStar key={s} className="star star--full" />;
        if (s === Math.ceil(rating) && !Number.isInteger(rating))
          return <FaStarHalfAlt key={s} className="star star--half" />;
        return <FaRegStar key={s} className="star star--empty" />;
      })}
      <span className="prod-rating-num">{rating?.toFixed(1)}</span>
    </div>
  );
}

function Product({ item }) {
  const { cartItems, addtoCart, addToWishlist, wishlist } =
    useContext(CartContext);

  const isInWishlist = wishlist.some((i) => i.id === item.id);

  const discount = Math.round(item.discountPercentage || 0);
  const originalPrice = discount
    ? (item.price / (1 - discount / 100)).toFixed(2)
    : null;
  const isInCart = cartItems.some((i) => i.id === item.id);
  return (
    <div className="product">
      {/* Discount badge */}
      {discount >= 5 && (
        <span className="prod-discount-badge">-{discount}%</span>
      )}

      {/* Floating action icons */}
      <div className="prod-icons">
        <span
          className={`prod-icon ${isInCart ? "disabled" : ""}`}
          title={isInCart ? "موجود بالسلة" : "أضف للسلة"}
          onClick={() => addtoCart(item)}
        >
          <FaCartArrowDown />
        </span>
        <span
          className={`prod-icon ${isInWishlist ? "disabled" : ""}`}
          title={isInWishlist ? "موجود بالمفضلة" : "أضف للمفضلة"}
          onClick={() => addToWishlist(item)}
        >
          <FaRegHeart />
        </span>
        <span className="prod-icon" title="مشاركة">
          <FaShare />
        </span>
      </div>

      {/* Image */}
      <Link to={`/product/${item.id}`} className="prod-img-link">
        <div className="img_product">
          <img src={item.thumbnail} alt={item.title} loading="lazy" />
        </div>
      </Link>

      {/* Brand */}
      <span className="prod-brand">{item.brand || item.category}</span>

      {/* Name */}
      <Link to={`/product/${item.id}`} className="name_product">
        {item.title}
      </Link>

      {/* Stars */}
      <StarRating rating={item.rating} />

      {/* Price */}
      <div className="prod-price-row">
        <span className="price">${item.price}</span>
        {originalPrice && (
          <span className="prod-original">${originalPrice}</span>
        )}
      </div>
    </div>
  );
}

export default Product;
