// src/BookingForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    seatType: "Regular",
    tickets: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/confirmation", { state: form });
    } else {
      alert("Booking failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-gray-800 p-6 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 rounded bg-gray-700"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 rounded bg-gray-700"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 rounded bg-gray-700"
      />
      <select
        name="seatType"
        value={form.seatType}
        onChange={handleChange}
        className="w-full mb-3 p-2 rounded bg-gray-700"
      >
        <option value="Regular">Regular</option>
        <option value="Premium">Premium</option>
      </select>
      <input
        type="number"
        name="tickets"
        min="1"
        max="10"
        value={form.tickets}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded bg-gray-700"
      />
      <button
        type="submit"
        className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
