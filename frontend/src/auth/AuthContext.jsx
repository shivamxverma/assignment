import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setLoading(false); // Authentication check is complete
      return;
    }
    try {
      const payload = jwtDecode(token);
      setUser({ id: payload._id, role: payload.role });
    } catch {
      setUser(null);
    } finally {
      setLoading(false); 
    }
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]); // Include loading in the value

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);