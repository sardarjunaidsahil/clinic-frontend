import { useState, useCallback } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((type, title, message, duration = 3500) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, type, title, message, duration }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return {
    toasts,
    removeToast,
    success: (title, message, dur) => toast('success', title, message, dur),
    error: (title, message, dur) => toast('error', title, message, dur),
    info: (title, message, dur) => toast('info', title, message, dur),
    warning: (title, message, dur) => toast('warning', title, message, dur),
  }
}