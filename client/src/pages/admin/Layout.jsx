import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate(); // ✅ use directly

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null); // ✅ fix this
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-lg mb-6">
        <span
          onClick={() => navigate("/")}
          className="w-32 sm:w-40 cursor-pointer hover:scale-105 text-blue-600 transition-transform duration-300 hover:text-blue-800 font-bold text-xl"
        >
          Blogwise AI
        </span>

        <button
          onClick={logout}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 sm:px-10 py-2.5 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
