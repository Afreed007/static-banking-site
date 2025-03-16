import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const transactions = location.state?.transactions || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <p className="text-lg"><strong>Debited:</strong> ₹{transactions.debited || "0"}</p>
        <p className="text-lg"><strong>Credited:</strong> ₹{transactions.credited || "0"}</p>
        <p className="text-lg"><strong>Withdrawn:</strong> ₹{transactions.withdrawn || "0"}</p>
        <p className="text-lg"><strong>Transferred:</strong> ₹{transactions.transferred || "0"}</p>
      </div>

      <button 
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;