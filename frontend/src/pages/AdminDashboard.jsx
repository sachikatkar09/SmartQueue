import { useEffect, useState } from "react";
import API from "../api/axios";
import useSocket from "../hooks/useSocket";

const AdminDashboard = () => {
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    try {
      const res = await API.get("/queue");
      setQueues(res.data.queues);
    } catch (error) {
      console.log(error);
    }
  };

  // SOCKET REALTIME UPDATE
  useSocket(() => {
    fetchQueues();
  });

  useEffect(() => {
    fetchQueues();
  }, []);

  // CALL NEXT TOKEN
  const callNext = async (queueId) => {
    try {
      await API.put("/queue/next-token", { queueId });
      fetchQueues();
    } catch (error) {
      alert("Error calling next token");
    }
  };

  // COMPLETE TOKEN
  const completeToken = async (tokenId) => {
    try {
      await API.put(`/queue/complete/${tokenId}`);
      fetchQueues();
    } catch (error) {
      alert("Error completing token");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard ⚙️</h1>

      <div className="grid gap-4">
        {queues.map((q) => (
          <div key={q._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{q.departmentName}</h2>

            <p>Current Token: {q.currentToken}</p>
            <p>Waiting: {q.totalWaiting}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => callNext(q._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Call Next
              </button>

              <button
                onClick={() => completeToken(q.currentToken)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
