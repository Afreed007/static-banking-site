import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { users } from "../constants";

const Dashboard = () => {
  const userId = "1001"; // Example user ID
  const user = users[userId];
  const transactions = user.transactions;
  
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    setBalance(totalBalance);
  }, [transactions]);

  return (
    <div className="bg-primary w-full min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold text-gradient mb-6">
        Banking Dashboard
      </h1>

      {/* Account Summary */}
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl border-2 border-blue-gradient transition-all duration-300 hover:bg-black-gradient">
        <h2 className="text-xl font-semibold text-gradient">
          Account Summary
        </h2>
        <p className="mt-2 text-white">
          Current Balance: <span className="text-green-300 font-bold">${balance}</span>
        </p>
      </div>

      {/* Transaction History */}
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6 border-2 border-blue-gradient transition-all duration-300 hover:bg-black-gradient">
        <h2 className="text-xl font-semibold text-gradient mb-4">
          Transaction History
        </h2>
        <div className="overflow-auto max-h-80">
          <table className="w-full text-left border-collapse text-white">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-300">Date</th>
                <th className="p-2 border-b border-gray-300">Description</th>
                <th className="p-2 border-b border-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-blue-600 transition-all duration-300">
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.description}</td>
                  <td className={`p-2 ${txn.amount > 0 ? 'text-green-300' : 'text-red-300'}`}>
                    ${txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spending Analytics
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6 border-2 border-blue-gradient transition-all duration-300 hover:bg-black-gradient">
        <h2 className="text-xl font-semibold text-gradient mb-4">
          Spending Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip wrapperStyle={{ backgroundColor: '#ffffff', color: '#000000' }} />
            <Line type="monotone" dataKey="amount" stroke="#ffcc00" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
      {/* Spending Analytics */}
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6 border-2 border-blue-gradient transition-all duration-300 hover:bg-black-gradient">
        <h2 className="text-xl font-semibold text-gradient mb-4">
          Spending Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions.filter(txn => txn.amount < 0)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" domain={["auto", 0]} /> 
            <Tooltip wrapperStyle={{ backgroundColor: '#ffffff', color: '#000000' }} />
            <Line type="monotone" dataKey="amount" stroke="#ff4c4c" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Dashboard;
