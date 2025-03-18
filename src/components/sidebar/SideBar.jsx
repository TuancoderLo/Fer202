import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PublicIcon from "@mui/icons-material/Public";
import useTheme from "../../hooks/useTheme";
import "./SideBar.css";

const SideBar = ({ open, onClose, onLogout }) => {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "Admin";
  const userRole = localStorage.getItem("userRole");
  const { isDarkMode } = useTheme();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: "Tổng quan", path: "/admin", icon: <DashboardIcon /> },
    { text: "Quản lý lan", path: "/admin/orchids", icon: <LocalFloristIcon /> },
    { text: "Danh mục", path: "/admin/categories", icon: <CategoryIcon /> },
    { text: "Màu sắc", path: "/admin/colors", icon: <ColorLensIcon /> },
    { text: "Xuất xứ", path: "/admin/origins", icon: <PublicIcon /> },
    { text: "Người dùng", path: "/admin/users", icon: <PeopleIcon /> },
    { text: "Cài đặt", path: "/admin/settings", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      className={`admin-sidebar ${isDarkMode ? "dark-mode" : "light-mode"}`}
      classes={{
        paper: "admin-sidebar-paper",
      }}
    >
      <Box className="admin-sidebar-header">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LocalFloristIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Quản Trị Lan Quý
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Hệ thống quản lý bộ sưu tập
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box className="admin-user-info">
        <Avatar sx={{ width: 60, height: 60, mb: 1 }}>
          {userName.charAt(0)}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {userName}
        </Typography>
        <Typography variant="caption" sx={{ color: "primary.main", mb: 1 }}>
          {userRole === "admin" ? "Quản trị viên" : "Người dùng"}
        </Typography>
      </Box>

      <Divider />

      <List className="admin-menu">
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            className={isActive(item.path) ? "active-menu-item" : ""}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {isActive(item.path) && <div className="active-indicator" />}
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          fullWidth
        >
          Đăng xuất
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
