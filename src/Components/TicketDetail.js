import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetail = () => {
  const { movieId, sessionId, CinemaId } = useParams();
  const [seatAreas, setSeatAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const fetchSeatDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api_new.cinepolisindia.com/api/booking/seat-layout/${sessionId}/${CinemaId}`
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const json = await response.json();
      const areaData = json?.data?.seatPlan?.SeatLayoutData?.Areas;

      if (areaData) setSeatAreas(areaData);
      else setError("Seat layout data not found.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sessionId, CinemaId]);

  useEffect(() => {
    fetchSeatDetails();
  }, [fetchSeatDetails]);

  const toggleSeat = (seat, rowName, area) => {
    if (seat.Status !== 0) return;

    const seatId = `${rowName}${seat.Position.ColumnIndex}`;
    const isAlreadySelected = selectedSeats.includes(seatId);

    setSelectedSeats((prev) =>
      isAlreadySelected ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );

    setSelectedArea(area); // to show selected seat type
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    const bookingData = {
      name,
      phone,
      email,
      seatType: selectedArea?.Description || "Standard",
      tickets: selectedSeats.length,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * (selectedArea?.Price || 150),
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "🎉 Booking Confirmed!" });
        setTimeout(() => {
          navigate("/confirmation", { state: bookingData });
        }, 1500);
      } else {
        setMessage({ type: "error", text: "Booking failed. Please try again." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white/5 p-6 rounded-xl shadow-xl border border-white/10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-400">
          🎟️ Ticket Details
        </h1>

        {message.text && (
          <div
            className={`mb-4 text-center px-4 py-2 rounded ${
              message.type === "success"
                ? "bg-green-700 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-6">
          <p><strong>🎬 Movie ID:</strong> {movieId}</p>
          <p><strong>🕒 Session ID:</strong> {sessionId}</p>
          <p><strong>🏛️ Cinema ID:</strong> {CinemaId}</p>
        </div>

        {loading ? (
          <p className="text-yellow-300 text-center">⏳ Loading seat layout...</p>
        ) : error ? (
          <p className="text-red-400 text-center">❌ {error}</p>
        ) : seatAreas.length > 0 ? (
          <div className="space-y-10">
            {seatAreas.map((area, areaIndex) => (
              <div
                key={areaIndex}
                className="border border-white/10 p-4 rounded-xl bg-gray-800"
              >
                <h3 className="text-xl font-bold text-blue-300 mb-2 flex items-center justify-between">
                  🎭 {area.Description}
                  <span className="text-green-400 text-sm">₹{area.Price}</span>
                </h3>

                <div className="flex flex-col gap-2">
                  {area.Rows?.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <span className="w-6">{row.PhysicalName}</span>
                      <div className="flex gap-1 flex-wrap">
                        {row.Seats.map((seat, seatIndex) => {
                          const seatId = `${row.PhysicalName}${seat.Position.ColumnIndex}`;
                          const isSelected = selectedSeats.includes(seatId);
                          const isBooked = seat.Status !== 0;

                          return (
                            <button
                              key={seatIndex}
                              title={isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
                              onClick={() => toggleSeat(seat, row.PhysicalName, area)}
                              disabled={isBooked}
                              className={`w-12 h-8 rounded-md font-bold text-xs transition-all transform
                                ${
                                  isBooked
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-yellow-400 text-black scale-110 ring-2 ring-yellow-300"
                                    : "bg-green-700 hover:bg-green-500"
                                }
                              `}
                            >
                              {seat.Position.ColumnIndex}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex gap-4 text-sm text-white items-center">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-3 bg-green-700 rounded-sm border border-white/10"></div>
                    Available
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-3 bg-yellow-400 rounded-sm border border-yellow-300"></div>
                    Selected
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-3 bg-gray-600 rounded-sm border border-white/10"></div>
                    Booked
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-400 mt-6 text-center">❌ No seat layout available.</p>
        )}

        {selectedSeats.length > 0 && (
          <div className="mt-10 bg-green-900/80 p-6 rounded-lg text-white w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-green-300">🎉 Booking Summary</h2>
            <p className="mb-2">🎫 <strong>{selectedSeats.length}</strong> ticket(s) selected</p>
            <p className="mb-2">🪑 Seats: {selectedSeats.join(", ")}</p>
            <p className="mb-4">💰 Total: ₹{(selectedSeats.length * (selectedArea?.Price || 150)).toFixed(2)}</p>

            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="text"
                placeholder="👤 Full Name"
                required
                value={name}
                className="w-full p-3 rounded bg-gray-800 text-white"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="📞 Phone Number"
                required
                value={phone}
                className="w-full p-3 rounded bg-gray-800 text-white"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="📧 Email"
                required
                value={email}
                className="w-full p-3 rounded bg-gray-800 text-white"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold text-lg transition"
              >
                Confirm Booking ✅
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
