import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookings() {
  const [cities, setCities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/cities").then((res) => setCities(res.data));
  }, []);

  useEffect(() => {
    let url = "http://localhost:5000/api/bookings";
    if (selectedCity) url += `?cityId=${selectedCity}`;
    axios.get(url).then((res) => setBookings(res.data));
  }, [selectedCity]);

  return (
    <div>
      <h2>All Bookings (Admin)</h2>

      {/* Filter by city */}
      <label>Filter by City: </label>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">-- All Cities --</option>
        {cities.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Car</th>
              <th>City</th>
              <th>Customer</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.carId?.brand} {b.carId?.model}</td>
                <td>{b.cityId?.name}</td>
                <td>{b.customerId?.name} ({b.customerId?.email})</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>₹{b.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

