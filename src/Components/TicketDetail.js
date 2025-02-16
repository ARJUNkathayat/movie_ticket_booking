import { useParams } from "react-router-dom";

const TicketDetail = () => {
  const { movieId, sessionId } = useParams();

  return (
    <div className="text-black text-center mt-10">
      <h1 className="text-3xl font-bold">Ticket Details</h1>
      <p>Movie ID: {movieId}</p>
      <p>Session ID: {sessionId}</p>
      {/* Add booking form here */}
    </div>
  );
};

export default TicketDetail;
