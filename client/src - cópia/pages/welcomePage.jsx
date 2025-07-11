// src/pages/WelcomePage.jsx
import { Link } from "react-router-dom";


export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to SkillSwap</h1>
      <p className="text-lg mb-8 text-gray-600 text-center max-w-md">
        Exchange skills with people nearby and grow together!
      </p>
      <Link to="/auth">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-semibold">
          Sign Up / Log In
        </button>
      </Link>
    </div>
  );
}
