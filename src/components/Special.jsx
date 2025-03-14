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
  Divider,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Modal,
  Backdrop,
  Rating,
  Paper,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const Special = () => {
  // Lọc ra các loài lan đặc biệt
  const specialOrchids = orchids.filter((orchid) => orchid.isSpecial);
  const theme = useTheme();

  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (orchid) => {
    setSelectedOrchid(orchid);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            "url(https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
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
            <StarIcon sx={{ fontSize: 60, color: "#ffd700" }} />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              mb: 3,
              background: "linear-gradient(45deg, #ffd700, #ff4500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Bộ Sưu Tập Lan Đặc Biệt
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
            Khám phá những loài lan quý hiếm và độc đáo nhất trong bộ sưu tập
            của chúng tôi
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Tại sao chúng đặc biệt?
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Những loài lan trong bộ sưu tập đặc biệt này được chọn lọc dựa trên
            nhiều tiêu chí khắt khe như: độ hiếm, vẻ đẹp độc đáo, giá trị lịch
            sử và văn hóa, cũng như khả năng thích nghi đặc biệt. Mỗi loài đều
            có một câu chuyện riêng và đặc điểm nổi bật mà bạn không thể tìm
            thấy ở những loài lan thông thường.
          </Typography>
        </Paper>

        <Divider sx={{ mb: 5 }} />

        {/* Featured Orchid */}
        {specialOrchids.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}
            >
              Lan nổi bật
            </Typography>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Card sx={{ display: { md: "flex" }, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  sx={{ width: { md: "40%" }, height: { xs: 300, md: "auto" } }}
                  image={specialOrchids[0].image}
                  alt={specialOrchids[0].name}
                />
                <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {specialOrchids[0].name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Rating
                        name="read-only"
                        value={specialOrchids[0].rating}
                        readOnly
                        precision={0.5}
                      />
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        ({specialOrchids[0].rating}/5)
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ mb: 1 }}
                    >
                      <strong>Xuất xứ:</strong> {specialOrchids[0].origin}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ mb: 1 }}
                    >
                      <strong>Màu sắc:</strong> {specialOrchids[0].color}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ mb: 2 }}
                    >
                      <strong>Loại:</strong> {specialOrchids[0].category}
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ lineHeight: 1.7 }}
                    >
                      Đây là một trong những loài lan đặc biệt nhất trong bộ sưu
                      tập của chúng tôi. Với màu sắc {specialOrchids[0].color}{" "}
                      tuyệt đẹp và hình dáng độc đáo,
                      {specialOrchids[0].name} đã chinh phục trái tim của nhiều
                      người yêu hoa.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        label="✨ Đặc biệt"
                        sx={{
                          background:
                            "linear-gradient(45deg, #ffd700, #ffa502)",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      />
                      {specialOrchids[0].isNatural && (
                        <Chip
                          label="🌿 Tự nhiên"
                          sx={{
                            background:
                              "linear-gradient(45deg, #26de81, #20bf6b)",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/orchid/${specialOrchids[0].id}`}
                      sx={{ mr: 2 }}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<PlayCircleOutlineIcon />}
                      onClick={() => handleOpenModal(specialOrchids[0])}
                    >
                      Xem video
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        {specialOrchids[0].numberOfLike}
                      </Typography>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: "#FF6B6B" }} />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Box>
        )}

        {/* Orchids Grid */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}
          >
            Tất cả lan đặc biệt
          </Typography>

          <Grid container spacing={3}>
            {specialOrchids.map((orchid, index) => {
              // Skip the first orchid as it's already featured
              if (index === 0) return null;

              return (
                <Grid item xs={12} sm={6} md={4} key={orchid.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: 3,
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      },
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
                          top: 0,
                          right: 0,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          p: 1,
                          borderBottomLeftRadius: 8,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <StarIcon
                            sx={{ color: "#FFD700", mr: 0.5, fontSize: "1rem" }}
                          />
                          {orchid.rating}
                        </Typography>
                      </Box>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          bgcolor: "rgba(255,255,255,0.8)",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.9)",
                          },
                        }}
                        onClick={() => handleOpenModal(orchid)}
                      >
                        <PlayCircleOutlineIcon />
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {orchid.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            mr: 1,
                            bgcolor: "primary.main",
                            fontSize: "0.8rem",
                          }}
                        >
                          {orchid.origin.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                          {orchid.origin}
                        </Typography>
                      </Box>
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
                      <Box sx={{ display: "flex", gap: 1 }}>
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
                        {orchid.isNatural && (
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
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        component={Link}
                        to={`/orchid/${orchid.id}`}
                      >
                        Xem chi tiết
                      </Button>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Yêu thích">
                          <IconButton size="small">
                            <FavoriteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Typography variant="body2" color="text.secondary">
                          {orchid.numberOfLike}
                        </Typography>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Video Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={{ ...style, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {selectedOrchid && `Video về ${selectedOrchid.name}`}
                </Typography>
                <IconButton onClick={handleCloseModal} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ width: "100%", pt: "56.25%", position: "relative" }}>
                {selectedOrchid && (
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                    src={selectedOrchid.clip}
                    title={`Video về ${selectedOrchid.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default Special;
