import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthUser";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    setError(null);
    e.preventDefault();

    if (passwordOne === passwordTwo) {
      try {
        const authUser = await createUserWithEmailAndPassword(
          email,
          passwordOne
        );
        console.log("user successfully made in firebase");
        console.info(authUser);
        router.push("/content"); // user is logged in
      } catch (error: any) {
        setError(error?.message);
      }
    } else {
      setError("Passwords do not match");
      e.preventDefault;
    }
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-aPrimary focus:border-aPrimary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPasswordOne(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-aPrimary focus:border-aPrimary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPasswordTwo(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-aPrimary focus:border-aPrimary sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/signup"
                  className="font-medium text-aDark hover:text-aPrimary"
                >
                  Already have an account?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aPrimary"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="h-screen flex">
    //   <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
    //     <div className="w-full px-8 md:px-32 lg:px-24">
    //       <form
    //         onSubmit={onSubmit}
    //         className="bg-white rounded-md shadow-2xl p-5"
    //       >
    //         <h1 className="text-gray-800 font-bold text-2xl mb-1">Sign Up</h1>
    //         <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5 text-gray-400"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    //             />
    //           </svg>
    //           <input
    //             id="email"
    //             className=" pl-2 w-full outline-none border-none"
    //             type="email"
    //             placeholder="email"
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>
    //         <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5 text-gray-400"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
    //               clipRule="evenodd"
    //             />
    //           </svg>
    //           <input
    //             className="pl-2 w-full outline-none border-none"
    //             type="password"
    //             id="password"
    //             placeholder="password"
    //             onChange={(e) => setPasswordOne(e.target.value)}
    //           />
    //         </div>
    //         <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5 text-gray-400"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
    //               clipRule="evenodd"
    //             />
    //           </svg>
    //           <input
    //             className="pl-2 w-full outline-none border-none"
    //             type="password"
    //             id="passwordTwo"
    //             placeholder="confirm password"
    //             onChange={(e) => setPasswordTwo(e.target.value)}
    //           />
    //         </div>
    //         <div className="pl-2 w-full outline-none border-none">
    //           {error && <p className="text-red-500 text-xs">{error}</p>}
    //         </div>

    //         <button
    //           type="submit"
    //           className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
    //         >
    //           Sign Up
    //         </button>
    //         <div className="flex justify-between mt-4">
    //           <Link href="/forgot-password">
    //             <a className="text-sm ml-2 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
    //               Forgot Password?
    //             </a>
    //           </Link>

    //           <Link href="/login">
    //             <a className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
    //               Already have an account?
    //             </a>
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignUp;
