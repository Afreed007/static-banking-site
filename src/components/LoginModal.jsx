import React, { useState, useEffect } from "react";
import usersData from "../data/users.json"; // Import local JSON

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // For signup
  const [debitPin, setDebitPin] = useState(""); // For signup
  const [users, setUsers] = useState([]); // Store users from JSON

  // Load users from JSON and localStorage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || usersData;
    setUsers(storedUsers);
  }, []);

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    const userIndex = users.findIndex(
      (user) => user.accountNumber === accountNumber && user.debitPin === debitPin
    );

    if (userIndex !== -1) {
      // Update user with email & password
      let updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        email,
        password
      };

      // Save updated users to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      alert("✅ Signup Successful! Now login with your credentials.");
      setIsSignup(false); // Switch to login
    } else {
      alert("❌ Invalid Account Number or Debit PIN.");
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    // Get updated users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || users;
    const validUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      alert("✅ Login Successful!");
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
