import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext(null);

const initialForm = {
  service: "",
  doctor: "",
  date: null,
  time: "",
  name: "",
  email: "",
  phone: "",
  age: "",
  symptoms: "",
};

export function AppointmentProvider({ children }) {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const updateForm = (fields) => setForm((prev) => ({ ...prev, ...fields }));

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const resetForm = () => {
    setForm(initialForm);
    setStep(0);
    setConfirmed(false);
  };
  const confirm = () => setConfirmed(true);

  const canProceed = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return !!form.doctor;
    if (step === 2) return !!form.date && !!form.time;
    if (step === 3) return !!form.name && !!form.email && !!form.phone;
    return true;
  };

  return (
    <AppointmentContext.Provider
      value={{
        form,
        updateForm,
        step,
        nextStep,
        prevStep,
        resetForm,
        confirm,
        confirmed,
        canProceed,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  const ctx = useContext(AppointmentContext);
  if (!ctx)
    throw new Error("useAppointmentContext must be inside AppointmentProvider");
  return ctx;
}
