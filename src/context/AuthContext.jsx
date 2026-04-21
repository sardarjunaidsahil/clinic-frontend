import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("wc_user");
      if (s) {
        const p = JSON.parse(s);
        if (p?.id) setUser(p);
      }
    } catch {
      sessionStorage.removeItem("wc_user");
    }
    setLoading(false);
  }, []);

  const login = (res) => {
    // res shape: { data: { user, token }, success, message }
    const userData = res?.data?.user || res?.user || res;
    const token = res?.data?.token || res?.token;
    const toStore = { ...userData, token };
    setUser(toStore);
    sessionStorage.setItem("wc_user", JSON.stringify(toStore));
    return toStore;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("wc_user");
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    sessionStorage.setItem("wc_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
        isAdmin: user?.role === "ADMIN",
        isPatient: user?.role === "PATIENT",
        isDoctor: user?.role === "DOCTOR",
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
