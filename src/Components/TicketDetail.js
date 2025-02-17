import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetail = () => {
  const { movieId, sessionId, CinemaId } = useParams();
  const [seatAreas, setSeatAreas] = useState([]);

  const fetchSeatDetails = async () => {
    try {
      const response = await fetch(
        `https://api_new.cinepolisindia.com/api/booking/seat-layout/${sessionId}/${CinemaId}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const json = await response.json();
      console.log("API Response:", json);

      if (json?.data?.seatPlan?.SeatLayoutData?.Areas) {
        setSeatAreas(json.data.seatPlan.SeatLayoutData.Areas);
      } else {
        console.log("❌ Seat layout data not found");
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    fetchSeatDetails();
  }, [sessionId, CinemaId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        🎟️ Ticket Details
      </h1>

      {/* Movie Details */}
      <div className="bg-white p-4 rounded-md shadow">
        <p className="text-lg font-semibold">Movie ID: {movieId}</p>
        <p className="text-lg font-semibold">Session ID: {sessionId}</p>
        <p className="text-lg font-semibold">Cinema ID: {CinemaId}</p>
      </div>

      {/* Seat Layout Display */}
      {seatAreas.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">🎭 Seat Layout</h2>
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Area</th>
                <th className="py-2 px-4 border">Number of Seats</th>
              </tr>
            </thead>
            <tbody>
              {seatAreas.map((area, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{area.Description}</td>
                  <td className="py-2 px-4 border">{area.NumberOfSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6">
          ❌ No seat layout available.
        </p>
      )}
    </div>
  );
};

export default TicketDetail;