import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const transactions = [
  { date: "2025-03-01", description: "Salary Credit", amount: 2000 },
  { date: "2025-03-03", description: "Grocery Shopping", amount: -150 },
  { date: "2025-03-05", description: "Online Subscription", amount: -30 },
  { date: "2025-03-07", description: "Electricity Bill", amount: -100 },
  { date: "2025-03-10", description: "Dining Out", amount: -50 },
  { date: "2025-03-15", description: "Freelance Payment", amount: 500 },
  { date: "2025-03-18", description: "Gym Membership", amount: -40 },
  { date: "2025-03-20", description: "Internet Bill", amount: -60 },
];

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    setBalance(totalBalance);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Banking Dashboard</h1>

      {/* Account Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Account Summary</h2>
        <p className="text-gray-600 mt-2">Current Balance: <span className="text-green-500 font-bold">${balance}</span></p>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h2>
        <div className="overflow-auto max-h-80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.description}</td>
                  <td className={`p-2 ${txn.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>${txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spending Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Spending Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
