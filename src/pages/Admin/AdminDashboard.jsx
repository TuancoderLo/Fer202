import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  Container,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import NatureIcon from "@mui/icons-material/Nature";
import AddIcon from "@mui/icons-material/Add";
import SideBar from "../../components/sidebar/SideBar";
import OrchidManagement from "./OrchidManagement";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Admin";
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là admin không
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Đầu tiên chuyển hướng đến trang đăng nhập
    navigate("/login");

    // Sau đó mới xóa thông tin đăng nhập
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      // Thông báo thay đổi trạng thái đăng nhập
      window.dispatchEvent(new Event("login-status-change"));
    }, 100);
  };

  // Dữ liệu thống kê mẫu
  const stats = [
    {
      title: "Tổng số loài lan",
      value: 120,
      icon: <LocalFloristIcon />,
      color: "#1976d2",
    },
    { title: "Loài đặc biệt", value: 45, icon: <StarIcon />, color: "#ff9800" },
    {
      title: "Loài tự nhiên",
      value: 75,
      icon: <NatureIcon />,
      color: "#4caf50",
    },
    {
      title: "Người dùng",
      value: 1250,
      icon: <PeopleIcon />,
      color: "#e91e63",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar onLogout={handleLogout} />

      <Box component="main" className="admin-main-content">
        <Routes>
          <Route path="/" element={<DashboardContent stats={stats} />} />
          <Route path="/orchids" element={<OrchidManagement />} />
          <Route path="*" element={<DashboardContent stats={stats} />} />
        </Routes>
      </Box>
    </Box>
  );
};

// Component cho trang Tổng quan
const DashboardContent = ({ stats }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Tổng quan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chào mừng đến với hệ thống quản lý Bộ Sưu Tập Lan Quý
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    display: "flex",
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Lan mới thêm gần đây
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => (window.location.href = "/admin/orchids")}
          >
            Thêm lan mới
          </Button>
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Box
                  sx={{
                    height: 180,
                    backgroundImage: `url(https://source.unsplash.com/random/300x200?orchid&sig=${item})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Lan Hồ Điệp {item}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Xuất xứ: Việt Nam
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      <StarIcon
                        sx={{ fontSize: 16, color: "warning.main", mr: 0.5 }}
                      />
                      4.{item}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Chi tiết
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Hoạt động gần đây
        </Typography>
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Admin</strong> đã thêm <strong>Lan Hồ Điệp Trắng</strong>{" "}
              vào bộ sưu tập
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary", mt: 0.5 }}
              >
                2 giờ trước
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Admin</strong> đã cập nhật thông tin{" "}
              <strong>Lan Phi Điệp 5 cánh trắng</strong>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary", mt: 0.5 }}
              >
                5 giờ trước
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Admin</strong> đã xóa <strong>Lan Cattleya</strong> khỏi
              bộ sưu tập
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary", mt: 0.5 }}
              >
                1 ngày trước
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
