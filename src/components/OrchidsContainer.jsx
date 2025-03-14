import { useState, useEffect } from "react";
import { orchids } from "../data/ListOfOrchids";
import OrchidsList from "./OrchidsList";
import OrchidModal from "./OrchidModal";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Fade,
  Paper,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import NatureIcon from "@mui/icons-material/Nature";
import StarIcon from "@mui/icons-material/Star";
import SortIcon from "@mui/icons-material/Sort";
import { Link } from "react-router-dom";

const OrchidsContainer = () => {
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredOrchids, setFilteredOrchids] = useState(orchids);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  const handleShowDetail = (orchid) => {
    setSelectedOrchid(orchid);
    setIsModalOpen(true);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      filterOrchidsByTab(tabValue);
    } else {
      const results = orchids.filter(
        (orchid) =>
          orchid.name.toLowerCase().includes(term) ||
          orchid.origin.toLowerCase().includes(term) ||
          orchid.category.toLowerCase().includes(term) ||
          orchid.color.toLowerCase().includes(term)
      );
      setFilteredOrchids(results);
    }
  };

  const filterOrchidsByTab = (newValue) => {
    setTabValue(newValue);

    switch (newValue) {
      case 0: // Tất cả
        setFilteredOrchids(orchids);
        break;
      case 1: // Đặc biệt
        setFilteredOrchids(orchids.filter((orchid) => orchid.isSpecial));
        break;
      case 2: // Tự nhiên
        setFilteredOrchids(orchids.filter((orchid) => orchid.isNatural));
        break;
      case 3: // Xếp theo đánh giá
        setFilteredOrchids([...orchids].sort((a, b) => b.rating - a.rating));
        break;
      default:
        setFilteredOrchids(orchids);
    }
  };

  const handleTabChange = (event, newValue) => {
    filterOrchidsByTab(newValue);
  };

  // Thống kê
  const totalOrchids = orchids.length;
  const specialOrchids = orchids.filter((o) => o.isSpecial).length;
  const naturalOrchids = orchids.filter((o) => o.isNatural).length;

  return (
    <Box sx={{ py: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Bộ Sưu Tập Lan Quý
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
            >
              Khám phá bộ sưu tập những loài lan độc đáo và quý hiếm từ khắp nơi
              trên thế giới
            </Typography>

            {/* Stats Cards */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3,
                mb: 5,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minWidth: { xs: "100%", sm: "200px" },
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocalFloristIcon
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                  {totalOrchids}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tổng số loài lan
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minWidth: { xs: "45%", sm: "200px" },
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <StarIcon sx={{ fontSize: 40, color: "warning.main", mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                  {specialOrchids}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Loài đặc biệt
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minWidth: { xs: "45%", sm: "200px" },
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <NatureIcon
                  sx={{ fontSize: 40, color: "success.main", mb: 1 }}
                />
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                  {naturalOrchids}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Loài tự nhiên
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Fade>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên, xuất xứ, màu sắc..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 },
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{ whiteSpace: "nowrap" }}
              >
                Lọc
              </Button>
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                sx={{ whiteSpace: "nowrap" }}
              >
                Sắp xếp
              </Button>
            </Box>
          </Box>

          <Paper sx={{ borderRadius: 2, mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              aria-label="orchid filter tabs"
              sx={{ borderRadius: 2 }}
            >
              <Tab
                label="Tất cả"
                icon={<LocalFloristIcon />}
                iconPosition={isMedium ? "start" : "top"}
              />
              <Tab
                label="Đặc biệt"
                icon={<StarIcon />}
                iconPosition={isMedium ? "start" : "top"}
              />
              <Tab
                label="Tự nhiên"
                icon={<NatureIcon />}
                iconPosition={isMedium ? "start" : "top"}
              />
              <Tab
                label="Xếp theo đánh giá"
                icon={<SortIcon />}
                iconPosition={isMedium ? "start" : "top"}
              />
            </Tabs>
          </Paper>
        </Box>

        {/* Featured Collections */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
              Bộ sưu tập nổi bật
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/special"
                variant="outlined"
                color="primary"
                startIcon={<StarIcon />}
              >
                Xem tất cả đặc biệt
              </Button>
              <Button
                component={Link}
                to="/naturals"
                variant="outlined"
                color="success"
                startIcon={<NatureIcon />}
              >
                Xem tất cả tự nhiên
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Orchids List */}
        <OrchidsList
          orchids={filteredOrchids}
          onShowDetail={handleShowDetail}
        />

        {/* Empty State */}
        {filteredOrchids.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" gutterBottom>
              Không tìm thấy kết quả phù hợp
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSearchTerm("");
                setTabValue(0);
                setFilteredOrchids(orchids);
              }}
            >
              Xem tất cả lan
            </Button>
          </Box>
        )}

        <OrchidModal
          orchid={selectedOrchid}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default OrchidsContainer;
