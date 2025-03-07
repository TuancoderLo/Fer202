const OrchidCard = ({ orchid, onShowDetail }) => {
  return (
    <div className="orchid-card">
      <img src={orchid.image} alt={orchid.name} />
      <div className="orchid-info">
        <h3>{orchid.name}</h3>
        <p>
          <i className="fas fa-map-marker-alt"></i>
          Xuất xứ: {orchid.origin}
        </p>
        <p>
          <i className="fas fa-palette"></i>
          Màu sắc: {orchid.color}
        </p>
        <p>
          <i className="fas fa-tag"></i>
          Loại: {orchid.category}
        </p>
        <div className="orchid-stats">
          <span className="rating-stars">{"⭐".repeat(orchid.rating)}</span>
          <span className="like-count">
            ❤️ {orchid.numberOfLike.toLocaleString()}
          </span>
          {orchid.isSpecial && (
            <span className="special-badge">✨ Đặc biệt</span>
          )}
          {orchid.isNatural && (
            <span className="natural-badge">🌿 Tự nhiên</span>
          )}
        </div>
        <button className="detail-btn" onClick={() => onShowDetail(orchid)}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default OrchidCard;
