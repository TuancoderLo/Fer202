const OrchidCard = ({ orchid }) => {
  return (
    <div className="orchid-card">
      <img src={orchid.image} alt={orchid.name} />
      <div className="orchid-info">
        <h3>{orchid.name}</h3>
        <p>
          <i className="fas fa-map-marker-alt"></i> Xuất xứ: {orchid.origin}
        </p>
        <p>
          <i className="fas fa-palette"></i> Màu sắc: {orchid.color}
        </p>
        <p>
          <i className="fas fa-tag"></i> Loại: {orchid.category}
        </p>
        <div className="orchid-stats">
          <span title="Đánh giá">{"⭐".repeat(orchid.rating)}</span>
          <span title="Lượt thích">
            ❤️ {orchid.numberOfLike.toLocaleString()}
          </span>
          {orchid.isSpecial && (
            <span className="special-badge" title="Hoa lan đặc biệt">
              ✨ Đặc biệt
            </span>
          )}
          {orchid.isNatural && (
            <span className="natural-badge" title="Hoa lan tự nhiên">
              🌿 Tự nhiên
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrchidCard;
