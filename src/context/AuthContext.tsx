import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { hash } from "bcryptjs";



type User = {
 
  email: string;
 
};

type AuthContextType = {
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null | undefined>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
 const loginMutation = useMutation(api.functions.login.login);


  const [user, setUser] = useState<User | null | undefined>(null);

  const login = async (email: string, password: string) => {
    // password = await hash(password,12);
    const result = await loginMutation({ email, password });

    if (result.success) {
      setUser(result.user);
      return true;
    }

    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside <AuthProvider>");
  return ctx;
};