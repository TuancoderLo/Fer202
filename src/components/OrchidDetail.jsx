import { useParams, useNavigate } from "react-router-dom";
import { orchids } from "../data/ListOfOrchids";

const OrchidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchid = orchids.find((o) => o.id === id);

  if (!orchid) {
    return (
      <div className="error-page">
        <h2>Không tìm thấy thông tin hoa lan</h2>
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
              <h2>{orchid.name}</h2>
              <div className="orchid-stats-detail">
                <div className="rating-section">
                  <span className="rating">{"⭐".repeat(orchid.rating)}</span>
                  <span className="likes">❤️ {orchid.numberOfLike}</span>
                </div>
                <div className="badges-section">
                  {orchid.isSpecial && (
                    <span className="special-badge">✨ Đặc biệt</span>
                  )}
                  {orchid.isNatural && (
                    <span className="natural-badge">🌿 Tự nhiên</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="orchid-detail-content">
            <div className="detail-section">
              <h3>Thông tin chi tiết</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Xuất xứ:</span>
                  <span className="detail-value">{orchid.origin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Màu sắc:</span>
                  <span className="detail-value">{orchid.color}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Loại:</span>
                  <span className="detail-value">{orchid.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrchidDetail;
