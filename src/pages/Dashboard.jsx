import { useAuth0 } from "@auth0/auth0-react";


const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1d2127] text-white">
        <p className="text-xl">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <div className="text-white">Unauthorized</div>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">Welcome, {user.name || user.email}</h2>
      <img src={user.picture} alt="avatar" className="w-12 h-12 rounded-full mb-4" />
      <p>This is your secure dashboard.</p>
      
    </div>
  );
};

export default Dashboard;
