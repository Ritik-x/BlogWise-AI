import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 text-gray-700">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 py-12 border-b border-gray-300">
        {/* Logo + Description */}
        <div className="max-w-md">
          {/* <img src={assets.logo} alt="logo" className="w-32 sm:w-44" /> */}

          <span className="w-32  sm:w-44 cursor-pointer hover:bg-amber-100">
            {" "}
            <h1>Blogwise AI</h1>
          </span>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            Blogwise AI is your smart companion in blogging — combining AI tech
            and user-friendly tools to help you blog smarter, not harder.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-[60%]">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {/* 🔥 Check if link is a string or object */}
                    {typeof link === "string" ? (
                      <a
                        href="#"
                        className="hover:text-primary transition-colors duration-200"
                      >
                        {link}
                      </a>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="text-center text-xs py-6 text-gray-500">
        © {new Date().getFullYear()} Blogwise AI. All rights reserved.{" "}
        <span className="text-blue-700 font-medium">By Ritik Garg</span>
      </div>
    </div>
  );
};

export default Footer;
