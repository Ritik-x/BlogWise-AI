import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-64 min-h-screen py-6 px-4 border-r border-gray-200">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-4 py-3 px-4 rounded-md font-medium text-gray-700 hover:bg-blue-50 transition-all duration-200 group ${
            isActive ? "bg-blue-100 text-blue-700 shadow-inner" : ""
          }`
        }
      >
        <img
          src={assets.home_icon}
          alt="Dashboard"
          className="w-5 min-w-[20px] transition-transform group-hover:scale-110"
        />
        <span className="text-base tracking-wide">Dashboard</span>
      </NavLink>

      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-4 py-3 px-4 rounded-md font-medium text-gray-700 hover:bg-blue-50 transition-all duration-200 group ${
            isActive ? "bg-blue-100 text-blue-700 shadow-inner" : ""
          }`
        }
      >
        <img
          src={assets.add_icon}
          alt="Dashboard"
          className="w-5 min-w-[20px] transition-transform group-hover:scale-110"
        />
        <span className="text-base tracking-wide">Add Blog</span>
      </NavLink>

      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex items-center gap-4 py-3 px-4 rounded-md font-medium text-gray-700 hover:bg-blue-50 transition-all duration-200 group ${
            isActive ? "bg-blue-100 text-blue-700 shadow-inner" : ""
          }`
        }
      >
        <img
          src={assets.list_icon}
          alt="Dashboard"
          className="w-5 min-w-[20px] transition-transform group-hover:scale-110"
        />
        <span className="text-base tracking-wide">Blog List</span>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-4 py-3 px-4 rounded-md font-medium text-gray-700 hover:bg-blue-50 transition-all duration-200 group ${
            isActive ? "bg-blue-100 text-blue-700 shadow-inner" : ""
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt="Dashboard"
          className="w-5 min-w-[20px] transition-transform group-hover:scale-110"
        />
        <span className="text-base tracking-wide">Comments</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
