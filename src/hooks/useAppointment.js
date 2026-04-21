import { useAppointmentContext } from "../context/AppointmentContext";

export function useAppointment() {
  return useAppointmentContext();
}
