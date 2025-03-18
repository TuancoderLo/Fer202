import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import OrchidsContainer from "./components/OrchidsContainer";
import OrchidDetail from "./components/OrchidDetail";
import Contact from "./components/Contact.jsx";
import About from "./components/About";
import Natural from "./components/Natural";
import Special from "./components/Special";
import Login from "./pages/Authencation/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import OrchidManagement from "./pages/Admin/OrchidManagement";
import PrivateRoute from "./components/PrivateRoute";
import getTheme from "./theme";
import "./App.css";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole") || "";
      setIsLoggedIn(loggedIn);
      setUserRole(role);
    };

    checkLoginStatus();

    // Lắng nghe sự thay đổi trong localStorage
    window.addEventListener("storage", checkLoginStatus);

    // Thêm event listener để cập nhật state khi có thay đổi đăng nhập
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("login-status-change", handleLoginStatusChange);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener(
        "login-status-change",
        handleLoginStatusChange
      );
    };
  }, []);

  // Lắng nghe sự thay đổi theme từ ThemeContext
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme && newTheme !== mode) {
        setMode(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    // Trigger cho ThemeContext biết
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            {isLoggedIn && userRole !== "admin" && (
              <Navbar toggleTheme={toggleTheme} mode={mode} />
            )}
            <main
              className={`main-content ${
                isLoggedIn && userRole !== "admin" ? "with-navbar" : ""
              }`}
            >
              <Routes>
                {/* Route công khai */}
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate
                        to={userRole === "admin" ? "/admin" : "/"}
                        replace
                      />
                    ) : (
                      <Login />
                    )
                  }
                />

                {/* Route cho admin */}
                <Route
                  path="/admin/*"
                  element={
                    isLoggedIn && userRole === "admin" ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                {/* Route cho người dùng đã đăng nhập */}
                <Route
                  element={<PrivateRoute allowedRoles={["user", "customer"]} />}
                >
                  <Route path="/" element={<OrchidsContainer />} />
                  <Route path="/orchid/:id" element={<OrchidDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/naturals" element={<Natural />} />
                  <Route path="/special" element={<Special />} />
                </Route>

                {/* Chuyển hướng mặc định */}
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={
                        isLoggedIn
                          ? userRole === "admin"
                            ? "/admin"
                            : "/"
                          : "/login"
                      }
                      replace
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
