import { orchids } from "../data/ListOfOrchids";
import OrchidsList from "./OrchidsList";

const OrchidsContainer = () => {
  return (
    <div className="page-container">
      <div className="orchids-container">
        <h2>Bộ Sưu Tập Lan Quý</h2>
        <p className="intro-text">
          Khám phá bộ sưu tập những loài lan độc đáo và quý hiếm từ khắp nơi
          trên thế giới
        </p>
        <OrchidsList orchids={orchids} />
      </div>
    </div>
  );
};

export default OrchidsContainer;
