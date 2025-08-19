import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CustomerBrowse() {
  const [cities, setCities] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/api/cities").then((res) => setCities(res.data));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`http://localhost:5000/api/cars?cityId=${selectedCity}&status=available`)
        .then((res) => setCars(res.data));
    } else {
      setCars([]);
    }
  }, [selectedCity]);

  const onBook = async (data) => {
    const booking = { ...data, customerId: user.id, cityId: selectedCity };
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", booking);
      alert("Booking successful! Total Price: " + res.data.totalPrice);
      reset();
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Browse Cars</h2>

      <label>Select City: </label>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">-- Choose City --</option>
        {cities.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <h3>Available Cars</h3>
      {cars.length === 0 && <p>No cars found.</p>}
      {cars.map((car) => (
        <form key={car._id} onSubmit={handleSubmit(onBook)}>
          <p>{car.brand} {car.model} - ₹{car.pricePerDay}/day</p>
          <input type="hidden" value={car._id} {...register("carId")} />
          <input type="date" {...register("startDate", { required: true })} />
          <input type="date" {...register("endDate", { required: true })} />
          <button type="submit">Book</button>
        </form>
      ))}
    </div>
  );
}
