import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
  Chip,
  Container,
  Rating,
  Tooltip,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Nature as NatureIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
} from "@mui/icons-material";
import { orchids } from "../../data/ListOfOrchids";

const OrchidManagement = () => {
  const [orchidsList, setOrchidsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrchid, setCurrentOrchid] = useState({
    name: "",
    image: "",
    clip: "",
    origin: "",
    color: "",
    category: "",
    rating: 0,
    numberOfLike: 0,
    isSpecial: false,
    isNatural: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Lấy dữ liệu lan
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setOrchidsList(orchids);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenDialog = (orchid = null) => {
    if (orchid) {
      setCurrentOrchid(orchid);
      setIsEditing(true);
    } else {
      setCurrentOrchid({
        name: "",
        image: "",
        clip: "",
        origin: "",
        color: "",
        category: "",
        rating: 0,
        numberOfLike: 0,
        isSpecial: false,
        isNatural: false,
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentOrchid({
      ...currentOrchid,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setCurrentOrchid({
      ...currentOrchid,
      rating: newValue,
    });
  };

  const handleSaveOrchid = () => {
    if (isEditing) {
      // Cập nhật lan
      const updatedList = orchidsList.map((item) =>
        item.id === currentOrchid.id ? currentOrchid : item
      );
      setOrchidsList(updatedList);
      setSnackbar({
        open: true,
        message: "Cập nhật lan thành công!",
        severity: "success",
      });
    } else {
      // Thêm lan mới
      const newOrchid = {
        ...currentOrchid,
        id: Date.now().toString(),
      };
      setOrchidsList([...orchidsList, newOrchid]);
      setSnackbar({
        open: true,
        message: "Thêm lan mới thành công!",
        severity: "success",
      });
    }
    handleCloseDialog();
  };

  const handleDeleteOrchid = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lan này?")) {
      const updatedList = orchidsList.filter((item) => item.id !== id);
      setOrchidsList(updatedList);
      setSnackbar({
        open: true,
        message: "Xóa lan thành công!",
        severity: "success",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Lọc lan theo từ khóa tìm kiếm
  const filteredOrchids = orchidsList.filter(
    (orchid) =>
      orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Quản lý lan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thêm, sửa, xóa các loài lan trong bộ sưu tập
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Tìm kiếm theo tên, xuất xứ, màu sắc, danh mục..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "50%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm lan mới
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Xuất xứ</TableCell>
                <TableCell>Màu sắc</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Lượt thích</TableCell>
                <TableCell>Đặc biệt</TableCell>
                <TableCell>Tự nhiên</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrchids.length > 0 ? (
                filteredOrchids.map((orchid) => (
                  <TableRow key={orchid.id}>
                    <TableCell>
                      <Box
                        component="img"
                        src={orchid.image}
                        alt={orchid.name}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{orchid.name}</TableCell>
                    <TableCell>{orchid.origin}</TableCell>
                    <TableCell>
                      <Chip
                        label={orchid.color}
                        size="small"
                        sx={{
                          bgcolor:
                            orchid.color.toLowerCase() === "trắng"
                              ? "#f5f5f5"
                              : orchid.color.toLowerCase() === "đỏ"
                              ? "#ffebee"
                              : orchid.color.toLowerCase() === "vàng"
                              ? "#fffde7"
                              : orchid.color.toLowerCase() === "tím"
                              ? "#f3e5f5"
                              : orchid.color.toLowerCase() === "hồng"
                              ? "#fce4ec"
                              : "#e0f7fa",
                        }}
                      />
                    </TableCell>
                    <TableCell>{orchid.category}</TableCell>
                    <TableCell>
                      <Rating
                        value={orchid.rating / 20}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{orchid.numberOfLike}</TableCell>
                    <TableCell>
                      {orchid.isSpecial ? (
                        <Chip
                          icon={<StarIcon />}
                          label="Đặc biệt"
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      ) : (
                        "Không"
                      )}
                    </TableCell>
                    <TableCell>
                      {orchid.isNatural ? (
                        <Chip
                          icon={<NatureIcon />}
                          label="Tự nhiên"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      ) : (
                        "Không"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Sửa">
                        <IconButton
                          onClick={() => handleOpenDialog(orchid)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          onClick={() => handleDeleteOrchid(orchid.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      Không tìm thấy lan phù hợp
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog thêm/sửa lan */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Sửa thông tin lan" : "Thêm lan mới"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên lan"
                name="name"
                value={currentOrchid.name}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Xuất xứ"
                name="origin"
                value={currentOrchid.origin}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Màu sắc"
                name="color"
                value={currentOrchid.color}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Danh mục"
                name="category"
                value={currentOrchid.category}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Đường dẫn hình ảnh"
                name="image"
                value={currentOrchid.image}
                onChange={handleInputChange}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Đường dẫn video"
                name="clip"
                value={currentOrchid.clip}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VideoIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography component="legend">Đánh giá</Typography>
                <Rating
                  name="rating"
                  value={currentOrchid.rating / 20}
                  precision={0.5}
                  onChange={handleRatingChange}
                />
              </Box>
              <TextField
                fullWidth
                label="Lượt thích"
                name="numberOfLike"
                type="number"
                value={currentOrchid.numberOfLike}
                onChange={handleInputChange}
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentOrchid.isSpecial}
                      onChange={handleInputChange}
                      name="isSpecial"
                    />
                  }
                  label="Là loài đặc biệt"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentOrchid.isNatural}
                      onChange={handleInputChange}
                      name="isNatural"
                    />
                  }
                  label="Là loài tự nhiên"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={handleSaveOrchid}
            variant="contained"
            color="primary"
          >
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrchidManagement;
