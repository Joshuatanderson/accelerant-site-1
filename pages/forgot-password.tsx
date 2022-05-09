import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthUser";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { sendPasswordResetEmail } = useAuth();

  const onSubmit = async (e: Event) => {
    setError(null);
    try {
      e.preventDefault();
      const resp = await sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (error) {
      setError(error?.message);
      e.preventDefault();
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Reset Password
            </h1>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className=" pl-2 w-full outline-none border-none"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pl-2 w-full outline-none border-none">
              {success && (
                <p className="text-green-500 text-xs">
                  Success! Check your email for a reset link.
                </p>
              )}
            </div>
            <div className="pl-2 w-full outline-none border-none">
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Reset password
            </button>
            <div className="flex justify-between mt-4">
              <Link href="/signup">
                <a className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Don't have an account yet?
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
