import { createContext, useContext, Context } from "react";
import { User } from "../types/User";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const AuthUserContext = createContext<{
  authUser: User | null;
  loading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => {};
  sendPasswordResetEmail: (email: string) => Promise<void>;
}>({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  sendPasswordResetEmail: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }: any) {
  const authState = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={authState}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
