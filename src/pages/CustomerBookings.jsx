import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/me/${user.id}`).then((res) => setBookings(res.data));
  }, [user]);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? <p>No bookings yet.</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Car</th>
              <th>City</th>
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
