import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticateUser } from "../../data/dataUser";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [navigate, location]);

  // Thêm event listener để xử lý khi trạng thái đăng nhập thay đổi
  useEffect(() => {
    const handleLoginStatusChange = () => {
      // Đặt lại form khi có sự kiện đăng xuất
      setEmail("");
      setPassword("");
      setError("");
    };

    window.addEventListener("login-status-change", handleLoginStatusChange);

    return () => {
      window.removeEventListener(
        "login-status-change",
        handleLoginStatusChange
      );
    };
  }, []);

  // Tạo hiệu ứng ngôi sao lấp lánh
  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector(".login-container");
      if (!container) return;

      // Xóa các ngôi sao cũ nếu có
      const oldStars = container.querySelectorAll(".star");
      oldStars.forEach((star) => star.remove());

      // Tạo ngôi sao mới
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Thiết lập vị trí ngẫu nhiên
        const leftPos = Math.random() * 100;
        const topPos = Math.random() * 100;
        star.style.left = `${leftPos}%`;
        star.style.top = `${topPos}%`;

        // Thiết lập kích thước ngẫu nhiên
        const size = 1 + Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Thiết lập animation
        const duration = 1 + Math.random() * 3;
        star.style.animation = `twinkle ${duration}s infinite ease-in-out ${
          Math.random() * 3
        }s`;

        container.appendChild(star);
      }
    };

    createStars();

    // Cleanup
    return () => {
      const container = document.querySelector(".login-container");
      if (container) {
        const stars = container.querySelectorAll(".star");
        stars.forEach((star) => star.remove());
      }
    };
  }, []);

  // Tạo hiệu ứng hoa rơi
  useEffect(() => {
    const createFlowerPetals = () => {
      const container = document.querySelector(".login-container");
      if (!container) return;

      // Xóa các cánh hoa cũ nếu có
      const oldPetals = container.querySelectorAll(".flower-petal");
      oldPetals.forEach((petal) => petal.remove());

      for (let i = 0; i < 15; i++) {
        const petal = document.createElement("div");
        petal.classList.add("flower-petal");

        // Thiết lập vị trí ngẫu nhiên
        const leftPos = Math.random() * 100;
        petal.style.left = `${leftPos}%`;

        // Thiết lập kích thước ngẫu nhiên
        const size = 10 + Math.random() * 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        // Thiết lập màu ngẫu nhiên
        const colors = ["#f8bbd0", "#f48fb1", "#f06292", "#ec407a"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.backgroundColor = randomColor;

        // Thiết lập animation
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 15;
        petal.style.animation = `falling ${duration}s linear ${delay}s infinite`;

        container.appendChild(petal);
      }
    };

    createFlowerPetals();

    // Cleanup
    return () => {
      const container = document.querySelector(".login-container");
      if (container) {
        const petals = container.querySelectorAll(".flower-petal");
        petals.forEach((petal) => petal.remove());
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Thêm hiệu ứng loading
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Sử dụng hàm authenticateUser từ dataUser.js
      const result = authenticateUser(email, password);

      if (result.success) {
        // Đăng nhập thành công
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("userRole", result.user.role);
        localStorage.setItem("userId", result.user.id);

        // Thông báo thay đổi trạng thái đăng nhập
        window.dispatchEvent(new Event("login-status-change"));

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
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
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

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span>
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Đang xử lý...
                </span>
              ) : (
                "Đăng Nhập"
              )}
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
