import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (token) => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const payload = jwtDecode(token);
      console.log('Decoded JWT:', payload); 
      setUser({ id: payload._id, role: payload.role });
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    updateUser(token);
  }, []); 

  return <AuthCtx.Provider value={{ user, updateUser }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);