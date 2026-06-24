import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import laptopImage from "../assets/Images/laptop.jpg";
import laptopImage1 from "../assets/Images/laptop1.jpg";
import laptopImage2 from "../assets/Images/laptop2.jpg";
import laptopImage3 from "../assets/Images/laptop3.jpg";

import "./HeroSlider.css";

const slides = [
  {
    eyebrow: "لابتوب المستقبل بين يديك",
    title: "قوة لا تضاهى، وأداء فائق السرعة",
    desc: "مصمم للمحترفين والمبدعين، احصل على أقصى إنتاجية مع أحدث المعالجات.",
    img: laptopImage,
  },
  {
    eyebrow: "خصم حصري لفترة محدودة",
    title: "لابتوب الأحلام بسعر لا يصدق",
    desc: "استمتع بشاشة بدقة 4K وتصميم نحيف خفيف الوزن. العرض ينتهي قريباً!",
    img: laptopImage1,
  },
  {
    eyebrow: "رفيقك المثالي للعمل",
    title: "خفيف، سريع، وعصري",
    desc: "تجربة مستخدم استثنائية وبطارية تدوم طوال اليوم لإنجاز مهامك في أي مكان.",
    img: laptopImage2,
  },
  {
    eyebrow: "أطلق العنان لمواهبك",
    title: "لابتوب مصمم للمبدعين",
    desc: "دقة ألوان مذهلة، ومعالج رسومات جبار. ارتقِ بمشاريعك إلى المستوى التالي.",
    img: laptopImage3,
  },
];

function HeroSlider() {
  return (
    <section className="hero">
      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="hero-slide">
            {/* النص — يمين */}
            <div className="hero-content">
              <h4 className="hero-eyebrow">{slide.eyebrow}</h4>
              <h2 className="hero-title">{slide.title}</h2>
              <p className="hero-desc">{slide.desc}</p>
              <Link to="/shop" className="hero-btn">
                اشترِ الآن
              </Link>
            </div>

            {/* الصورة — يسار */}
            <div className="hero-img-wrap">
              <img src={slide.img} alt={slide.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;
