import { useEffect, useState } from "react";
import API from "../api/axios";

import useSocket from "../hooks/useSocket";

const QueueStatus = () => {
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    try {
      const res = await API.get("/queue");
      setQueues(res.data.queues);
    } catch (error) {
      console.log(error);
    }
  };

  const generateToken = async (queueId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/queue/generate-token", {
        queueId,
        userId: user._id,
      });

      alert("Token Generated");
      fetchQueues();
    } catch (error) {
      alert(error.response?.data?.message || "Error generating token");
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  useSocket(() => {
    fetchQueues();
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Live Queue Status 🚀</h1>

      <div className="grid gap-4">
        {queues.map((q) => (
          <div
            key={q._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{q.departmentName}</h2>

              <p>Current Token: {q.currentToken}</p>
              <p>Waiting: {q.totalWaiting}</p>
            </div>

            <button
              onClick={() => generateToken(q._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Get Token
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueStatus;
