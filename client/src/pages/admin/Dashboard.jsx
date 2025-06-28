import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableitem from "../../components/admin/BlogTableitem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      if (res.data.success && res.data.dashboard) {
        setDashboard(res.data.dashboard);
      } else {
        toast.error(res.data.message || "Failed to load dashboard");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard(); // ✅ Ensure it's called
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard
          icon={assets.dashboard_icon_1}
          count={dashboard.blogs}
          label="Blogs"
        />
        <MetricCard
          icon={assets.dashboard_icon_2}
          count={dashboard.comments}
          label="Comments"
        />
        <MetricCard
          icon={assets.dashboard_icon_3}
          count={dashboard.drafts}
          label="Drafts"
        />
      </div>

      <div className="bg-white p-6 rounded-lg mb-4">
        <h3 className="text-xl font-semibold mb-2">
          Latest Blogs ({dashboard.recentBlogs.length})
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.recentBlogs.map((blog, idx) => (
              <BlogTableitem
                key={blog._id || idx}
                blog={blog}
                fetchBlogs={fetchDashboard}
                index={idx + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, count, label }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
    <img src={icon} alt={label} className="w-12 h-12" />
    <div>
      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
        {count}
      </div>
      <p className="text-sm uppercase text-gray-500 mt-1">{label}</p>
    </div>
  </div>
);

export default Dashboard;
