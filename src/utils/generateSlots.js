export const generateTimeSlots = (startHour = 9, endHour = 17, intervalMinutes = 30) => {
  const slots = []
  let current = startHour * 60
  const end = endHour * 60

  while (current < end) {
    const hours = Math.floor(current / 60)
    const mins = current % 60
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
    const displayMin = mins.toString().padStart(2, '0')
    slots.push(`${displayHour}:${displayMin} ${period}`)
    current += intervalMinutes
  }

  return slots
}

export const filterAvailableSlots = (allSlots, bookedSlots) => {
  return allSlots.map(slot => ({
    time: slot,
    available: !bookedSlots.includes(slot),
  }))
}