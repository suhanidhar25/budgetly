import React, { useState } from "react";
import API from "../api";

function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        email,
        password,
      });

      alert("Signup successful! Please login.");
      goToLogin();
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4">

    {/* Auth Card */}
    <form
      onSubmit={handleSignup}
      className="
        w-full max-w-md
        rounded-2xl
        border border-white/10
        bg-[#1f4a73]/90
        shadow-2xl
        backdrop-blur
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-8 py-6 text-center bg-white/5">
        <div className="w-12 h-12 mx-auto mb-4 bg-white/10 text-white rounded-lg flex items-center justify-center font-bold">
          ET
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Create Account
        </h2>

        <p className="text-sm text-blue-200 mt-1">
          Start tracking your expenses today
        </p>
      </div>

      {/* Body */}
      <div className="bg-slate-100 text-slate-800 p-8">

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-2.5
              rounded-lg
              border border-slate-300
              focus:outline-none
              focus:ring-2 focus:ring-blue-400
              focus:border-blue-400
            "
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-2.5
              rounded-lg
              border border-slate-300
              focus:outline-none
              focus:ring-2 focus:ring-blue-400
              focus:border-blue-400
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-lg
            font-semibold
            text-white
            bg-[#0b2545]
            hover:bg-[#081a30]
            transition
            shadow-md
            active:scale-[0.98]
          "
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>

    </form>
  </div>
);

}

export default Signup;
