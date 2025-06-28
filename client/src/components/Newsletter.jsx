import React from "react";

const Newsletter = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Never Miss A <span className="text-blue-600">Blog</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Subscribe now to get the latest updates straight to your inbox.
        </p>
        <form className="flex gap-4 items-center justify-between max-w-2xl w-full h-14 mx-auto bg-white border border-blue-300 shadow-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full h-full px-6 text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="h-full px-6 md:px-10 bg-blue-600 text-white font-medium rounded-full rounded-l-none hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
};

export default Newsletter;
