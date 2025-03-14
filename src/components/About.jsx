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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ParkIcon from "@mui/icons-material/Park";
import SpaIcon from "@mui/icons-material/Spa";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Về Bộ Sưu Tập Lan Quý
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph>
          Chào mừng bạn đến với Bộ Sưu Tập Lan Quý - nơi lưu giữ và trưng bày
          những loài lan quý hiếm và đẹp nhất từ khắp nơi trên thế giới. Bộ sưu
          tập của chúng tôi được xây dựng với tình yêu và sự đam mê đối với
          những loài hoa lan tuyệt đẹp này.
        </Typography>
        <Typography variant="body1" paragraph>
          Mỗi loài lan trong bộ sưu tập đều có một câu chuyện riêng, một vẻ đẹp
          độc đáo và những đặc điểm nổi bật. Chúng tôi hy vọng rằng thông qua bộ
          sưu tập này, bạn sẽ khám phá được vẻ đẹp đa dạng của thế giới hoa lan
          và hiểu thêm về tầm quan trọng của việc bảo tồn những loài hoa quý
          hiếm này.
        </Typography>
      </Box>

      {/* Accordion Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Tìm hiểu thêm về hoa lan
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Lịch sử hoa lan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Hoa lan có lịch sử lâu đời và đã được con người biết đến từ hàng
              nghìn năm trước. Trong văn hóa phương Đông, hoa lan được xem là
              biểu tượng của sự thanh cao, tinh khiết và đức hạnh. Ở phương Tây,
              hoa lan được coi là biểu tượng của sự sang trọng và quý phái.
            </Typography>
            <Typography paragraph>
              Vào thế kỷ 19, việc sưu tầm hoa lan trở thành một trào lưu phổ
              biến trong giới quý tộc châu Âu, được gọi là "cơn sốt hoa lan"
              (Orchidelirium). Nhiều nhà thám hiểm đã đi khắp thế giới để tìm
              kiếm những loài lan mới và quý hiếm.
            </Typography>
            <Typography>
              Ngày nay, hoa lan vẫn là một trong những loài hoa được yêu thích
              nhất trên thế giới, với hàng nghìn loài khác nhau và vô số giống
              lai tạo.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Đặc điểm của hoa lan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Hoa lan thuộc họ Orchidaceae, một trong những họ thực vật có hoa
              lớn nhất với khoảng 28.000 loài được công nhận. Hoa lan có thể
              được tìm thấy ở hầu hết các khu vực trên thế giới, ngoại trừ các
              vùng sa mạc và băng giá.
            </Typography>
            <Typography paragraph>
              Đặc điểm nổi bật của hoa lan là cấu trúc hoa phức tạp và đa dạng.
              Hoa lan thường có 3 cánh hoa và 3 lá đài, trong đó một cánh hoa
              biến đổi thành môi (labellum) - phần thường có màu sắc rực rỡ và
              hình dạng đặc biệt để thu hút côn trùng thụ phấn.
            </Typography>
            <Typography>
              Hoa lan có khả năng thích nghi cao với môi trường sống, có thể
              sống trên cây (phong lan), trên đá (thạch lan) hoặc trong đất (địa
              lan). Mỗi loại có những đặc điểm và yêu cầu chăm sóc khác nhau.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">Cách chăm sóc hoa lan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Chăm sóc hoa lan đòi hỏi sự kiên nhẫn và hiểu biết về nhu cầu cụ
              thể của từng loài. Tuy nhiên, có một số nguyên tắc chung khi chăm
              sóc hoa lan:
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
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Team Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Đội ngũ của chúng tôi
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                alt="Nguyễn Thị Lan"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Nguyễn Thị Lan
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Người sáng lập
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Với hơn 20 năm kinh nghiệm trong việc sưu tầm và chăm sóc hoa
                  lan, chị Lan đã xây dựng nên bộ sưu tập lan quý với hơn 500
                  loài khác nhau.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Trần Văn Hùng"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Trần Văn Hùng
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Chuyên gia lai tạo
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Anh Hùng là chuyên gia hàng đầu trong lĩnh vực lai tạo hoa
                  lan. Anh đã tạo ra nhiều giống lan mới với màu sắc và hình
                  dạng độc đáo.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt="Lê Thị Hương"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Lê Thị Hương
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Quản lý bộ sưu tập
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
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
  );
};

export default About;
