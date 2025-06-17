import { ref, computed } from 'vue'

export function useAppointment() {
  const appointments = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Load appointments from localStorage
  const loadAppointments = () => {
    try {
      const storedAppointments = localStorage.getItem('hospital_appointments')
      if (storedAppointments) {
        appointments.value = JSON.parse(storedAppointments)
      }
    } catch (err) {
      error.value = '加载预约记录失败'
    }
  }

  // Save appointments to localStorage
  const saveAppointments = () => {
    try {
      localStorage.setItem('hospital_appointments', JSON.stringify(appointments.value))
    } catch (err) {
      error.value = '保存预约记录失败'
    }
  }

  // Create new appointment
  const createAppointment = async (appointmentData) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newAppointment = {
        id: Date.now(),
        ...appointmentData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      appointments.value.push(newAppointment)
      saveAppointments()

      return newAppointment
    } catch (err) {
      error.value = '创建预约失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, status) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const appointment = appointments.value.find(apt => apt.id === appointmentId)
      if (!appointment) {
        throw new Error('预约记录不存在')
      }

      appointment.status = status
      appointment.updatedAt = new Date().toISOString()

      saveAppointments()

      return appointment
    } catch (err) {
      error.value = '更新预约状态失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    return updateAppointmentStatus(appointmentId, 'cancelled')
  }

  // Confirm appointment (after payment)
  const confirmAppointment = async (appointmentId) => {
    return updateAppointmentStatus(appointmentId, 'confirmed')
  }

  // Complete appointment
  const completeAppointment = async (appointmentId) => {
    return updateAppointmentStatus(appointmentId, 'completed')
  }

  // Get appointment by ID
  const getAppointmentById = (appointmentId) => {
    return appointments.value.find(apt => apt.id === appointmentId)
  }

  // Get appointments by status
  const getAppointmentsByStatus = (status) => {
    return appointments.value.filter(apt => apt.status === status)
  }

  // Get upcoming appointments
  const getUpcomingAppointments = computed(() => {
    const now = new Date()
    return appointments.value.filter(apt => {
      const appointmentDate = new Date(apt.date)
      return appointmentDate >= now && (apt.status === 'confirmed' || apt.status === 'pending')
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  // Get past appointments
  const getPastAppointments = computed(() => {
    const now = new Date()
    return appointments.value.filter(apt => {
      const appointmentDate = new Date(apt.date)
      return appointmentDate < now || apt.status === 'completed' || apt.status === 'cancelled'
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  // Get appointment statistics
  const getStatistics = computed(() => {
    const total = appointments.value.length
    const pending = appointments.value.filter(apt => apt.status === 'pending').length
    const confirmed = appointments.value.filter(apt => apt.status === 'confirmed').length
    const completed = appointments.value.filter(apt => apt.status === 'completed').length
    const cancelled = appointments.value.filter(apt => apt.status === 'cancelled').length
    const totalSpent = appointments.value
      .filter(apt => apt.status === 'completed' || apt.status === 'confirmed')
      .reduce((sum, apt) => sum + (apt.fee || 0), 0)

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      totalSpent
    }
  })

  // Reschedule appointment
  const rescheduleAppointment = async (appointmentId, newDate, newTimeSlot) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const appointment = appointments.value.find(apt => apt.id === appointmentId)
      if (!appointment) {
        throw new Error('预约记录不存在')
      }

      appointment.date = newDate
      appointment.timeSlot = newTimeSlot
      appointment.updatedAt = new Date().toISOString()

      saveAppointments()

      return appointment
    } catch (err) {
      error.value = '改期失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Initialize by loading existing appointments
  loadAppointments()

  return {
    appointments,
    loading,
    error,
    loadAppointments,
    createAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    confirmAppointment,
    completeAppointment,
    getAppointmentById,
    getAppointmentsByStatus,
    getUpcomingAppointments,
    getPastAppointments,
    getStatistics,
    rescheduleAppointment
  }
}