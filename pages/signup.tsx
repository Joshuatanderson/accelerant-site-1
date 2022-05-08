import React, { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthUser";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = async (e) => {
    setError(null);

    if (passwordOne === passwordTwo) {
      try {
        const authUser = await createUserWithEmailAndPassword(
          email,
          passwordOne
        );
        console.log("user successfully made in firebase");
        console.info(authUser);
        router.push("/logged_in");
      } catch (error) {
        setError(error?.message);
      }
    } else {
      setError("Passwords do not match");
      e.preventDefault;
    }
  };
  return (
    <div className="container signup">
      <div className="min-h-screen flex mb-4 row-signup">
        {/* <div className="w-3/5 h-12 row-right"> */}
        {/* <div className="text-dig"> */}
        {/* <p className="w-full text-base sm:text-lg md:text-xl text-center lg:text-2xl xl:text-5xl">
              Join the millions african developers to meet with
            </p>
            <div className="text-center mb-4 w-3/5">
              <img src="https://cdn.dribbble.com/users/79571/screenshots/5516891/workflow_4x.png" />
            </div> */}
        {/* </div> */}
        {/* </div> */}
        <div className="w-2/5  h-12 row-left">
          <div className="text-singup mb-8">
            <h2 className="">Join us for free</h2>
          </div>
          <div className="form-signup-dig">
            <div className="w-full max-w-xs">
              <form className="max-w-md mb-4 form-input" onSubmit={onSubmit}>
                {/* <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div> */}
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="password"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border border rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="signUpPassword"
                  ></label>
                  <input
                    className="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="signUpPassword"
                    onChange={(e) => setPasswordOne(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    for="confirmPassword"
                  ></label>
                  <input
                    className="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    onChange={(e) => setPasswordTwo(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-black hover:bg-blue-dark text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
