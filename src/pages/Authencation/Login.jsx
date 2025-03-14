import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../data/dataUser";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Kiểm tra nếu người dùng đã đăng nhập thì chuyển hướng
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn === "true") {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sử dụng hàm authenticateUser từ dataUser.js
    const result = authenticateUser(email, password);

    if (result.success) {
      // Đăng nhập thành công
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", result.user.name);
      localStorage.setItem("userRole", result.user.role);
      localStorage.setItem("userId", result.user.id);

      // Chuyển hướng dựa trên role
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      // Đăng nhập thất bại
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-flower-decoration top-left"></div>
        <div className="login-flower-decoration top-right"></div>
        <div className="login-flower-decoration bottom-left"></div>
        <div className="login-flower-decoration bottom-right"></div>

        <div className="login-content">
          <h1 className="login-title">Đăng Nhập</h1>
          <div className="login-subtitle">Chào mừng bạn quay trở lại</div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <i className="fa fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-container">
                <i className="fa fa-lock input-icon"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="login-button">
              Đăng Nhập
            </button>
          </form>

          <div className="login-footer">
            <p>
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
