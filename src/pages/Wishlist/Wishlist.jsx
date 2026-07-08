import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist, addtoCart } = useContext(CartContext);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="wishlist-title">
          <h2>❤️ My Wishlist</h2>
          <p>You have {wishlist.length} items in your wishlist</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">لا توجد منتجات في المفضلة</div>
      ) : (
        <div className="wishlist-list">
          {wishlist.map((item) => (
            <div className="wishlist-row" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className="row-info">
                <h3>{item.title}</h3>
                <span className="price">${item.price}</span>
              </div>

              <button
                className="remove-x"
                onClick={() => removeFromWishlist(item.id)}
              >
                ✕
              </button>

              <div className="row-actions">
                <span className="row-price">${item.price}</span>
                <button className="cart-btn" onClick={() => addtoCart(item)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
