import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleerror, handlesuccess } from "../utils";

const Signup = () => {
  const navigate = useNavigate(); 
  const [signupinfo, setsignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupinfo({ ...signupinfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;

    if (!name || !email || !password) {
      return handleerror("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupinfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return handleerror(errorData.message || "Signup failed");
      }

      const result = await response.json();
      handlesuccess("Signup successful!");

      navigate("/login");
    } catch (err) {
      handleerror("Network error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-green-200">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-800">
          Sign Up
        </h1>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-green-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={signupinfo.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-green-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={signupinfo.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-green-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={signupinfo.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-green-700 mt-5 text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-green-800 hover:underline font-medium">
            Login
          </Link>
        </p>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default Signup;
