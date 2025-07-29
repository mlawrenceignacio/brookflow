import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";
import { loginUser } from "../utils/api.js";
import Spinner from "../components/Spinner.jsx";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser(form);
      setIsLoading(false);
      const { user, token } = res.data;

      setAuth(user, token);

      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || "Registration failed.");
    }
  }

  return (
    <div
      className="flex min-h-screen w-[100%] justify-center min-w-0 overflow-hidden p-5 mb-10 xl:p-0 xl:m-0"
      relative
    >
      {isLoading && <Spinner color={"cyan"} />}
      <div className="bg-green-600 w-[50%] hidden xl:flex items-center justify-center ">
        <img
          src="/loginPage.png"
          alt="Log in page image."
          className="w-[80%]"
        />
      </div>
      <div className="w-[90%] sm:[80%] lg:w[70%] xl:w-[50%] flex flex-col justify-start pt-10 xl:p-0 xl:justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center "
        >
          <h1 className="text-green-900 font-bold text-5xl lg:text-7xl xl:text-7xl mb-2 ">
            Brook<span className="text-black">Flow</span>
          </h1>

          <img
            src="/loginPage.png"
            className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] lg:hidden"
            alt=""
          />

          {error && (
            <p className="text-red-500 mt-2 text-center animate-shake">
              {error}
            </p>
          )}

          <div className="w-[90%] sm:w-[70%] lg:w-[60%] 2xl:w-[50%] flex flex-col gap-3 text-lg mt-5 sm:text-xl lg:text-2xl">
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="log-inputs lg:py-4"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="log-inputs lg:py-4"
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 w-[90%] sm:w-[70%] lg:w-[60%] xl:w-[50%] py-3 text-lg sm:text-xl lg:text-2xl lg:py-4 text-white mt-5 rounded-md hover:bg-green-600"
          >
            Log In
          </button>

          <Link
            to={"/forgot-password"}
            className="mt-5 text-green-900 font-semibold sm:text-xl"
          >
            Forgot Password?
          </Link>

          <div className="mt-5 text-center">
            <p className="mb-4 2xl:mb-6 sm:text-xl lg:text-2xl">
              Don't have an account?
            </p>
            <Link
              to="/register"
              className="bg-black text-white py-2 px-7 text-lg sm:text-xl lg:text-2xl lg:py-3 rounded-md hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
