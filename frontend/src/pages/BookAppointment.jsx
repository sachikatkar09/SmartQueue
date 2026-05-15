import { useEffect, useState } from "react";
import API from "../api/axios";

const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH HISTORY
  const fetchAppointments = async () => {
    try {
      const res = await API.get(`/appointment/history/${user._id}`);
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  // BOOK APPOINTMENT
  const bookAppointment = async () => {
    try {
      await API.post("/appointment/book", {
        userId: user._id,
        department,
        appointmentDate: date,
        tokenNumber: Math.floor(Math.random() * 100),
      });

      alert("Appointment Booked");
      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // CANCEL APPOINTMENT
  const cancelAppointment = async (id) => {
    try {
      await API.put(`/appointment/cancel/${id}`);
      alert("Cancelled");
      fetchAppointments();
    } catch (error) {
      alert("Error cancelling");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Book Appointment 📅</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={bookAppointment}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Book
        </button>
      </div>

      {/* LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>

        {appointments.map((a) => (
          <div
            key={a._id}
            className="bg-white p-4 mb-3 rounded shadow flex justify-between"
          >
            <div>
              <p>Department: {a.department}</p>
              <p>Date: {a.appointmentDate}</p>
              <p>Status: {a.status}</p>
            </div>

            <button
              onClick={() => cancelAppointment(a._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAppointment;
