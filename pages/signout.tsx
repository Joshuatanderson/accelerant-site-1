import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthUser";

const SignOut = () => {
  const { authUser } = useAuth();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { signOut } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await signOut();
      console.log(resp);
      console.log("user logged out via firebase");
      router.push("/"); // user is logged out
    } catch (error: any) {
      setError(error?.message);
      e.preventDefault();
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="bg-white rounded-md shadow-2xl p-5">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <p>{authUser?.email}</p>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              onClick={onSubmit}
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
