import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Bộ Sưu Tập Lan Quý</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Trang Chủ
        </Link>
        <Link to="/contact" className="nav-link">
          Liên Hệ
        </Link>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
