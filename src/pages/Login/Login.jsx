
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تحط منطق تسجيل الدخول (API call مثلاً)
    console.log(formData);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>سجل دخولك عشان تكمل تسوقك</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>كلمة المرور</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-extra">
            <label className="remember-me">
              <input type="checkbox" />
              <span>تذكرني</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button type="submit" className="submit-btn">
            تسجيل الدخول
          </button>
        </form>

        <div className="divider">
          <span>أو سجل دخولك بـ</span>
        </div>

        <div className="social-login">
          <button className="social-btn google-btn">
            <span className="social-icon">G</span>
            Google
          </button>
          <button className="social-btn facebook-btn">
            <span className="social-icon">f</span>
            Facebook
          </button>
        </div>

        <p className="signup-text">
          مش عندك حساب؟ <Link to="/register">سجل دلوقتي</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;