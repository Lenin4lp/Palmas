import { useContext, createContext, useState, useEffect } from "react";
import { loginRequest, veryTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);

        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await veryTokenRequest(token);
        console.log(res);
        if (!res.data) {
          return setIsAuthenticated(false);
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
      console.log(token);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signin, isLoading, logout, user, isAuthenticated, errors }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen bg-[#8f0e2a]">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#852655] to-white animate-spin">
            <div class="h-9 w-9 rounded-full bg-[#8f0e2a]"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
