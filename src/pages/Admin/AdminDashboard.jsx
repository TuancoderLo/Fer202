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
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import NatureIcon from "@mui/icons-material/Nature";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SideBar from "../../components/sidebar/SideBar";
import OrchidManagement from "./OrchidManagement";
import axios from "axios";
import "./AdminDashboard.css";

const API_URL = "https://678b95c11a6b89b27a2acf18.mockapi.io/Orchid";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Admin";
  const [activeSection, setActiveSection] = useState("dashboard");
  const [orchidsData, setOrchidsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: "Tổng số loài lan",
      value: 0,
      icon: <LocalFloristIcon />,
      color: "#1976d2",
    },
    { title: "Loài đặc biệt", value: 0, icon: <StarIcon />, color: "#ff9800" },
    {
      title: "Loài tự nhiên",
      value: 0,
      icon: <NatureIcon />,
      color: "#4caf50",
    },
    {
      title: "Tổng lượt thích",
      value: 0,
      icon: <ThumbUpIcon />,
      color: "#e91e63",
    },
  ]);

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là admin không
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Lấy dữ liệu lan từ API
  useEffect(() => {
    const fetchOrchids = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setOrchidsData(data);

        // Tính toán thống kê
        const totalOrchids = data.length;
        const specialOrchids = data.filter((orchid) => orchid.isSpecial).length;
        const naturalOrchids = data.filter((orchid) => orchid.isNatural).length;
        const totalLikes = data.reduce(
          (sum, orchid) => sum + orchid.numberOfLike,
          0
        );

        setStats([
          {
            title: "Tổng số loài lan",
            value: totalOrchids,
            icon: <LocalFloristIcon />,
            color: "#1976d2",
          },
          {
            title: "Loài đặc biệt",
            value: specialOrchids,
            icon: <StarIcon />,
            color: "#ff9800",
          },
          {
            title: "Loài tự nhiên",
            value: naturalOrchids,
            icon: <NatureIcon />,
            color: "#4caf50",
          },
          {
            title: "Tổng lượt thích",
            value: totalLikes,
            icon: <ThumbUpIcon />,
            color: "#e91e63",
          },
        ]);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchids();
  }, []);

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

  // Sắp xếp lan theo đánh giá cao nhất
  const topRatedOrchids = [...orchidsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Sắp xếp lan theo lượt thích cao nhất
  const mostLikedOrchids = [...orchidsData]
    .sort((a, b) => b.numberOfLike - a.numberOfLike)
    .slice(0, 4);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar onLogout={handleLogout} />

      <Box component="main" className="admin-main-content">
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <DashboardContent
                  stats={stats}
                  topRatedOrchids={topRatedOrchids}
                  mostLikedOrchids={mostLikedOrchids}
                  totalOrchids={orchidsData.length}
                />
              )
            }
          />
          <Route path="/orchids" element={<OrchidManagement />} />
          <Route
            path="*"
            element={
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <DashboardContent
                  stats={stats}
                  topRatedOrchids={topRatedOrchids}
                  mostLikedOrchids={mostLikedOrchids}
                  totalOrchids={orchidsData.length}
                />
              )
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

// Component cho trang Tổng quan
const DashboardContent = ({
  stats,
  topRatedOrchids,
  mostLikedOrchids,
  totalOrchids,
}) => {
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
                {stat.value.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Lan đánh giá cao nhất */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Lan đánh giá cao nhất
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="/admin/orchids"
              >
                Xem tất cả
              </Button>
            </Box>
            <List>
              {topRatedOrchids.map((orchid, index) => (
                <React.Fragment key={orchid.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={orchid.image}
                        alt={orchid.name}
                        sx={{ width: 56, height: 56, mr: 1 }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/56x56?text=No+Image";
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {orchid.name}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                          >
                            {orchid.origin} • {orchid.category}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <StarIcon
                              sx={{
                                color: "warning.main",
                                fontSize: 18,
                                mr: 0.5,
                              }}
                            />
                            <Typography variant="body2" component="span">
                              {(orchid.rating / 20).toFixed(1)}/5
                            </Typography>
                            <Box sx={{ mx: 1, color: "text.secondary" }}>•</Box>
                            <ThumbUpIcon
                              sx={{
                                color: "primary.main",
                                fontSize: 16,
                                mr: 0.5,
                              }}
                            />
                            <Typography variant="body2" component="span">
                              {orchid.numberOfLike}
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < topRatedOrchids.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Lan được yêu thích nhất */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Lan được yêu thích nhất
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="/admin/orchids"
              >
                Xem tất cả
              </Button>
            </Box>
            <List>
              {mostLikedOrchids.map((orchid, index) => (
                <React.Fragment key={orchid.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={orchid.image}
                        alt={orchid.name}
                        sx={{ width: 56, height: 56, mr: 1 }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/56x56?text=No+Image";
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {orchid.name}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                          >
                            {orchid.origin} • {orchid.category}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <ThumbUpIcon
                              sx={{
                                color: "primary.main",
                                fontSize: 16,
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              component="span"
                              sx={{ fontWeight: "bold" }}
                            >
                              {orchid.numberOfLike} lượt thích
                            </Typography>
                            <Box sx={{ mx: 1, color: "text.secondary" }}>•</Box>
                            <StarIcon
                              sx={{
                                color: "warning.main",
                                fontSize: 18,
                                mr: 0.5,
                              }}
                            />
                            <Typography variant="body2" component="span">
                              {(orchid.rating / 20).toFixed(1)}/5
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < mostLikedOrchids.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Quản lý bộ sưu tập
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component="a"
              href="/admin/orchids"
            >
              Thêm lan mới
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      <LocalFloristIcon />
                    </Avatar>
                    <Typography variant="h6">Quản lý lan</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Thêm, sửa, xóa các loài lan trong bộ sưu tập. Hiện có{" "}
                    {totalOrchids} loài lan.
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    component="a"
                    href="/admin/orchids"
                  >
                    Quản lý ngay
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                      <StarIcon />
                    </Avatar>
                    <Typography variant="h6">Lan đặc biệt</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Quản lý các loài lan đặc biệt, đánh dấu lan mới là đặc biệt.
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    component="a"
                    href="/admin/orchids"
                  >
                    Xem lan đặc biệt
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                      <NatureIcon />
                    </Avatar>
                    <Typography variant="h6">Lan tự nhiên</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Quản lý các loài lan tự nhiên, đánh dấu lan mới là tự nhiên.
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    component="a"
                    href="/admin/orchids"
                  >
                    Xem lan tự nhiên
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
