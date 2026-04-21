import { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/common/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be inside ToastProvider");
  return ctx;
}
