import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Commenttableitem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approvedComments = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComments = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;

      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm text-gray-800">
        <p className="mb-2">
          <span className="font-semibold">Blog:</span>{" "}
          {blog?.title || "Untitled"}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Name:</span> {comment.name}
        </p>
        <p>
          <span className="font-semibold">Comment:</span> {comment.content}
        </p>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
        {blogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        <div className="flex gap-3 items-center justify-center">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
              onClick={approvedComments} // ✅ added click event
            />
          ) : (
            <span className="text-green-600 font-medium">Approved</span>
          )}

          <img
            src={assets.bin_icon}
            alt="Delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
            onClick={deleteComments} // ✅ added click event
          />
        </div>
      </td>
    </tr>
  );
};

export default Commenttableitem;
