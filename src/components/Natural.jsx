import React, { useState } from "react";
import { orchids } from "../data/ListOfOrchids";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NatureIcon from "@mui/icons-material/Nature";

const Natural = () => {
  // Lọc ra các loài lan tự nhiên
  const naturalOrchids = orchids.filter((orchid) => orchid.isNatural);
  const theme = useTheme();

  const [filteredOrchids, setFilteredOrchids] = useState(naturalOrchids);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredOrchids(naturalOrchids);
    } else {
      const results = naturalOrchids.filter(
        (orchid) =>
          orchid.name.toLowerCase().includes(term) ||
          orchid.origin.toLowerCase().includes(term) ||
          orchid.category.toLowerCase().includes(term) ||
          orchid.color.toLowerCase().includes(term)
      );
      setFilteredOrchids(results);
    }
  };

  // Xử lý thay đổi tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    let sortedOrchids = [...naturalOrchids];

    switch (newValue) {
      case 0: // Tất cả
        setFilteredOrchids(naturalOrchids);
        break;
      case 1: // Xếp theo đánh giá
        sortedOrchids.sort((a, b) => b.rating - a.rating);
        setFilteredOrchids(sortedOrchids);
        break;
      case 2: // Xếp theo lượt thích
        sortedOrchids.sort((a, b) => b.numberOfLike - a.numberOfLike);
        setFilteredOrchids(sortedOrchids);
        break;
      case 3: // Chỉ hiển thị đặc biệt
        setFilteredOrchids(naturalOrchids.filter((orchid) => orchid.isSpecial));
        break;
      default:
        setFilteredOrchids(naturalOrchids);
    }
  };

  // Xử lý mở dialog video
  const handleOpenVideoDialog = (orchid) => {
    setSelectedOrchid(orchid);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section với độ tương phản tốt hơn */}
      <Box
        sx={{
          position: "relative",
          py: 8,
          mb: 6,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Overlay tối để tăng độ tương phản */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />

        {/* Nội dung với z-index cao hơn để hiển thị trên overlay */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <NatureIcon sx={{ fontSize: 60, color: "success.light" }} />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              mb: 3,
            }}
          >
            Bộ Sưu Tập Lan Tự Nhiên
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Khám phá vẻ đẹp thuần khiết của các loài lan tự nhiên - những loài
            hoa quý hiếm được tìm thấy trong môi trường hoang dã. Mỗi loài đều
            mang một vẻ đẹp độc đáo và có giá trị sinh thái cao.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search and Filter Section */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Tìm kiếm"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                color="primary"
              >
                Lọc
              </Button>

              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                color="primary"
              >
                Sắp xếp
              </Button>
            </Box>
          </Box>

          {/* Tabs for filtering */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="orchid filter tabs"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Tất cả" />
            <Tab label="Xếp theo đánh giá" />
            <Tab label="Xếp theo lượt thích" />
            <Tab label="Chỉ hiển thị đặc biệt" />
          </Tabs>
        </Paper>

        {/* Orchids Grid */}
        <Grid container spacing={3}>
          {filteredOrchids.length > 0 ? (
            filteredOrchids.map((orchid) => (
              <Grid item xs={12} sm={6} md={4} key={orchid.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-5px)" },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={orchid.image}
                      alt={orchid.name}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        p: 1.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {orchid.name}
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <StarIcon sx={{ color: "#FFD700", mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {orchid.rating}/5
                      </Typography>

                      <Box
                        sx={{
                          ml: "auto",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FavoriteIcon
                          sx={{ color: "#FF6B6B", mr: 0.5, fontSize: "1rem" }}
                        />
                        <Typography variant="body2">
                          {orchid.numberOfLike} lượt thích
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <strong>Xuất xứ:</strong> {orchid.origin}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <strong>Màu sắc:</strong> {orchid.color}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      <strong>Loại:</strong> {orchid.category}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        label="🌿 Tự nhiên"
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(45deg, #26de81, #20bf6b)",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                      {orchid.isSpecial && (
                        <Chip
                          label="✨ Đặc biệt"
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #ffd700, #ffa502)",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions
                    sx={{ p: 2, pt: 0, justifyContent: "space-between" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/orchid/${orchid.id}`}
                    >
                      Xem chi tiết
                    </Button>

                    <Tooltip title="Xem video">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenVideoDialog(orchid)}
                        size="small"
                      >
                        <YouTubeIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
              <Typography variant="h5" gutterBottom>
                Không tìm thấy kết quả phù hợp.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm("");
                  setTabValue(0);
                  setFilteredOrchids(naturalOrchids);
                }}
              >
                Xem tất cả lan tự nhiên
              </Button>
            </Box>
          )}
        </Grid>

        {/* Video Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
            {selectedOrchid && `Video về ${selectedOrchid.name}`}
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            {selectedOrchid && (
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={selectedOrchid.clip}
                  title={`Video về ${selectedOrchid.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              color="primary"
            >
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Natural;
