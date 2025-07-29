import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api.js";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    setError("");

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (form.username.length > 8 || form.username.length < 5) {
      setError("Username must be between 5 and 8 characters.");
      return;
    }

    if (form.password.length > 15 || form.password.length < 8) {
      setError("Password must be between 8 and 15 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerUser(form);
      setIsLoading(false);
      const { user, token } = res.data;

      setAuth(user, token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-[100%] items-start 2xl:items-center justify-center min-w-0 overflow-hidden bg-green-600 xl:bg-white relative">
      {isLoading && <Spinner color={"cyan"} />}
      <div className="lg:bg-green-600 w-[90%] h-full xl:h-auto 2xl:h-full sm:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col justify-start 2xl:justify-center pt-20 xl:py-20 2xl:p-0">
        <form
          className="flex flex-col items-center px-5 xl:p-0"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-bold text-5xl sm:text-6xl xl:text-7xl mb-0 sm:mb-5 lg:mb-7 xl:mb-4">
            Brook<span className="text-black">Flow</span>
          </h1>

          {error && (
            <span className="text-red-600 text-lg text-center mb-2 mt-5 animate-shake">
              {error}
            </span>
          )}

          <div className="flex flex-col mt-5 gap-3 w-[95%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] text-lg sm:text-xl xl:text-2xl">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="reg-inputs sm:p-3"
              placeholder="Username"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="reg-inputs sm:p-3"
              placeholder="Email"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="reg-inputs sm:p-3"
              placeholder="Password"
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="reg-inputs sm:p-3"
              placeholder="Confirm Password"
            />
          </div>

          <button
            className="bg-black text-white w-[95%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%] rounded-md py-3 mt-4 font-semibold text-xl sm:py-4 hover:bg-gray-800"
            type="submit"
          >
            Register
          </button>
          <span className="text-white mt-5 text-md sm:text-lg xl:text-xl">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-900 font-semibold">
              Log in.
            </Link>
          </span>
        </form>
      </div>

      <div className="hidden xl:w-[40%] 2xl:w-[50%] xl:flex items-center justify-center xl:pt-40 2xl:p-0">
        <img
          src="/registerPage.png"
          alt="Register Page Image"
          className="w-[80%]"
        />
      </div>
    </div>
  );
};

export default Register;
