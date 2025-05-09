import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: 'admin' | 'rescue-team' | 'user';
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  userType: "user" | "rescue" | "admin" | null;
  setUserType: (type: "user" | "rescue" | "admin") => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
  userType: null,
  setUserType: () => { },
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"user" | "rescue" | "admin" | null>(null);
  const [user, setUser] = useState<User | null>(null);  // Add this line

  // Check for existing auth in localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedUser = localStorage.getItem("user");

    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setUserType(authData.userType);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save auth state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated, userType }));
  }, [isAuthenticated, userType]);

  const login = () => {
    setIsAuthenticated(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setUserType(storedRole as "user" | "rescue" | "admin");
    }
  };


  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);  // Clear user data on logout
    localStorage.removeItem("user");  // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      userType,
      setUserType
    }}>
      {children}
    </AuthContext.Provider>
  );
};
