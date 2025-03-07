const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>Địa Chỉ</h3>
              <p>123 Đường Hoa Lan, Quận 1, TP.HCM</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <div>
              <h3>Điện Thoại</h3>
              <p>+84 123 456 789</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>info@bosuutaplan.com</p>
            </div>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Họ và tên" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Nội dung tin nhắn"></textarea>
          <button type="submit">Gửi tin nhắn</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
