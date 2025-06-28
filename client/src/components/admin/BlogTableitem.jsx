import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableitem = ({ blog, fetchBlogs, index }) => {
  const { title = "Untitled", createdAt, isPublished, _id } = blog;
  const formattedDate = createdAt ? new Date(createdAt).toDateString() : "—";
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const res = await axios.post("/api/blog/delete", { id: _id });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchBlogs();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{index}</td>
      <td className="px-4 py-2">{title}</td>
      <td className="px-4 py-2">{formattedDate}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-4 py-2 text-center">
        <button onClick={deleteBlog}>
          <img
            src={assets.cross_icon}
            className="w-5 h-5 inline-block"
            alt="Delete"
          />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableitem;
