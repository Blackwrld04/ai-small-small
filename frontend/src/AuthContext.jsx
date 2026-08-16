import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nga_user');
    return stored ? JSON.parse(stored) : null;
  });

  function login(token, user) {
    localStorage.setItem('nga_token', token);
    localStorage.setItem('nga_user', JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('nga_token');
    localStorage.removeItem('nga_user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
