import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthUser";

const Auth = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div className="row col">
      <div className="center">
        <h1>Logged in as:</h1>
        <p>{authUser?.email}</p>
      </div>
    </div>
  );
};

export default Auth;
