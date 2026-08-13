import { createContext, useContext, useState, useCallback } from "react";
import ConfirmModal from "../components/common/ConfirmModal";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "danger",
    isAlert: false,
    resolve: null,
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      const opts = typeof options === "string" ? { message: options } : options;
      setDialogState({
        isOpen: true,
        title: opts.title || "Confirm Action",
        message: opts.message || "",
        confirmText: opts.confirmText || "Confirm",
        cancelText: opts.cancelText || "Cancel",
        variant: opts.variant || "danger",
        isAlert: false,
        resolve,
      });
    });
  }, []);

  const alert = useCallback((options) => {
    return new Promise((resolve) => {
      const opts = typeof options === "string" ? { message: options } : options;
      setDialogState({
        isOpen: true,
        title: opts.title || "Notice",
        message: opts.message || "",
        confirmText: opts.confirmText || opts.buttonText || "OK",
        cancelText: "Cancel",
        variant: opts.variant || "info",
        isAlert: true,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    if (dialogState.resolve) dialogState.resolve(true);
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    if (dialogState.resolve) dialogState.resolve(false);
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmContext.Provider value={{ confirm, alert }}>
      {children}
      <ConfirmModal
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        variant={dialogState.variant}
        isAlert={dialogState.isAlert}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirmContext() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirmContext must be used within a ConfirmProvider");
  }
  return ctx;
}
