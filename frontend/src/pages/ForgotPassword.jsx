import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";
import { sendResetCode } from "../utils/api.js";
import useAuthStore from "../store/useAuthStore.js";
import toast from "react-hot-toast";

import Spinner from "../components/Spinner.jsx";

const ForgotPassword = () => {
  const setResetEmail = useAuthStore((state) => state.setResetEmail);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await sendResetCode(email);
      setResetEmail(email);
      toast.success("Reset code sent to your email!\nRedirecting...");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen xl:h-screen w-full flex  items-center justify-center relative">
      <div
        className={`bg-green-200 flex flex-col text-center w-[85%] sm:w-[65%] xl:w-[55%] 2xl:w-[35%] px-5 py-8 sm:py-12 xl:py-20 items-center rounded-lg shadow-lg border border-black ${
          isLoading ? "backdrop-blur-xl" : ""
        }`}
      >
        {isLoading && <Spinner color={"yellowgreen"} />}

        <h1 className="text-3xl sm:text-4xl xl:text-5xl text-green-900 font-semibold mb-5 xl:mb-8">
          Forgot <span className="text-black">Password</span>
        </h1>

        {error && (
          <p className="text-red-700 text-center mb-5 animate-shake">{error}</p>
        )}

        <p className="mb-3 sm:mb-4 xl:mb-5 sm:text-xl sm:px-5">
          Please enter your email to receive the reset code.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center gap-1"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. brookflow@gmail.com"
            className="log-inputs w-[95%] sm:w-[85%] xl:w-[70%] mb-3 text-lg placeholder:text-center text-center"
          />
          <button
            type="submit"
            className="bg-green-800 text-white w-[50%] sm:w-[40%] xl:w-[30%] py-3 rounded-md text-lg hover:bg-green-700"
          >
            Send Code
          </button>
        </form>

        <Link
          to={"/login"}
          className=" text-blue-900 font-semibold rounded-md mt-5 sm:text-xl"
        >
          Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
