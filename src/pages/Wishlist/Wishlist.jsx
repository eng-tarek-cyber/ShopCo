import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist, addtoCart } = useContext(CartContext);

  return (
    <div className="wishlist-page">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">لا توجد منتجات في المفضلة</div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <h3>{item.title}</h3>

              <p className="wishlist-price">${item.price}</p>

              <div className="wishlist-actions">
                <button className="cart-btn" onClick={() => addtoCart(item)}>
                  Add To Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
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
