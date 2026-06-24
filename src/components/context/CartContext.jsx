import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  const addToWishlist = (item) => {
    const exists = wishlist.some((i) => i.id === item.id);

    if (exists) {
      toast.info("المنتج موجود بالفعل في المفضلة");
      return;
    }

    setWishlist((prev) => [...prev, item]);

    toast.success("تمت إضافة المنتج إلى المفضلة");
  };
  const addtoCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    toast.success("Added to cart 🛒");
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addtoCart,
        wishlist,
        addToWishlist,
        increaseQty,
        decreaseQty,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
