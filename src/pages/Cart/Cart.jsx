import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Shopping Cart</h2>

          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.thumbnail} alt={item.title} className="cart-img" />

              <div className="cart-details">
                <h3>{item.title}</h3>

                <p className="stock">✓ In Stock</p>

                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Delete
                </button>
              </div>

              <div className="cart-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>
            Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            items)
          </h3>

          <h2>
            $
            {cartItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>

          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
