import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ isLoggedIn: false });
  const API_URL = "http://localhost:3000"; 

  useEffect(() => {
    const storedUser = localStorage.getItem("session");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" 
      });

      if (res.ok) {
        const newUser = { isLoggedIn: true, email };
        setUser(newUser);
        localStorage.setItem("session", JSON.stringify(newUser));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) { console.error(err); }
    
    setUser({ isLoggedIn: false });
    localStorage.removeItem("session");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}