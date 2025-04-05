import { useState, ReactNode } from "react";
import { AuthContext } from "./auth-context"; // ✅ Import the context

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [roleAccess, setRoleAccess] = useState<string | null>(
    localStorage.getItem("roleAccess")
  );

  const login = (token: string, roleAccess: string) => {
    setToken(token);
    setRoleAccess(roleAccess);
    localStorage.setItem("authToken", token);
    localStorage.setItem("roleAccess", roleAccess);
  };

  const logout = () => {
    setToken(null);
    setRoleAccess(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("roleAccess");
  };

  return (
    <AuthContext.Provider value={{ token, roleAccess, setRoleAccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
