import OrchidCard from "./OrchidCard";

const OrchidsList = ({ orchids }) => {
  return (
    <div className="orchids-grid">
      {orchids.map((orchid) => (
        <OrchidCard key={orchid.id} orchid={orchid} />
      ))}
    </div>
  );
};

export default OrchidsList;
