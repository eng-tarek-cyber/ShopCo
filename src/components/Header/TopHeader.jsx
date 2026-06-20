import {
  CiShoppingCart,
  CiSearch,
  CiUser,
  CiHeart,
  CiMenuBurger,
} from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
// import logo from "../../assets/Images/logo.png";
// import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./Header.css";
function TopHeader() {
  return (
    <div className="contaier">
      <div className="column">
        <div className="Top-header">
          <div className="iconShop">
            <FaShoppingCart className="iconTopShop" />
            {/* <Link to="/">
              <img src={logo} alt="logo"  />
            </Link> */}
            <h1 className="title">ShopCo</h1>
          </div>
          <div className="search">
            <div>
              {/* الـ Input واخد مساحة الـ div كلها */}
              <input
                className="inbut"
                placeholder="search for products,brands and more"
              />
            </div>
            <div>
              {/* زرار البحث على اليمين */}
              <button className="searchbuton">
                <CiSearch />
              </button>
            </div>
          </div>
          <div className="icon">
            <div>
              <CiHeart className="iconTop" />
              <span>Wishlist</span>
            </div>
            <div>
              <CiShoppingCart className="iconTop" />
              <span>cart</span>
            </div>
            <div>
              <CiUser className="iconTop" />
              <span>Login</span>
              <span>/</span>
              <span>Register</span>
            </div>
            <div className="open_close">
              <CiMenuBurger />
              <IoClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopHeader;
