import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadProfile } from "../utils/api.js";
import { FaCamera } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import useAuthStore from "../store/useAuthStore.js";

const UserProfilePic = () => {
  const { user, setAuth, token } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

  function handleClick() {
    inputRef.current.click();
  }

  async function handleProfileChange(e) {
    console.log("Current token:", token);

    setIsLoading(true);

    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Image required!");
      return;
    }

    try {
      const uploadedImage = await uploadProfile(file, token);

      const imageUrl = uploadedImage.imageUrl;

      const updatedUser = { ...user, profilePic: imageUrl };
      setAuth(updatedUser, token);
      setIsLoading(false);

      toast.success("Profile Picture Uploaded!");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="bg-green-200 p-5 w-[150px] h-[150px] flex items-center justify-center rounded-full">
          <ImSpinner size={40} className="animate-spin" color="darkgreen" />
        </div>
      ) : (
        <>
          <div className="relative bg-green-200 rounded-full">
            <img
              src={user.profilePic || "/defaultProfile.jpg"}
              alt="Profile Picture"
              className="rounded-full object-cover h-[150px] xl:h-[250px] xl:w-[250px] 2xl:w-[150px] 2xl:h-[150px] w-[150px]"
            />
            <div onClick={handleClick} className="cursor-pointer">
              <FaCamera
                size={40}
                className="absolute bottom-0 right-0 text-gray-800 dark:text-gray-500"
                data-tooltip-id="camera-tooltip"
                data-tooltip-content="Upload Profile Picture"
              />
              <Tooltip id="camera-tooltip" />
            </div>
          </div>

          <input
            type="file"
            className="hidden"
            onChange={handleProfileChange}
            ref={inputRef}
          />
        </>
      )}
    </div>
  );
};

export default UserProfilePic;
