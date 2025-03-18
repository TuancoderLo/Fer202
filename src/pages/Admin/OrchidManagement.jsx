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
  Alert,
  Snackbar,
  CircularProgress,
  Pagination,
  Rating,
  Tooltip,
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
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import axios from "axios";
import useTheme from "../../hooks/useTheme";
import "./OrchidManagement.css";

const API_URL = "https://678b95c11a6b89b27a2acf18.mockapi.io/Orchid";

const OrchidManagement = () => {
  const { isDarkMode } = useTheme();
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
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Lấy dữ liệu lan từ API
  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setOrchidsList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi lấy dữ liệu: " + error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrchids();
  };

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
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setCurrentOrchid({
      ...currentOrchid,
      rating: Math.round(newValue * 20), // Chuyển đổi từ thang 5 sao sang thang 100
    });
  };

  // Thêm lan mới
  const addOrchid = async (orchidData) => {
    try {
      const response = await axios.post(API_URL, orchidData);
      setOrchidsList([...orchidsList, response.data]);
      setSnackbar({
        open: true,
        message: "Thêm lan mới thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi thêm lan:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi thêm lan: " + error.message,
        severity: "error",
      });
    }
  };

  // Cập nhật lan
  const updateOrchid = async (id, orchidData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, orchidData);
      const updatedList = orchidsList.map((item) =>
        item.id === id ? response.data : item
      );
      setOrchidsList(updatedList);
      setSnackbar({
        open: true,
        message: "Cập nhật lan thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật lan:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi cập nhật lan: " + error.message,
        severity: "error",
      });
    }
  };

  // Xóa lan
  const deleteOrchid = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedList = orchidsList.filter((item) => item.id !== id);
      setOrchidsList(updatedList);
      setSnackbar({
        open: true,
        message: "Xóa lan thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi xóa lan:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi xóa lan: " + error.message,
        severity: "error",
      });
    }
  };

  const handleSaveOrchid = () => {
    // Kiểm tra dữ liệu đầu vào
    if (
      !currentOrchid.name ||
      !currentOrchid.image ||
      !currentOrchid.origin ||
      !currentOrchid.color ||
      !currentOrchid.category
    ) {
      setSnackbar({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc!",
        severity: "warning",
      });
      return;
    }

    if (isEditing) {
      updateOrchid(currentOrchid.id, currentOrchid);
    } else {
      addOrchid(currentOrchid);
    }
    handleCloseDialog();
  };

  const handleDeleteOrchid = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lan này?")) {
      deleteOrchid(id);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Lọc lan theo từ khóa tìm kiếm
  const filteredOrchids = orchidsList.filter(
    (orchid) =>
      orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const paginatedOrchids = filteredOrchids.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div
      className={`orchid-management-container ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="orchid-management-header">
        <h1 className="orchid-management-title">Quản lý lan</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="add-orchid-btn"
          onClick={() => handleOpenDialog()}
        >
          THÊM LAN MỚI
        </Button>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, xuất xứ, màu sắc, danh mục..."
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outlined" onClick={handleRefresh}>
          <RefreshIcon />
        </Button>
      </div>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}
          >
            <Table className="orchid-management-table">
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
                {paginatedOrchids.length > 0 ? (
                  paginatedOrchids.map((orchid) => (
                    <TableRow key={orchid.id}>
                      <TableCell>
                        <Box
                          component="img"
                          src={orchid.image}
                          alt={orchid.name}
                          className="orchid-thumbnail"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/60x60?text=No+Image";
                          }}
                        />
                      </TableCell>
                      <TableCell>{orchid.name}</TableCell>
                      <TableCell>{orchid.origin}</TableCell>
                      <TableCell>
                        <Chip
                          label={orchid.color}
                          size="small"
                          className={`color-chip ${orchid.color.toLowerCase()}`}
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
                            className="edit-button"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton
                            onClick={() => handleDeleteOrchid(orchid.id)}
                            className="delete-button"
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
                        {searchTerm
                          ? "Không tìm thấy lan phù hợp"
                          : "Chưa có dữ liệu lan"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredOrchids.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(filteredOrchids.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
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
                <Typography component="legend">Đánh giá (0-100)</Typography>
                <Rating
                  name="rating"
                  value={currentOrchid.rating / 20}
                  precision={0.5}
                  onChange={handleRatingChange}
                />
                <Typography variant="caption" color="text.secondary">
                  Giá trị hiện tại: {currentOrchid.rating}/100
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Lượt thích"
                name="numberOfLike"
                type="number"
                value={currentOrchid.numberOfLike}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{ inputProps: { min: 0 } }}
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
    </div>
  );
};

export default OrchidManagement;
