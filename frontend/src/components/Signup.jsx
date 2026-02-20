import React, { useState } from "react";
import API from "../api";

function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await API.post("/auth/signup", {
        email,
        password,
      });

      // silently switch to login view after successful signup
      goToLogin();
    } catch (err) {
      setErrorMsg("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      {/* MAIN FINTECH CONTAINER */}
      <form
        onSubmit={handleSignup}
        className="
          w-full
          max-w-6xl
          grid
          lg:grid-cols-2
          rounded-2xl
          overflow-hidden
          shadow-2xl
          bg-white/95
          backdrop-blur
        "
      >
        {/* ================= LEFT BRAND PANEL ================= */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-linear-to-br from-emerald-700 to-emerald-900 text-white">
          <h1 className="text-4xl font-serif font-semibold mb-6">Budgetly</h1>

          <p className="text-emerald-100 text-lg leading-relaxed max-w-md">
            Take control of your finances with smart expense tracking, real-time
            insights, and powerful budgeting tools.
          </p>

          <div className="mt-10 space-y-3 text-emerald-200 text-sm">
            <p>✓ Track expenses effortlessly</p>
            <p>✓ Smart analytics dashboard</p>
            <p>✓ Secure cloud sync</p>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
              Create your account
            </h2>

            <p className="text-slate-500 mt-2">
              Start tracking your expenses today
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                px-4 py-3
                rounded-lg
                border
                border-slate-300
                focus:outline-none
                focus:ring-2
                focus:ring-emerald-600
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full
                  px-4 py-3
                  rounded-lg
                  border
                  border-slate-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-emerald-600
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-600 hover:text-slate-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 mt-2">{errorMsg}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-emerald-700
              hover:bg-emerald-800
              text-white
              font-semibold
              py-3
              rounded-lg
              transition
              shadow-md
              hover:shadow-lg
            "
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-slate-600 mt-8">
            Already have an account?{" "}
            <button
              type="button"
              onClick={goToLogin}
              className="text-emerald-700 font-semibold hover:underline"
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
