import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const OrchidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchidDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/${id}`);
        setOrchid(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu chi tiết:", err);
        setError("Không thể tải thông tin chi tiết. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchOrchidDetail();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Đang tải thông tin...
        </Typography>
      </Box>
    );
  }

  if (error || !orchid) {
    return (
      <div className="error-page">
        <h2>{error || "Không tìm thấy thông tin hoa lan"}</h2>
        <button onClick={() => navigate("/")}>Quay về trang chủ</button>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={() => navigate("/")}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => navigate("/")}>
          ×
        </button>
        <div className="modal-body">
          <div className="orchid-detail-header">
            <img src={orchid.image} alt={orchid.name} className="modal-image" />
            <div className="orchid-detail-info">
              <Typography variant="h4" component="h2" gutterBottom>
                {orchid.name}
              </Typography>
              <div className="orchid-stats-detail">
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <StarIcon sx={{ color: "#FFD700" }} />
                  <Typography variant="body1">
                    {Array(Math.floor(orchid.rating / 20))
                      .fill("⭐")
                      .join("")}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <FavoriteIcon sx={{ color: "#FF6B6B" }} />
                  <Typography variant="body1">
                    {orchid.numberOfLike} lượt thích
                  </Typography>
                </Box>
                <Box display="flex" gap={1} mt={2}>
                  {orchid.isSpecial && (
                    <Chip
                      label="✨ Đặc biệt"
                      color="primary"
                      sx={{
                        background: "linear-gradient(45deg, #ffd700, #ffa502)",
                        color: "#000",
                      }}
                    />
                  )}
                  {orchid.isNatural && (
                    <Chip
                      label="🌿 Tự nhiên"
                      color="success"
                      sx={{
                        background: "linear-gradient(45deg, #26de81, #20bf6b)",
                        color: "#fff",
                      }}
                    />
                  )}
                </Box>
              </div>
            </div>
          </div>

          {/* Tabs Component */}
          <Box sx={{ width: "100%", mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="orchid details tabs"
              >
                <Tab label="Thông tin" />
                <Tab label="Video" />
                <Tab label="Chi tiết" />
              </Tabs>
            </Box>

            {/* Tab 1: Thông tin cơ bản */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mt: 2 }}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6">Thông tin cơ bản</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon />
                        <Typography>
                          <strong>Xuất xứ:</strong> {orchid.origin}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ColorLensIcon />
                        <Typography>
                          <strong>Màu sắc:</strong> {orchid.color}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CategoryIcon />
                        <Typography>
                          <strong>Loại:</strong> {orchid.category}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6">Đặc điểm</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {orchid.name} là một loài hoa lan tuyệt đẹp với màu sắc{" "}
                      {orchid.color} đặc trưng. Xuất xứ từ {orchid.origin}, loài
                      hoa này thuộc họ {orchid.category} và được nhiều người yêu
                      thích.
                      {orchid.isSpecial &&
                        " Đây là một loài hoa đặc biệt với những đặc điểm độc đáo."}
                      {orchid.isNatural &&
                        " Loài hoa này được tìm thấy trong tự nhiên và có giá trị sinh thái cao."}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography variant="h6">Cách chăm sóc</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Để chăm sóc {orchid.name} tốt nhất, bạn nên:
                      <ul>
                        <li>
                          Đặt ở nơi có ánh sáng vừa phải, tránh ánh nắng trực
                          tiếp
                        </li>
                        <li>
                          Tưới nước đều đặn, không để đất quá ẩm hoặc quá khô
                        </li>
                        <li>Bón phân định kỳ mỗi 2-3 tháng</li>
                        <li>Kiểm tra sâu bệnh thường xuyên</li>
                      </ul>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </TabPanel>

            {/* Tab 2: Video */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mt: 2, width: "100%", height: "400px" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={orchid.clip}
                  title={`Video về ${orchid.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </TabPanel>

            {/* Tab 3: Chi tiết */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  {orchid.name} là một trong những loài hoa lan đẹp nhất thế
                  giới. Với màu sắc {orchid.color}
                  tuyệt đẹp và hương thơm dịu nhẹ, loài hoa này đã chinh phục
                  trái tim của nhiều người yêu hoa.
                </Typography>
                <Typography variant="body1" paragraph>
                  Xuất xứ từ {orchid.origin}, {orchid.name} thuộc họ{" "}
                  {orchid.category} và có đặc điểm nổi bật là cánh hoa mỏng manh
                  nhưng rất bền. Trong điều kiện chăm sóc tốt, hoa có thể nở từ
                  2-3 tháng.
                </Typography>
                <Typography variant="body1" paragraph>
                  {orchid.isSpecial &&
                    "Đây là một loài hoa đặc biệt với những đặc điểm độc đáo không thể tìm thấy ở các loài hoa khác."}
                  {orchid.isNatural &&
                    "Loài hoa này được tìm thấy trong tự nhiên và có giá trị sinh thái cao, góp phần vào sự đa dạng sinh học."}
                </Typography>
                <Typography variant="body1" paragraph>
                  Với {orchid.numberOfLike} lượt thích, đây là một trong những
                  loài hoa được yêu thích nhất trong bộ sưu tập của chúng tôi.
                </Typography>
              </Box>
            </TabPanel>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
              sx={{ mr: 2 }}
            >
              Quay lại trang chủ
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href={`mailto:info@orchids.com?subject=Thông tin về ${orchid.name}`}
            >
              Yêu cầu thông tin
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default OrchidDetail;
