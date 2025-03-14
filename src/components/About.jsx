import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ParkIcon from "@mui/icons-material/Park";
import SpaIcon from "@mui/icons-material/Spa";

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section với độ tương phản tốt hơn */}
      <Box
        sx={{
          position: "relative",
          py: 8,
          mb: 6,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1588605360336-77a238e2e9b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          }}
        />

        {/* Nội dung với z-index cao hơn để hiển thị trên overlay */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
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
            Về Bộ Sưu Tập Lan Quý
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
            Chào mừng bạn đến với Bộ Sưu Tập Lan Quý - nơi lưu giữ và trưng bày
            những loài lan quý hiếm và đẹp nhất từ khắp nơi trên thế giới. Bộ
            sưu tập của chúng tôi được xây dựng với tình yêu và sự đam mê đối
            với những loài hoa lan tuyệt đẹp này.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Mỗi loài lan trong bộ sưu tập đều có một câu chuyện riêng, một vẻ
            đẹp độc đáo và những đặc điểm nổi bật. Chúng tôi hy vọng rằng thông
            qua bộ sưu tập này, bạn sẽ khám phá được vẻ đẹp đa dạng của thế giới
            hoa lan và hiểu thêm về tầm quan trọng của việc bảo tồn những loài
            hoa quý hiếm này.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Accordion Section */}
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Tìm hiểu thêm về hoa lan
          </Typography>

          <Paper
            elevation={2}
            sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                <Typography variant="h6">Lịch sử hoa lan</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Typography paragraph>
                  Hoa lan có lịch sử lâu đời và đã được con người biết đến từ
                  hàng nghìn năm trước. Trong văn hóa phương Đông, hoa lan được
                  xem là biểu tượng của sự thanh cao, tinh khiết và đức hạnh. Ở
                  phương Tây, hoa lan được coi là biểu tượng của sự sang trọng
                  và quý phái.
                </Typography>
                <Typography paragraph>
                  Vào thế kỷ 19, việc sưu tầm hoa lan trở thành một trào lưu phổ
                  biến trong giới quý tộc châu Âu, được gọi là "cơn sốt hoa lan"
                  (Orchidelirium). Nhiều nhà thám hiểm đã đi khắp thế giới để
                  tìm kiếm những loài lan mới và quý hiếm.
                </Typography>
                <Typography>
                  Ngày nay, hoa lan vẫn là một trong những loài hoa được yêu
                  thích nhất trên thế giới, với hàng nghìn loài khác nhau và vô
                  số giống lai tạo.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper
            elevation={2}
            sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                <Typography variant="h6">Đặc điểm của hoa lan</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Typography paragraph>
                  Hoa lan thuộc họ Orchidaceae, một trong những họ thực vật có
                  hoa lớn nhất với khoảng 28.000 loài được công nhận. Hoa lan có
                  thể được tìm thấy ở hầu hết các khu vực trên thế giới, ngoại
                  trừ các vùng sa mạc và băng giá.
                </Typography>
                <Typography paragraph>
                  Đặc điểm nổi bật của hoa lan là cấu trúc hoa phức tạp và đa
                  dạng. Hoa lan thường có 3 cánh hoa và 3 lá đài, trong đó một
                  cánh hoa biến đổi thành môi (labellum) - phần thường có màu
                  sắc rực rỡ và hình dạng đặc biệt để thu hút côn trùng thụ
                  phấn.
                </Typography>
                <Typography>
                  Hoa lan có khả năng thích nghi cao với môi trường sống, có thể
                  sống trên cây (phong lan), trên đá (thạch lan) hoặc trong đất
                  (địa lan). Mỗi loại có những đặc điểm và yêu cầu chăm sóc khác
                  nhau.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                <Typography variant="h6">Cách chăm sóc hoa lan</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Typography paragraph>
                  Chăm sóc hoa lan đòi hỏi sự kiên nhẫn và hiểu biết về nhu cầu
                  cụ thể của từng loài. Tuy nhiên, có một số nguyên tắc chung
                  khi chăm sóc hoa lan:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <LocalFloristIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Ánh sáng"
                      secondary="Hầu hết các loài lan cần ánh sáng vừa phải, tránh ánh nắng trực tiếp. Đặt lan ở nơi có ánh sáng tán xạ."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <SpaIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Nước"
                      secondary="Tưới nước đều đặn nhưng không để đất quá ẩm. Nhiều loài lan cần để khô giữa các lần tưới."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <ParkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Nhiệt độ và độ ẩm"
                      secondary="Hầu hết các loài lan thích nhiệt độ ôn hòa và độ ẩm cao. Có thể phun sương xung quanh lan để tăng độ ẩm."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <EmojiNatureIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Giá thể"
                      secondary="Sử dụng giá thể phù hợp với từng loại lan. Phong lan thường cần giá thể thoáng khí như vỏ cây, than củi."
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Team Section */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Đội ngũ của chúng tôi
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Nguyễn Thị Lan"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Nguyễn Thị Lan
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "medium" }}
                  >
                    Người sáng lập
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    Với hơn 20 năm kinh nghiệm trong việc sưu tầm và chăm sóc
                    hoa lan, chị Lan đã xây dựng nên bộ sưu tập lan quý với hơn
                    500 loài khác nhau.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Trần Văn Hùng"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Trần Văn Hùng
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "medium" }}
                  >
                    Chuyên gia lai tạo
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    Anh Hùng là chuyên gia hàng đầu trong lĩnh vực lai tạo hoa
                    lan. Anh đã tạo ra nhiều giống lan mới với màu sắc và hình
                    dạng độc đáo.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Lê Thị Hương"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Lê Thị Hương
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "medium" }}
                  >
                    Quản lý bộ sưu tập
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    Chị Hương phụ trách việc quản lý và chăm sóc bộ sưu tập hàng
                    ngày. Với sự tỉ mỉ và tận tâm, chị đảm bảo mỗi cây lan đều
                    được chăm sóc tốt nhất.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
