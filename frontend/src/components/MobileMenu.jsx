import React from "react";
import useAuthStore from "../store/useAuthStore";
import { LuSquareArrowLeft } from "react-icons/lu";

import ThemeToggleButton from "./ThemeToggleButton";
import UserProfilePic from "./UserProfilePic";

const MobileMenu = ({ handleLogout, setIsMenuOpen }) => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-start dark:bg-gray-800 bg-green-600 pt-10 sm:pt-20 lg:pt-5 2xl:pt-7 overflow-y-auto scrollbar-hidden-sm h-full">
      <div className="flex flex-col items-center">
        <UserProfilePic />
        <p className="text-xl xl:text-3xl font-semibold mt-2 text-green-200">
          @{user.username.toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col text-lg gap-2 sm:gap-3 px-8 py-3 items-center w-full sm:w-[80%] lg:w-[30%] mt-5">
        <button
          className="bg-blue-800 w-[75%] h-12 sm:h-14 rounded-full flex items-center justify-center text-center text-xl text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          Go Back
        </button>

        <ThemeToggleButton />

        <button
          className="bg-red-700 text-white w-[75%] h-12 sm:h-14 rounded-full text-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
