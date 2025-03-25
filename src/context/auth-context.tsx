import { createContext } from "react";

// Define the shape of the context data
interface AuthContextType {
  token: string | null;
  roleAccess: string | null;
  login: (token: string, roleAccess: string) => void;
  logout: () => void;
}

// ✅ Export AuthContext separately
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
