import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticateUser } from "../../data/dataUser";
import "./Login.css";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  // Tạo hiệu ứng cánh hoa anh đào rơi
  useEffect(() => {
    const createSakuraPetals = () => {
      const container = document.querySelector(".login-container");
      if (!container) return;

      // Xóa các cánh hoa cũ nếu có
      const oldPetals = container.querySelectorAll(".flower-petal");
      oldPetals.forEach((petal) => petal.remove());

      // Tạo nhiều cánh hoa anh đào
      for (let i = 0; i < 30; i++) {
        const petal = document.createElement("div");
        petal.classList.add("flower-petal");

        // Thiết lập vị trí ngẫu nhiên
        const leftPos = Math.random() * 100;
        petal.style.left = `${leftPos}%`;

        // Thiết lập kích thước ngẫu nhiên
        const size = 8 + Math.random() * 12;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        // Thiết lập màu ngẫu nhiên cho cánh hoa anh đào
        const colors = ["#ffb6c1", "#ffc0cb", "#ff69b4", "#ff91a4", "#ffa6c9"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.backgroundColor = randomColor;

        // Thiết lập hình dạng ngẫu nhiên cho cánh hoa
        const borderRadius = [
          "50% 0 50% 50%",
          "50% 50% 0 50%",
          "0 50% 50% 50%",
          "50% 50% 50% 0",
        ];
        const randomShape =
          borderRadius[Math.floor(Math.random() * borderRadius.length)];
        petal.style.borderRadius = randomShape;

        // Thêm hiệu ứng xoay cho cánh hoa
        const rotation = Math.random() * 360;
        petal.style.transform = `rotate(${rotation}deg)`;

        // Thiết lập animation
        const duration = 6 + Math.random() * 10;
        const delay = Math.random() * 15;
        petal.style.animation = `falling ${duration}s linear ${delay}s infinite`;

        container.appendChild(petal);
      }
    };

    createSakuraPetals();

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

  // Thay thế hàm handleGoogleLogin với chức năng thực tế của Firebase
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.displayName || "Người dùng Google");
      localStorage.setItem("userRole", "user"); // Mặc định là user, có thể điều chỉnh dựa vào yêu cầu của bạn
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);

      // Thông báo thay đổi trạng thái đăng nhập
      window.dispatchEvent(new Event("login-status-change"));

      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      setError("Đăng nhập Google thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm để bật/tắt hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <i
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
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

            <div className="social-login">
              <div className="social-login-divider">
                <span>Hoặc đăng nhập với</span>
              </div>

              <button
                type="button"
                className="google-login-button"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <i className="fab fa-google"></i>
                Google
              </button>
            </div>
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
