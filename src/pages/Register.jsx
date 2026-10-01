import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { MyStoreContext } from "../context/ShopContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useContext(MyStoreContext) || {};

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 600));
    loginUser?.({ name: data.name, email: data.email });
    console.log("Register data:", data);
    setRegisterSuccess(true);
    const destination = location.state?.from?.pathname || "/";
    setTimeout(() => {
      navigate(destination, { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-ink text-txt flex flex-col lg:grid lg:grid-cols-2 relative overflow-x-hidden font-body">
      {/* LEFT HALF */}
      <div className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 min-h-screen">
        {/* Ambient theme glow */}
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-volt/[0.06] rounded-full blur-[140px] pointer-events-none" />

        {/* Top: Logo matching project branding */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-volt flex items-center justify-center shadow-sm shadow-volt/20 group-hover:scale-105 transition-transform">
              <Zap size={18} className="text-ink fill-ink" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              <span className="text-txt">Sky</span>
              <span className="text-volt">Mart</span>
            </span>
          </Link>
        </div>

        {/* Middle: Hero Content */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <span className="text-volt text-xs font-bold tracking-widest uppercase mb-4 block font-heading">
            START YOUR JOURNEY
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-txt leading-[1.12] mb-5">
            Join the future.
            <br />
            <span className="text-volt">Today.</span>
          </h1>

          <p className="text-txt/60 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
            Unlock exclusive member discounts, faster one-click checkout, and real-time tracking on over 20,000+ items.
          </p>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
            <div className="border border-white/10 rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-center bg-white/[0.02] backdrop-blur-[2px]">
              <div className="text-lg sm:text-2xl font-bold text-volt tracking-tight font-heading">
                20K+
              </div>
              <div className="text-xs text-txt/60 font-medium mt-1">
                Products
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-center bg-white/[0.02] backdrop-blur-[2px]">
              <div className="text-lg sm:text-2xl font-bold text-volt tracking-tight font-heading">
                50K+
              </div>
              <div className="text-xs text-txt/60 font-medium mt-1">
                Users
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-center bg-white/[0.02] backdrop-blur-[2px]">
              <div className="text-lg sm:text-2xl font-bold text-volt tracking-tight font-heading">
                4.9★
              </div>
              <div className="text-xs text-txt/60 font-medium mt-1">
                Rating
              </div>
            </div>
          </div>
        </div>

        {/* Bottom space to balance layout */}
        <div className="hidden lg:block h-6" />
      </div>

      {/* RIGHT HALF */}
      <div className="relative flex items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen">
        {/* Ambient theme glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-volt/[0.04] rounded-full blur-[140px] pointer-events-none" />

        {/* Register Card */}
        <div className="relative z-10 w-full max-w-[430px] bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-md">
          <div className="mb-6">
            <h2 className="font-heading text-2xl sm:text-[26px] font-bold text-txt tracking-tight">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-txt/60 mt-1">
              Sign up to start shopping smarter
            </p>
          </div>

          {registerSuccess && (
            <div className="mb-5 p-3 rounded-xl bg-volt/10 border border-volt/30 text-volt text-xs sm:text-sm text-center font-medium">
              Account created successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
            {/* Full Name */}
            <div>
              <div className="relative flex items-center">
                <User
                  className="absolute left-4 text-txt/40 pointer-events-none"
                  size={18}
                  strokeWidth={1.8}
                />
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full bg-white/5 text-txt placeholder-txt/40 text-sm rounded-xl pl-11 pr-4 py-3 border transition outline-none ${
                    errors.name
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-volt/60 focus:ring-1 focus:ring-volt/30"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative flex items-center">
                <Mail
                  className="absolute left-4 text-txt/40 pointer-events-none"
                  size={18}
                  strokeWidth={1.8}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full bg-white/5 text-txt placeholder-txt/40 text-sm rounded-xl pl-11 pr-4 py-3 border transition outline-none ${
                    errors.email
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-volt/60 focus:ring-1 focus:ring-volt/30"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 text-txt/40 pointer-events-none"
                  size={18}
                  strokeWidth={1.8}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full bg-white/5 text-txt placeholder-txt/40 text-sm rounded-xl pl-11 pr-11 py-3 border transition outline-none ${
                    errors.password
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-volt/60 focus:ring-1 focus:ring-volt/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 text-txt/40 hover:text-txt transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.8} />
                  ) : (
                    <Eye size={18} strokeWidth={1.8} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 text-txt/40 pointer-events-none"
                  size={18}
                  strokeWidth={1.8}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className={`w-full bg-white/5 text-txt placeholder-txt/40 text-sm rounded-xl pl-11 pr-11 py-3 border transition outline-none ${
                    errors.confirmPassword
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-volt/60 focus:ring-1 focus:ring-volt/30"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Sign up Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-volt hover:bg-volt-light active:scale-[0.99] text-ink font-heading font-bold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer mt-3 shadow-md shadow-volt/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Creating account..." : "Sign up"}</span>
              <ArrowRight size={17} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Bottom link */}
          <p className="text-center text-xs text-txt/60 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-volt hover:text-volt-light font-medium transition ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
