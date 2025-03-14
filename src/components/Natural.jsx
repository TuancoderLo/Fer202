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
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Natural = () => {
  // Lọc ra các loài lan tự nhiên
  const naturalOrchids = orchids.filter((orchid) => orchid.isNatural);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Bộ Sưu Tập Lan Tự Nhiên
      </Typography>

      <Typography
        variant="body1"
        paragraph
        align="center"
        sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
      >
        Khám phá vẻ đẹp thuần khiết của các loài lan tự nhiên - những loài hoa
        quý hiếm được tìm thấy trong môi trường hoang dã. Mỗi loài đều mang một
        vẻ đẹp độc đáo và có giá trị sinh thái cao.
      </Typography>

      {/* Search and Filter Section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
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

        <Tooltip title="Lọc">
          <IconButton color="primary">
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Sắp xếp">
          <IconButton color="primary">
            <SortIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tabs for filtering */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="orchid filter tabs"
        >
          <Tab label="Tất cả" />
          <Tab label="Xếp theo đánh giá" />
          <Tab label="Xếp theo lượt thích" />
          <Tab label="Chỉ hiển thị đặc biệt" />
        </Tabs>
      </Box>

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
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={orchid.image}
                  alt={orchid.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {orchid.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <StarIcon sx={{ color: "#FFD700", mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {Array(orchid.rating).fill("⭐").join("")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <FavoriteIcon
                      sx={{ color: "#FF6B6B", mr: 0.5, fontSize: "1rem" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {orchid.numberOfLike} lượt thích
                    </Typography>
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
                        background: "linear-gradient(45deg, #26de81, #20bf6b)",
                        color: "#fff",
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
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/orchid/${orchid.id}`}
                    sx={{ mr: "auto" }}
                  >
                    Xem chi tiết
                  </Button>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenVideoDialog(orchid)}
                    size="small"
                  >
                    <YouTubeIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
            <Typography variant="h6">
              Không tìm thấy kết quả phù hợp.
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Video Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedOrchid && `Video về ${selectedOrchid.name}`}
        </DialogTitle>
        <DialogContent>
          {selectedOrchid && (
            <Box
              sx={{ position: "relative", paddingTop: "56.25%", width: "100%" }}
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
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Natural;
