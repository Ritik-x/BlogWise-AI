import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import Blogcard from "../components/Blogcard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap">
      {/* Category Buttons */}
      {blogCategories.map((item) => (
        <div key={item} className="relative">
          {menu === item && (
            <motion.div
              layoutId="underline"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute inset-0 bg-blue-200 rounded-full z-0"
            />
          )}
          <button
            onClick={() => setMenu(item)}
            className={`relative z-10 px-4 py-1 text-blue-400 rounded-full hover:bg-blue-200 transition cursor-pointer ${
              menu === item && "text-white bg-blue-700"
            }`}
          >
            {item}
          </button>
        </div>
      ))}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-7 mb-24 mx-8 sm:mx-18 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <Blogcard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
