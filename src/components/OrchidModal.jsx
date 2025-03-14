import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrchidModal = ({ orchid, isOpen, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!isOpen || !orchid) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          {orchid.name}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            component="iframe"
            src={orchid.clip}
            title={`Video về ${orchid.name}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              width: "100%",
              height: { xs: "240px", sm: "360px", md: "480px" },
              display: "block",
            }}
          />
        </Box>

        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {orchid.isSpecial && (
                <Chip
                  label="✨ Đặc biệt"
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
                  sx={{
                    background: "linear-gradient(45deg, #26de81, #20bf6b)",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StarIcon sx={{ color: "#FFD700", mr: 0.5 }} />
                <Typography variant="body2" fontWeight="bold">
                  {orchid.rating}/5
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <FavoriteIcon sx={{ color: "#FF6B6B", mr: 0.5 }} />
                <Typography variant="body2">{orchid.numberOfLike}</Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            {orchid.name}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Xuất xứ:</strong> {orchid.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Màu sắc:</strong> {orchid.color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Loại:</strong> {orchid.category}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                component={Link}
                to={`/orchid/${orchid.id}`}
                onClick={onClose}
              >
                Xem chi tiết
              </Button>
              <IconButton color="primary">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            {orchid.name} là một loài hoa lan tuyệt đẹp với màu sắc{" "}
            {orchid.color} đặc trưng. Xuất xứ từ {orchid.origin}, loài hoa này
            thuộc họ {orchid.category} và được nhiều người yêu thích.
            {orchid.isSpecial &&
              " Đây là một loài hoa đặc biệt với những đặc điểm độc đáo."}
            {orchid.isNatural &&
              " Loài hoa này được tìm thấy trong tự nhiên và có giá trị sinh thái cao."}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrchidModal;
