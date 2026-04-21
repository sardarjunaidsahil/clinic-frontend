import { useAuth as useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useAuth() {
  const { user, login, logout, isAdmin, isPatient } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const data = await authService.login(email, password);
    login(data.user);
    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    return data;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRegister = async (formData) => {
    const data = await authService.register(formData);
    login(data.user);
    navigate("/dashboard");
    return data;
  };

  return {
    user,
    handleLogin,
    handleLogout,
    handleRegister,
    isAdmin,
    isPatient,
  };
}
