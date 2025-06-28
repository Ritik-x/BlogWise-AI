import React, { useState } from "react";
// import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
// import { parse } from "marked";
const Addblog = () => {
  const { axios } = useAppContext();

  const [isAdding, setisAdding] = useState(false);
  const [loading, setisLoading] = useState(false);

  const [thumbnail, setThumbnail] = useState(null); // for preview
  const [thumbnailFile, setThumbnailFile] = useState(null); // actual file

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const generateContent = async () => {
    if (!title.trim()) return toast.error("Please add a title");
    try {
      setisLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success && data.content) {
        setDescription(data.content);
      } else {
        toast.error(data.message || "Failed to generate content");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setisLoading(false);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];

    // ✅ Corrected code
    setThumbnail(URL.createObjectURL(file)); // For image preview
    setThumbnailFile(file); // For uploading to server
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title || !subtitle || !description || !category || !thumbnailFile) {
      return toast.error("Please fill all fields and upload an image.");
    }

    setisAdding(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", thumbnailFile);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message || "Blog added successfully!");

        // Reset form
        setTitle("");
        setSubtitle("");
        setDescription("");
        setCategory("");
        setThumbnail(null);
        setThumbnailFile(null);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("🔥 Blog upload error:", error);
      toast.error(error.response?.data?.message || "Error adding blog");
    } finally {
      setisAdding(false);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        ✍️ Add New Blog
      </h2>

      <form
        onSubmit={handleAddBlog}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Thumbnail */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="mt-4 w-64 rounded-xl shadow"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Subtitle
          </label>
          <input
            type="text"
            placeholder="Enter blog subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-medium mb-2">
              Blog Description
            </label>
            <button
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Generate with AI 🤖
            </button>
          </div>
          <textarea
            rows={6}
            placeholder="Write your blog description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:ring focus:ring-blue-300 outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Tech">Technology</option>
            <option value="Startup">Startup</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Finance">Finance</option>
            <option value="AI">AI</option>
          </select>
        </div>

        {/* Add Blog Button */}
        <div className="text-center">
          <button
            disabled={isAdding}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
          >
            ➕ {isAdding ? "Adding..." : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addblog;
