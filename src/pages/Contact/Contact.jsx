import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تحط منطق إرسال الفورم (API call مثلاً)
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>عندك سؤال أو استفسار؟ تواصل معانا وهنرد عليك في أسرع وقت</p>
      </div>

      <div className="contact-content">
        {/* === Left: Info + Map === */}
        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <h4>العنوان</h4>
              <p>123 شارع التحرير، القاهرة، مصر</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📞</span>
            <div>
              <h4>التليفون</h4>
              <p>+20 100 123 4567</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">✉️</span>
            <div>
              <h4>الإيميل</h4>
              <p>support@shopco.com</p>
            </div>
          </div>

          <div className="map-wrap">
            <iframe
              title="location-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27632.0!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* === Right: Form === */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>ابعتلنا رسالة</h3>

          <div className="form-row">
            <div className="form-group">
              <label>الاسم</label>
              <input
                type="text"
                name="name"
                placeholder="اسمك الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>الإيميل</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>الموضوع</label>
            <input
              type="text"
              name="subject"
              placeholder="عنوان الرسالة"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>الرسالة</label>
            <textarea
              name="message"
              rows="6"
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            إرسال الرسالة
          </button>

          {submitted && (
            <p className="success-msg">✓ تم إرسال رسالتك بنجاح، هنرد عليك قريب</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;