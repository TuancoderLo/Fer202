const OrchidModal = ({ orchid, isOpen, onClose }) => {
  if (!isOpen || !orchid) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <img src={orchid.image} alt={orchid.name} className="modal-image" />
          <h2>{orchid.name}</h2>
          <div className="orchid-details">
            <p>
              <strong>Xuất xứ:</strong> {orchid.origin}
            </p>
            <p>
              <strong>Màu sắc:</strong> {orchid.color}
            </p>
            <p>
              <strong>Loại:</strong> {orchid.category}
            </p>
            <div className="orchid-stats">
              <p>
                <strong>Đánh giá:</strong> {"⭐".repeat(orchid.rating)}
              </p>
              <p>
                <strong>Lượt thích:</strong> ❤️ {orchid.numberOfLike}
              </p>
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
    </div>
  );
};

export default OrchidModal;
