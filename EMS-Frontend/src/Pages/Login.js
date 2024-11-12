import React from "react";

const LoginPage = () => {
  return (
    
    <div className="h-full flex items-center justify-center mt-[4vmax] ">
    <div className="border border-zinc-700 rounded-xl p-7 bg-zinc-400 shadow-lg">

    
      {/* Outer container with smooth border */}
      <div className="border border-zinc-700 rounded-xl p-12 bg-zinc-900 shadow-lg">
        {/* Inner login box */}
        <div className="bg-zinc-600 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl text-white font-bold mb-6 text-center">
            Employee Management System
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-zinc-300 font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
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
