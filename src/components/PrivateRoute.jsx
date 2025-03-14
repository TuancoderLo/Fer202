import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Component PrivateRoute để bảo vệ các route cần đăng nhập
const PrivateRoute = ({ allowedRoles = [] }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu về role và role của người dùng không phù hợp
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Nếu là admin, chuyển hướng đến trang admin
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    }
    // Nếu là user thông thường, chuyển hướng đến trang chính
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và có quyền truy cập, hiển thị các route con
  return <Outlet />;
};

export default PrivateRoute;
