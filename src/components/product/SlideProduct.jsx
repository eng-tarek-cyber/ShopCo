import Product from "./Product";
import "./SliderProduct.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// "mens-shirts" → "Mens Shirts"
const formatTitle = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function SlideProduct({ title, data, categorySlug }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="sp-section">
      <div className="sp-container">
        {/* Header */}
        <div className="sp-header">
          <div className="sp-title-group">
            <h2 className="sp-title">{formatTitle(title)}</h2>
          </div>
          {categorySlug && (
            <Link to={`/category/${categorySlug}`} className="sp-see-all">
              عرض الكل →
            </Link>
          )}
        </div>

        {/* Swiper */}
        <Swiper
          loop={data.length >= 4}
          slidesPerView={5}
          spaceBetween={16}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="sp-swiper"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 12 },
            768: { slidesPerView: 4, spaceBetween: 14 },
            1024: { slidesPerView: 5, spaceBetween: 16 },
            1280: { slidesPerView: 6, spaceBetween: 16 },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Product item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SlideProduct;
