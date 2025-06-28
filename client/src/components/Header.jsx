import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext(); // ✅ FIXED: added ()
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    setInput(value);
  };

  const handleClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="relative mx-8 sm:mx-16 xl:mx-24">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/40 rounded-full text-sm mx-auto">
          <p>New: AI Feature Integrated</p>
          <img src={assets.star_icon} alt="star" className="w-2.5" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-18">
          Blogwise AI – <span className="bg-blue-100 text-blue-700">Blog</span>{" "}
          Smarter, Not
          <span className="bg-blue-100 text-blue-500"> Harder</span>
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs">
          Say goodbye to writer’s block. Blogwise AI helps you write, edit, and
          publish killer blogs in minutes, powered by intelligent AI. From
          generating SEO-ready content to finding trending topics and publishing
          with a click — it’s blogging, reimagined.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-between max-w-lg max-sm:scale-90 mx-auto mt-6 border border-gray-300 bg-white rounded-full px-4 py-2 shadow-lg focus-within:border-blue-500 transition duration-300"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-500 px-2"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md"
          >
            Search
          </button>
        </form>

        {input && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute top-0 left-0 -z-10 opacity-50 w-full"
      />
    </div>
  );
};

export default Header;
