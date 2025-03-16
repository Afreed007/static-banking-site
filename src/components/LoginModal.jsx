import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../data/users.json"; // Importing users.json

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // For signup
  const [debitPin, setDebitPin] = useState(""); // For signup
  const [users, setUsers] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setUsers(usersData); // Load users.json as state
  }, []);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if accountNumber and debitPin match in users.json
    const userKey = Object.keys(users).find(
      (key) =>
        users[key].accountNumber === accountNumber &&
        users[key].debitPin === debitPin
    );

    if (userKey) {
      let updatedUsers = { ...users };
      updatedUsers[userKey] = {
        ...updatedUsers[userKey],
        email,
        password,
      };

      // Simulating writing to users.json (In real-world, this requires backend)
      try {
        await fetch("/data/users.json", {
          method: "PUT", // Simulating write operation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsers),
        });

        alert("✅ Signup Successful! Now login with your credentials.");
        setUsers(updatedUsers); // Update state
        setIsSignup(false); // Switch back to Login mode
      } catch (error) {
        console.error("Error updating users.json:", error);
      }
    } else {
      alert("❌ Invalid Account Number or Debit PIN.");
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if email and password match in users.json
    const validUserKey = Object.keys(users).find(
      (key) =>
        users[key].email === email && users[key].password === password
    );

    if (validUserKey) {
      alert("✅ Login Successful!");
      navigate("/dashboard", {
        state: { transactions: users[validUserKey]?.transactions || [] },
      });
    } else {
      alert("❌ Invalid Email or Password!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-primary p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gradient mb-6">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={isSignup ? handleSignup : handleLogin}>
          {isSignup && (
            <>
              <div>
                <label className="block text-white font-medium">Account Number</label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium">Debit Card PIN</label>
                <input
                  type="password"
                  placeholder="Enter your debit card PIN"
                  value={debitPin}
                  onChange={(e) => setDebitPin(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-primary bg-blue-gradient rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition-all"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between Login & Signup */}
        <p className="text-center text-white mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-300 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
