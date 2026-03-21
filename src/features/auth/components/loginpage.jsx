// src/features/auth/components/loginpage.jsx
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import FloatingField from "@/shared/field/FloatingField";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

        if (!result || !result.token || !result.user) {
          throw new Error("Invalid login response: missing token or user data");
        }

        toast.success("Login successful! Welcome back.");
        dispatch(setAuthData({ token: result.token, user: result.user }));
        document.cookie = `role=${result.user.role}; path=/`;

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setTimeout(() => {
          const userRole = result.user?.role;
          let redirectPath = "/dashboard";
          if (userRole === "admin") {
            redirectPath = "/admin/companies";
          } else if (userRole === "company") {
            redirectPath = "/companines/employee";
          }
          router.push(redirectPath);
        }, 100);
      } catch (err) {
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

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      formik.setFieldValue("email", rememberedEmail);
      setRememberMe(true);
    }

    if (isAuthenticated && user) {
      let redirectPath = "/dashboard";
      if (user.role === "admin") {
        redirectPath = "/admin/companies";
      } else if (user.role === "company") {
        redirectPath = "/companines/employee";
      }
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  return (
    <>
      <Head>
        <title>Login | Modern CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Card size="default" className="w-full shadow-2xl shadow-black/5 border-zinc-200">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-zinc-500 mt-1">
                Enter your credentials to access the CMS portal
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email Field using FloatingField */}
                <FloatingField
                  id="email"
                  label="Email Address"
                  type="email"
                  formik={formik}
                />

                {/* Password Field with show/hide functionality */}
                <div className="relative">
                  <FloatingField
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    formik={formik}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors z-10"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Remember Me and Forgot Password in one row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-zinc-900 bg-white border-zinc-300 rounded focus:ring-zinc-900"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-zinc-600"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isLoading}
                  className="w-full mt-2"
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
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-zinc-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-zinc-900 font-semibold hover:underline transition-all"
                >
                  Create one now
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}