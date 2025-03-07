import { useState } from "react";
import { orchids } from "../data/ListOfOrchids";
import OrchidsList from "./OrchidsList";
import OrchidModal from "./OrchidModal";
import useTheme from "../hooks/useTheme";

const OrchidsContainer = () => {
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleShowDetail = (orchid) => {
    setSelectedOrchid(orchid);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <div className="orchids-container">
        <h2>Bộ Sưu Tập Lan Quý</h2>
        <p className="intro-text">
          Khám phá bộ sưu tập những loài lan độc đáo và quý hiếm từ khắp nơi
          trên thế giới
        </p>
        <OrchidsList orchids={orchids} onShowDetail={handleShowDetail} />
        <OrchidModal
          orchid={selectedOrchid}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default OrchidsContainer;
