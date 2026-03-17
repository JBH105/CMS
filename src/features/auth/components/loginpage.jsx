import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useLoginMutation } from "../services/authApi";
import { useSelector, useDispatch } from "react-redux";
import { logout, setAuthData } from "@/features/auth/services/authSlice";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("🚀 ~ LoginPage ~ user:", user?.role)
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      formik.setFieldValue("email", rememberedEmail);
      setRememberMe(true);
    }

    if (isAuthenticated && user) {
      // Redirect based on role
      let redirectPath = "/dashboard";
      if (user.role === "admin") {
        redirectPath = "/admin/companies";
      } else if (user.role === "company") {
        redirectPath = "/companines/employee";
      }
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        console.log("Login result:", result);

        // Validate API response structure
        if (!result || !result.token || !result.user) {
          console.error("Invalid response structure:", result);
          throw new Error("Invalid login response: missing token or user data");
        }

        toast.success("Login successful! Welcome back.");

        // Manually set auth data in Redux and localStorage
        dispatch(setAuthData({ token: result.token, user: result.user }));

        document.cookie = `role=${result.user.role}; path=/`;

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Small delay to ensure state is updated before redirect
        setTimeout(() => {
          // Redirect based on user role with fallback
          const userRole = result.user?.role;
          let redirectPath = "/dashboard";
          if (userRole === "admin") {
            redirectPath = "/admin/companies";
          } else if (userRole === "company") {
            redirectPath = "/companines/employee";
          }
          console.log("Redirecting to:", redirectPath, "for role:", userRole);
          router.push(redirectPath);
        }, 100);
      } catch (err) {
        console.error("Login error:", err);
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to login. Please check your credentials.";
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      formik.setFieldValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login | Modern CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-blue-50 flex items-center justify-center relative overflow-hidden font-sans p-4">
        {/* Background Gradients & Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="backdrop-blur-xl bg-white/90 border border-blue-200 p-8 sm:p-10 rounded-3xl shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="text-center pb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-600 mt-2">
                Enter your credentials to access the CMS portal.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full bg-white border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-400 shadow-sm`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="absolute -bottom-5 left-1 text-[11px] text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="flex justify-between text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2"
                  htmlFor="password"
                >
                  <span>Password</span>
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:text-blue-800 capitalize tracking-normal underline decoration-blue-600/30 underline-offset-2 transition-colors"
                  >
                    Forgot?
                  </Link>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full bg-white border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    } rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-400 shadow-sm`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  {formik.touched.password && formik.errors.password && (
                    <p className="absolute -bottom-5 left-1 text-[11px] text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden rounded-xl bg-blue-600 text-white font-semibold py-3.5 text-sm transition-all hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-sm"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <span>Sign In</span>
                  )}
                  {/* Subtle hover sweep effect */}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors underline decoration-blue-600/30 underline-offset-4"
              >
                Create one now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
