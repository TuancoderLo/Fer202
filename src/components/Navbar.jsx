import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NatureIcon from "@mui/icons-material/Nature";
import StarIcon from "@mui/icons-material/Star";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { text: "Trang Chủ", path: "/", icon: <HomeIcon /> },
    { text: "Giới Thiệu", path: "/about", icon: <InfoIcon /> },
    { text: "Lan Tự Nhiên", path: "/naturals", icon: <NatureIcon /> },
    { text: "Lan Đặc Biệt", path: "/special", icon: <StarIcon /> },
    { text: "Liên Hệ", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalFloristIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Lan Quý
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            component={Link}
            to={link.path}
            key={link.text}
            onClick={handleDrawerToggle}
            sx={{
              bgcolor: isActive(link.path) ? "action.selected" : "transparent",
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon
              sx={{ color: isActive(link.path) ? "primary.main" : "inherit" }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.text}
              primaryTypographyProps={{
                fontWeight: isActive(link.path) ? "bold" : "normal",
                color: isActive(link.path) ? "primary.main" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={
            mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
          }
          onClick={toggleTheme}
          fullWidth
        >
          {mode === "dark" ? "Chế độ sáng" : "Chế độ tối"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "background.paper" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                mr: 2,
                display: { xs: "none", sm: "flex" },
              }}
            >
              <LocalFloristIcon />
            </Avatar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: "bold",
                letterSpacing: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalFloristIcon
                sx={{
                  mr: 1,
                  display: { xs: "flex", sm: "none" },
                  color: "primary.main",
                }}
              />
              Bộ Sưu Tập Lan Quý
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  component={Link}
                  to={link.path}
                  color={isActive(link.path) ? "primary" : "inherit"}
                  sx={{
                    mx: 1,
                    fontWeight: isActive(link.path) ? "bold" : "normal",
                    position: "relative",
                    "&::after": isActive(link.path)
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "20%",
                          width: "60%",
                          height: "3px",
                          bgcolor: "primary.main",
                          borderRadius: "3px",
                        }
                      : {},
                  }}
                  startIcon={link.icon}
                >
                  {link.text}
                </Button>
              ))}

              <Tooltip title={mode === "dark" ? "Chế độ sáng" : "Chế độ tối"}>
                <IconButton
                  onClick={toggleTheme}
                  color="inherit"
                  sx={{ ml: 2 }}
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
