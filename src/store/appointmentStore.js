import { create } from 'zustand'

export const useAppointmentStore = create((set, get) => ({
  step: 0,
  confirmed: false,
  confirmationCode: '',

  form: {
    service: '',
    doctor: '',
    doctorId: '',
    date: null,
    time: '',
    name: '',
    email: '',
    phone: '',
    symptoms: '',
  },

  updateForm: (fields) => set(state => ({ form: { ...state.form, ...fields } })),
  setStep: (step) => set({ step }),
  nextStep: () => set(state => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set(state => ({ step: Math.max(state.step - 1, 0) })),

  setConfirmed: (code) => set({ confirmed: true, confirmationCode: code }),

  reset: () => set({
    step: 0, confirmed: false, confirmationCode: '',
    form: { service: '', doctor: '', doctorId: '', date: null, time: '', name: '', email: '', phone: '', symptoms: '' },
  }),

  canProceed: () => {
    const { step, form } = get()
    if (step === 0) return !!form.service
    if (step === 1) return !!form.doctorId
    if (step === 2) return !!form.date && !!form.time
    if (step === 3) return !!form.name && !!form.email && !!form.phone
    return true
  },
}))