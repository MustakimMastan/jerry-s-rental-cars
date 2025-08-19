import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AdminCars() {
  const [cities, setCities] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get("http://localhost:5000/api/cities").then((res) => setCities(res.data));
  }, []);

  useEffect(() => {
    let url = "http://localhost:5000/api/cars";
    if (selectedCity) url += `?cityId=${selectedCity}`;
    axios.get(url).then((res) => setCars(res.data));
  }, [selectedCity]);

  // Add new car
  const onAddCar = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/cars", data);
      alert("Car added");
      reset();
      if (selectedCity) setSelectedCity(selectedCity); // refresh list
    } catch (err) {
      alert("Failed to add car");
    }
  };

  // Toggle status
  const toggleStatus = async (car) => {
    const newStatus = car.status === "available" ? "unavailable" : "available";
    await axios.patch(`http://localhost:5000/api/cars/${car._id}`, { status: newStatus });
    setCars((prev) =>
      prev.map((c) => (c._id === car._id ? { ...c, status: newStatus } : c))
    );
  };

  // Update price
  const updatePrice = async (car, newPrice) => {
    await axios.patch(`http://localhost:5000/api/cars/${car._id}`, { pricePerDay: newPrice });
    setCars((prev) =>
      prev.map((c) => (c._id === car._id ? { ...c, pricePerDay: newPrice } : c))
    );
  };

  return (
    <div>
      <h2>Manage Cars</h2>

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

      {/* Add Car Form */}
      <h3>Add New Car</h3>
      <form onSubmit={handleSubmit(onAddCar)}>
        <input placeholder="Model" {...register("model", { required: true })} />
        <input placeholder="Brand" {...register("brand", { required: true })} />
        <input
          type="number"
          placeholder="Price per Day"
          {...register("pricePerDay", { required: true })}
        />
        <select {...register("status")}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <select {...register("cityId", { required: true })}>
          <option value="">-- Choose City --</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Car</button>
      </form>

      {/* Car List */}
      <h3>Car List</h3>
      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>City</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.cityId?.name}</td>
                <td>
                  ₹{car.pricePerDay}{" "}
                  <button
                    onClick={() => {
                      const newPrice = prompt("Enter new price:", car.pricePerDay);
                      if (newPrice) updatePrice(car, newPrice);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>{car.status}</td>
                <td>
                  <button onClick={() => toggleStatus(car)}>Toggle Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
