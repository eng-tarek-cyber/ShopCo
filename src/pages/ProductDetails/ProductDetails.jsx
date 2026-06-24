import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import SlideProduct from "../../components/product/SlideProduct";
import "./ProductDetails.css";
import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";

function StarRating({ rating }) {
  return (
    <div className="pd-stars">
      {[1, 2, 3, 4, 5].map((s) => {
        if (s <= Math.floor(rating))
          return <FaStar key={s} className="pd-star pd-star--full" />;
        if (s === Math.ceil(rating) && !Number.isInteger(rating))
          return <FaStarHalfAlt key={s} className="pd-star pd-star--half" />;
        return <FaRegStar key={s} className="pd-star pd-star--empty" />;
      })}
      <span className="pd-rating-num">
        {rating?.toFixed(1)} ({Math.floor(Math.random() * 200) + 50} reviews)
      </span>
    </div>
  );
}

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [relatedProducts, setRelated] = useState([]);
  const { id } = useParams();
  const { addtoCart, addToWishlist } = useContext(CartContext);
  // Fetch product
  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch related products from same category (after product loads)
  useEffect(() => {
    if (!product?.category) return;
    fetch(
      `https://dummyjson.com/products/category/${product.category}?limit=10`,
    )
      .then((r) => r.json())
      .then((data) => {
        // Exclude current product
        const filtered = data.products.filter((p) => p.id !== product.id);
        setRelated(filtered);
      })
      .catch(console.error);
  }, [product]);

  if (loading)
    return (
      <div className="pd-skeleton-wrap">
        <div className="pd-skeleton pd-skeleton--img" />
        <div className="pd-skeleton-info">
          <div className="pd-skeleton pd-skeleton--title" />
          <div className="pd-skeleton pd-skeleton--line" />
          <div className="pd-skeleton pd-skeleton--line short" />
          <div className="pd-skeleton pd-skeleton--price" />
          <div className="pd-skeleton pd-skeleton--btn" />
        </div>
      </div>
    );

  if (!product) return <p className="pd-not-found">Product not found</p>;

  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount
    ? (product.price / (1 - discount / 100)).toFixed(2)
    : null;

  return (
    <>
      <section className="pd-section">
        <div className="pd-container">
          {/* ---- Images ---- */}
          <div className="pd-gallery">
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImg === i ? "pd-thumb--active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className="pd-main-img">
              {discount >= 5 && <span className="pd-badge">-{discount}%</span>}
              <img src={product.images[activeImg]} alt={product.title} />
            </div>
          </div>

          {/* ---- Details ---- */}
          <div className="pd-info">
            <span className="pd-brand">
              {product.brand || product.category}
            </span>
            <h1 className="pd-title">{product.title}</h1>
            <StarRating rating={product.rating} />

            <div className="pd-price-row">
              <span className="pd-price">${product.price}</span>
              {originalPrice && (
                <span className="pd-original">${originalPrice}</span>
              )}
              {discount >= 5 && (
                <span className="pd-save">وفّر {discount}%</span>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>
            <div className="pd-divider" />

            <div className="pd-meta">
              <div className="pd-meta-row">
                <span className="pd-meta-label">الإتاحة</span>
                <span
                  className={`pd-meta-val pd-stock ${product.stock > 0 ? "in" : "out"}`}
                >
                  {product.availabilityStatus}
                </span>
              </div>
              <div className="pd-meta-row">
                <span className="pd-meta-label">الماركة</span>
                <span className="pd-meta-val">{product.brand || "—"}</span>
              </div>
              <div className="pd-meta-row">
                <span className="pd-meta-label">الفئة</span>
                <span
                  className="pd-meta-val"
                  style={{ textTransform: "capitalize" }}
                >
                  {product.category}
                </span>
              </div>
              {product.stock <= 10 && (
                <div className="pd-low-stock">
                  ⚠️ باقي {product.stock} قطع فقط في المخزون!
                </div>
              )}
            </div>

            <div className="pd-divider" />

            <div className="pd-qty-row">
              <span className="pd-qty-label">الكمية</span>
              <div className="pd-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pd-actions">
              <button
                className="pd-btn-cart"
                onClick={() => addtoCart(product)}
              >
                <FaCartArrowDown />
                أضف للسلة
              </button>
              <button
                className={`pd-btn-icon ${wished ? "pd-btn-icon--wished" : ""}`}
                onClick={() => addToWishlist(product)}
                title="أضف للمفضلة"
              >
                <FaRegHeart />
              </button>
              <button
                className="pd-btn-icon"
                title="مشاركة"
                onClick={() =>
                  navigator.share?.({
                    title: product.title,
                    url: window.location.href,
                  })
                }
              >
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Products Slider ---- */}
      {relatedProducts.length > 0 && (
        <SlideProduct
          title={`منتجات مشابهة — ${product.category}`}
          categorySlug={product.category}
          data={relatedProducts}
        />
      )}
    </>
  );
}

export default ProductDetails;
