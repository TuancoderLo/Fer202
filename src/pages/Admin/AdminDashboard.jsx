import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Admin";

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là admin không
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Trang Quản Trị</h1>
        <div className="admin-user-info">
          <span>Xin chào, {userName}</span>
          <button onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <ul>
            <li className="active">Tổng quan</li>
            <li>Quản lý sản phẩm</li>
            <li>Quản lý người dùng</li>
            <li>Quản lý đơn hàng</li>
            <li>Cài đặt</li>
          </ul>
        </div>

        <div className="admin-main">
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Tổng sản phẩm</h3>
              <p className="stat-number">120</p>
            </div>
            <div className="stat-card">
              <h3>Tổng người dùng</h3>
              <p className="stat-number">1,250</p>
            </div>
            <div className="stat-card">
              <h3>Đơn hàng mới</h3>
              <p className="stat-number">25</p>
            </div>
            <div className="stat-card">
              <h3>Doanh thu</h3>
              <p className="stat-number">15,000,000 đ</p>
            </div>
          </div>

          <div className="admin-recent">
            <h2>Đơn hàng gần đây</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>Nguyễn Văn A</td>
                  <td>15/06/2023</td>
                  <td>
                    <span className="status completed">Hoàn thành</span>
                  </td>
                  <td>1,200,000 đ</td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Trần Thị B</td>
                  <td>14/06/2023</td>
                  <td>
                    <span className="status pending">Đang xử lý</span>
                  </td>
                  <td>850,000 đ</td>
                </tr>
                <tr>
                  <td>#ORD003</td>
                  <td>Lê Văn C</td>
                  <td>13/06/2023</td>
                  <td>
                    <span className="status shipped">Đang giao</span>
                  </td>
                  <td>2,300,000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
