import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();
  const { name, phone, email, seatType, tickets } = state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center mb-4 text-green-400">
          <span className="text-4xl mr-2">✅</span>
          <h1 className="text-3xl font-extrabold">Booking Confirmed!</h1>
        </div>

        <div className="space-y-3 text-sm sm:text-base">
          <p><span className="font-semibold text-gray-300">👤 Name:</span> {name}</p>
          <p><span className="font-semibold text-gray-300">📞 Phone:</span> {phone}</p>
          <p><span className="font-semibold text-gray-300">📧 Email:</span> {email}</p>
          <p><span className="font-semibold text-gray-300">💺 Seat Type:</span> {seatType}</p>
          <p><span className="font-semibold text-gray-300">🎟️ Tickets:</span> {tickets}</p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Thank you for booking with us. Enjoy your experience! 🌟
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
