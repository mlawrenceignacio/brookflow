import React from "react";
import useAuthStore from "../store/useAuthStore";
import { FaCirclePlus } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const UserHeader = ({ handleCreate, setShowNotes }) => {
  const { user } = useAuthStore();

  return (
    <div className="flex 2xl:hidden gap-5 items-center justify-between bg-gray-700 dark:bg-gray-900 2xl:bg-gray-700  py-5 lg:px-8 px-4 w-[100%]">
      <div className="flex gap-2 items-center">
        <div>
          <img
            src={user.profilePic ? user.profilePic : "/defaultProfile.jpg"}
            alt="User Profile Picture"
            className="rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div>
          <p className="text-white font-bold text-xl">
            @{user.username.toUpperCase()}
          </p>
        </div>
      </div>
      <button
        className="text-blue-200"
        onClick={() => {
          handleCreate();
          setShowNotes(false);
        }}
      >
        <FaCirclePlus
          size={25}
          data-tooltip-id="create-note-tooltip"
          data-tooltip-content="Create Note"
        />
        <Tooltip id="create-note-tooltip" />
      </button>
    </div>
  );
};

export default UserHeader;
