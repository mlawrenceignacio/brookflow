import React from "react";
import { IoMenu } from "react-icons/io5";

const Header = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <div
      className="flex items-center justify-between w-full dark:bg-gray-900 bg-green-800 sm:p-8 p-5"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <h1 className="text-3xl sm:text-5xl text-white font-semibold">
        Brook<span className="text-green-200">Flow</span>
      </h1>
      <div className="text-green-500 dark:text-gray-500">
        <IoMenu className="text-5xl sm:text-7xl" />
      </div>
    </div>
  );
};

export default Header;
