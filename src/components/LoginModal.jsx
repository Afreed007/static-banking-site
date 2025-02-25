import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login & Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup

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
        <form className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-white font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
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
