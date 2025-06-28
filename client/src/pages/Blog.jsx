import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();

  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Inside fetchBlogData
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      console.log("🎯 Blog Fetch Response:", data);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Inside fetchComments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/blog/comments/${id}`);
      if (data.success) {
        setComment(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blogid: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.messege);
        setName("");
        setContent("");
      } else {
        toast.error(data.messege);
      }
    } catch (error) {
      toast.error(error.messege);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <>
      <div className="relative min-h-screen bg-white">
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-20 -z-10 w-full opacity-40 blur-sm"
        />

        <Navbar />

        {/* Title Section */}
        {/* Title Section */}
        <div className="text-center mt-16 sm:mt-20 mb-10 px-4 sm:px-6 lg:px-24 text-gray-800">
          <p className="text-sm text-gray-500 italic mb-3">
            Published on{" "}
            <span className="font-semibold text-blue-600">
              {moment(data.createdAt).format("MMMM Do YYYY")}
            </span>
          </p>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            {data.title}
          </h1>

          <h2 className="text-lg sm:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {data.subTitle}
          </h2>

          {/* 💫 Centered Michael Jackson badge */}
          <div className="flex justify-center mt-2">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-200 transition">
              Michael Jackson
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="mx-4 sm:mx-8 max-w-5xl md:mx-auto mt-10 mb-16">
          <img
            src={data.image}
            alt="Blog Thumbnail"
            className="rounded-3xl mb-8 shadow-md transition-transform hover:scale-[1.02]"
          />

          <div
            className="prose max-w-3xl mx-auto text-gray-700 text-[17px] sm:text-lg leading-relaxed prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:underline"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Comments */}
        <div className="mt-14 mb-16 px-4 sm:px-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Comments ({comment.length})
          </h3>

          <div className="flex flex-col gap-6">
            {comment.map((item, index) => (
              <div
                key={index}
                className="relative bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={assets.user_icon}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <p className="font-semibold text-gray-800">{item.name}</p>
                </div>

                <p className="text-sm text-gray-600 ml-11">{item.content}</p>

                <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Add Your Comment
        </p>

        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg bg-white p-6 shadow-lg rounded-lg border border-gray-200"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Write your comment..."
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Section */}
      <div className="text-center mb-20">
        <p className="text-gray-700 font-medium mb-3">
          Share this article on social media
        </p>
        <div className="flex justify-center gap-6">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            width={50}
            className="cursor-pointer hover:scale-105 transition"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            width={50}
            className="cursor-pointer hover:scale-105 transition"
          />
          <img
            src={assets.googleplus_icon}
            alt="Google Plus"
            width={50}
            className="cursor-pointer hover:scale-105 transition"
          />
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Blog;
