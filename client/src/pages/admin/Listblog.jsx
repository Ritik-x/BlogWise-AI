import React, { useEffect, useState } from "react";
// import { blog_data } from "../../assets/assets";
import BlogTableitem from "../../components/admin/BlogTableitem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Listblog = () => {
  const [blogs, setBlogs] = useState([]);

  const { axios } = useAppContext();

  const fetchblogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.messege);
      }
    } catch (error) {
      toast.error(error.messege);
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br  min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6"> Blog List</h1>

      <div className="relative overflow-x-auto rounded-2xl bg-white shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-5 py-4 text-left">#</th>
              <th className="px-5 py-4 text-left">Blog Title</th>
              <th className="px-5 py-4 text-left">Date</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {blogs.map((blog, index) => (
              <BlogTableitem
                key={blog._id || index}
                blog={blog}
                fetchBlogs={fetchblogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listblog;
