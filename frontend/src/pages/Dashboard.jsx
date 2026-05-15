import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.name || "User"} 🚀
        </h1>

        <p className="text-gray-600 mb-6">Email: {user?.email}</p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/queue")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Queue
          </button>

          <button
            onClick={() => navigate("/appointment")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Book Appointment
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
