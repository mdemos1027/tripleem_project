import React from "react";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d2127] text-white">
      <div className="bg-[#2a2f3a] p-10 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-[#1d2127] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-[#1d2127] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
