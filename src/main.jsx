import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login";
import CustomerBrowse from "./pages/CustomerBrowse";
import CustomerBookings from "./pages/CustomerBookings";
import AdminCars from "./pages/AdminCars";
import AdminBookings from "./pages/AdminBookings";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={qc}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer/browse" element={<CustomerBrowse />} />
        <Route path="/customer/bookings" element={<CustomerBookings />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
