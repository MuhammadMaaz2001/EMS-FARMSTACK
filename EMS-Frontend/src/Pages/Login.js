import React, { useState } from "react";
import { loginUser } from "../APIServices/LoginAPI";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await loginUser(email, password);
      setMessage("Login successful!");
      setMessageType("success");
      localStorage.setItem("token", data.access_token);
  
      // Hide the message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      const errorDetail = error.detail;
      
      // Check if errorDetail is an array and format it into a string for display
      const errorMessage = Array.isArray(errorDetail)
        ? errorDetail.map((err) => err.msg).join(", ")
        : errorDetail || "Login failed!";
  
      setMessage(errorMessage);
      setMessageType("error");
  
      // Hide the error message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };
  
  return (
    <div className="h-full flex items-center justify-center mt-[4vmax] ">
      <div className="border border-zinc-700 rounded-xl p-7 bg-zinc-400 shadow-lg">
        <div className="border border-zinc-700 rounded-xl p-12 bg-zinc-900 shadow-lg">
          <div className="bg-zinc-600 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl text-white font-bold mb-6 text-center">
              Employee Management System
            </h2>

            {/* Success and Error Messages */}
            {message && (
              <div
                className={`text-center p-2 rounded-lg mb-4 ${
                  messageType === "success" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-zinc-300 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 focus:outline-none focus:ring focus:ring-zinc-500 transition-all"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-zinc-300 font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 focus:outline-none focus:ring focus:ring-zinc-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring focus:ring-amber-500 transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
