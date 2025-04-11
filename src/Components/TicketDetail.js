import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetail = () => {
  const { movieId, sessionId, CinemaId } = useParams();
  const [seatAreas, setSeatAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400 animate-fade-in">
          🎟️ Ticket Details
        </h1>

        <div className="bg-white/10 p-6 rounded-xl mb-6 text-lg space-y-2">
          <p><span className="font-semibold text-green-400">🎬 Movie ID:</span> {movieId}</p>
          <p><span className="font-semibold text-green-400">🕒 Session ID:</span> {sessionId}</p>
          <p><span className="font-semibold text-green-400">🏛️ Cinema ID:</span> {CinemaId}</p>
        </div>

        {loading ? (
          <p className="text-yellow-300 text-center text-lg animate-pulse">⏳ Loading seat layout...</p>
        ) : error ? (
          <p className="text-red-400 text-center text-lg">❌ {error}</p>
        ) : seatAreas.length > 0 ? (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-green-300">🎭 Seat Layout</h2>
            <table className="w-full text-sm bg-white/5 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-900 text-white uppercase">
                <tr>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Seats</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {seatAreas.map((area, index) => {
                  const totalPrice = ((area.PriceInCents || 0) + (area.TaxInCents || 0)) / 100;
                  return (
                    <tr
                      key={index}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-700/30"
                      } hover:bg-gray-700/50 transition`}
                    >
                      <td className="py-3 px-4">{area.Description}</td>
                      <td className="py-3 px-4">{area.NumberOfSeats}</td>
                      <td className="py-3 px-4 text-green-300 font-semibold">₹{totalPrice.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <select
                          onChange={(e) => setTicketCount(Number(e.target.value))}
                          className="bg-gray-900 border border-white/20 rounded px-2 py-1 text-white"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedArea(area);
                            setBookingConfirmed(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-full transition"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-400 mt-6 text-center">❌ No seat layout available.</p>
        )}

        {bookingConfirmed && selectedArea && (
          <div className="mt-10 bg-green-900/80 p-6 rounded-xl shadow-lg text-white w-full max-w-xl mx-auto animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 text-green-300">🎉 Booking Summary</h2>
            <p className="mb-2">🎫 <strong>{ticketCount}</strong> ticket(s) in <strong>{selectedArea.Description}</strong></p>
            <p className="mb-4">💰 Total: ₹{(((selectedArea.PriceInCents + selectedArea.TaxInCents) / 100) * ticketCount).toFixed(2)}</p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const bookingData = {
                  name,
                  phone,
                  email,
                  seatType: selectedArea.Description,
                  tickets: ticketCount,
                };

                const res = await fetch("http://localhost:5000/api/bookings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(bookingData),
                });

                if (res.ok) {
                  navigate("/confirmation", { state: bookingData });
                } else {
                  alert("Booking failed");
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="👤 Full Name"
                required
                className="w-full p-3 rounded bg-gray-800 text-white"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="📞 Phone Number"
                required
                className="w-full p-3 rounded bg-gray-800 text-white"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="📧 Email"
                required
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
