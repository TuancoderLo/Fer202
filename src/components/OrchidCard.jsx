import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";

const OrchidCard = ({ orchid, onShowDetail }) => {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const handlePlayVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShowDetail) {
      onShowDetail(orchid);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="220"
          image={orchid.image}
          alt={orchid.name}
          sx={{
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Badges */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 1,
          }}
        >
          {orchid.isSpecial && (
            <Chip
              label="✨ Đặc biệt"
              size="small"
              sx={{
                background: "linear-gradient(45deg, #ffd700, #ffa502)",
                color: "#000",
                fontWeight: "bold",
              }}
            />
          )}
          {orchid.isNatural && (
            <Chip
              label="🌿 Tự nhiên"
              size="small"
              sx={{
                background: "linear-gradient(45deg, #26de81, #20bf6b)",
                color: "#fff",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>

        {/* Rating */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon sx={{ color: "#FFD700", fontSize: "0.9rem", mr: 0.5 }} />
          <Typography variant="body2" fontWeight="bold">
            {orchid.rating}
          </Typography>
        </Box>

        {/* Video Button */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": {
              bgcolor: "white",
            },
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "all 0.3s ease",
          }}
          onClick={handlePlayVideo}
        >
          <PlayCircleOutlineIcon color="primary" />
        </IconButton>

        {/* Name on image */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            color: "white",
            fontWeight: "bold",
            textShadow: "0px 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {orchid.name}
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              <strong>Xuất xứ:</strong> {orchid.origin}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ColorLensIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              <strong>Màu sắc:</strong> {orchid.color}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CategoryIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              <strong>Loại:</strong> {orchid.category}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/orchid/${orchid.id}`}
          size="small"
        >
          Xem chi tiết
        </Button>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
            {orchid.numberOfLike}
          </Typography>
          <Tooltip title={liked ? "Bỏ thích" : "Yêu thích"}>
            <IconButton
              size="small"
              color={liked ? "error" : "default"}
              onClick={handleLike}
            >
              {liked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default OrchidCard;
