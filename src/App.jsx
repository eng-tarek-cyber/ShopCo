import BottomHeader from "./components/Header/BottomHeader";
import TopHeader from "./components/Header/TopHeader";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryProducts from "./components/product/Product1";
import "./index.css";
import CartPage from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import SearchPage from "./pages/search/SearchPage";
function App() {
  return (
    <>
      <header className="main-header">
        <TopHeader />
        <BottomHeader />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
