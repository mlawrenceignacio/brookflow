import React, { useState } from "react";
import { verifyResetCode, resetPass, sendResetCode } from "../utils/api.js";
import useAuthStore from "../store/useAuthStore.js";
import Spinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const resetEmail = useAuthStore((state) => state.resetEmail);
  const clearResetEmail = useAuthStore((state) => state.clearResetEmail);

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  function handleChange(e) {
    setCode(e.target.value);
  }

  async function handleSubmitCode(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await verifyResetCode(resetEmail, code);
      setIsLoading(false);
      toast.success(res?.data?.message);
      setStep(2);
    } catch (error) {
      setError(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  async function handleResetPass(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await resetPass(resetEmail, newPass, confirmPass);
      setIsLoading(false);
      toast.success(res?.data?.message);
      clearResetEmail();
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  async function handleSendAgain(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await sendResetCode(resetEmail);
      setIsLoading(false);
      toast.success(res?.data?.message);
    } catch (error) {
      setError(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex overflow-hidden h-screen sm:justify-center">
      <div className="hidden 2xl:flex w-[50%] bg-green-400 items-center justify-center">
        <img
          src="resetPassPage.png"
          alt="Reset Pass Page Image"
          className="w-[75%]"
        />
      </div>

      {step === 1 ? (
        <div className="w-[100%] 2xl:w-[50%] flex flex-col items-center justify-start mt-28 2xl:mt-0 2xl:justify-center relative">
          {isLoading && <Spinner color="cyan" />}

          <div className="flex flex-col w-[80%] sm:w-[70%] xl:w[600%] 2xl:w-[50%] mt-2">
            <h2 className="font-bold text-5xl 2xl:text-6xl text-green-900 mb-10 text-center">
              Verify <span className="text-black">Code</span>
            </h2>

            {error && (
              <p className="text-red-700 animate-shake text-center mb-2">
                {error}
              </p>
            )}

            <div className="flex flex-col items-center mb-10">
              <input
                type="email"
                value={resetEmail}
                disabled
                className="text-center text-gray-600 rounded-md p-2 text-lg bg-green-200 w-[100%] sm:w-[75%] 2xl:w-[90%]"
              />
              <div className="flex mt-3 gap-2 items-center sm:w-[75%] 2xl:w-[90%]">
                {isLoading ? (
                  <p className="flex-1">Sending...</p>
                ) : (
                  <p className="flex-1">
                    The reset code has been sent to your email address.
                  </p>
                )}
                <div
                  onClick={handleSendAgain}
                  className="shrink-0 bg-black text-white px-4 rounded-lg hover:bg-gray-800 flex items-center cursor-pointer py-3"
                >
                  Send Again
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmitCode}
              className="flex flex-col items-center mt-2"
            >
              <p className="mb-2 text-lg">Enter reset code:</p>
              <input
                type="text"
                value={code}
                onChange={handleChange}
                className="bg-green-300 p-3 w-[60%] sm:w-[50%] 2xl:w-[60%] text-lg rounded-lg border border-black text-center placeholder:text-gray-700"
                placeholder="000000"
              />
              <div
                className="bg-green-900 text-white w-[60%] sm:w-[50%] 2xl:w-[60%] py-3 sm:py-4 text-lg rounded-lg mt-4 hover:bg-green-700 text-center cursor-pointer"
                onClick={handleSubmitCode}
              >
                Verify Code
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[100%] sm:w-[80%] 2xl:w-[50%] justify-start 2xl:justify-center relative mt-20 lg:mt-24 2xl:mt-0">
          <form
            onSubmit={handleResetPass}
            className="flex flex-col items-center w-[80%] sm:w-[85%] 2xl:w-[100%]"
          >
            {isLoading && <Spinner />}

            <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl  text-green-900 mb-3 2xl:mb-5 text-center">
              Reset <span className="text-black">Password</span>
            </h2>

            {error && <p className="text-red-600 animate-shake">{error}</p>}

            <div className="flex flex-col p-2 items-center gap-3 w-full mt-2">
              <p className="text-center mb-2 sm:text-lg sm:w-[85%]">
                After changing your password, you’ll be redirected to the login
                page.
              </p>
              <input
                type="password"
                placeholder="Enter new password"
                className="reg-inputs reset-pass w-[100%] sm:w-[85%] lg:w-[75%] 2xl:w-[45%] lg:py-4 lg:text-xl"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="reg-inputs reset-pass sm:w-[85%] w-[100%] lg:w-[75%] lg:text-xl 2xl:w-[45%] lg:py-4"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <button
              className="bg-green-900 text-white w-[60%] sm:w-[50%] lg:w-[45%] 2xl:w-[44%] py-3 lg:py-5 rounded-lg text-lg lg:text-2xl font-semibold hover:bg-green-700 mt-3"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
