import React, { useEffect, useState } from "react";
// import { comments_data } from "../../assets/assets";
import Commenttableitem from "../../components/admin/Commenttableitem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filterd, setFiltered] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Comments</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setFiltered("Approved")}
            className={`border px-4 py-1 rounded-full text-sm font-medium shadow hover:shadow-md transition-all duration-200 ${
              filterd === "Approved"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFiltered("Not Approved")}
            className={`border px-4 py-1 rounded-full text-sm font-medium shadow hover:shadow-md transition-all duration-200 ${
              filterd === "Not Approved"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-4xl overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Blog Title & Comment
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 max-sm:hidden uppercase">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filterd === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <Commenttableitem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
