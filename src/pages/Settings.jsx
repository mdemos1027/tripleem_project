import { useState, useEffect } from "react";

const Settings = () => {
  // State for storing input values
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  // Load values from localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedUsername = localStorage.getItem("username");
    const savedUserRole = localStorage.getItem("userRole");

    if (savedEmail) setEmail(savedEmail);
    if (savedUsername) setUsername(savedUsername);
    if (savedUserRole) setUserRole(savedUserRole);
  }, []);

  // Handle form submission and store data in localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the form data to localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("userRole", userRole);

    // Log the values for testing purposes
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("User Role:", userRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2127] text-white">
      <div className="bg-[#2f343f] p-8 w-[400px] rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-6">Settings Page</h2>

        {/* Form to capture email, username, and userRole */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">User Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
          >
            Save Changes
          </button>
        </form>

        {/* Displaying the input values for testing */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Testing Output:</h3>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <p>User Role: {userRole}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
