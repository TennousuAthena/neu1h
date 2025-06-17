<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li><button @click="$router.push('/departments')" class="text-blue-600 hover:text-blue-800">科室选择</button></li>
            <li><span class="text-gray-400 mx-2">/</span></li>
            <li><button @click="$router.go(-1)" class="text-blue-600 hover:text-blue-800">医生选择</button></li>
            <li><span class="text-gray-400 mx-2">/</span></li>
            <li><span class="text-gray-500">预约挂号</span></li>
          </ol>
        </nav>

        <!-- Doctor Info -->
        <div v-if="selectedDoctor" class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex items-center">
            <img :src="selectedDoctor.avatar" :alt="selectedDoctor.name" class="w-20 h-20 rounded-full mr-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ selectedDoctor.name }}</h1>
              <p class="text-blue-600 font-medium">{{ selectedDoctor.level }}</p>
              <p class="text-gray-600 mt-1">{{ selectedDoctor.specialty }}</p>
              <div class="flex items-center mt-2">
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= selectedDoctor.rating ? 'fill-current' : 'text-gray-300'" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-500 ml-2">({{ selectedDoctor.rating }}/5)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Appointment Form -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">选择预约时间</h2>
          
          <!-- Date Selection -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">选择日期</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="dateOption in availableDates"
                :key="dateOption.date"
                @click="selectedDate = dateOption.date"
                :class="[
                  'p-4 border rounded-lg text-center transition-colors',
                  selectedDate === dateOption.date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="font-medium">{{ dateOption.dayName }}</div>
                <div class="text-sm text-gray-600">{{ dateOption.dateStr }}</div>
                <div class="text-xs text-green-600 mt-1">{{ dateOption.availableSlots }}个号源</div>
              </button>
            </div>
          </div>

          <!-- Time Slot Selection -->
          <div v-if="selectedDate" class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">选择时间段</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="slot in availableTimeSlots"
                :key="slot.time"
                @click="selectedTimeSlot = slot"
                :disabled="!slot.available"
                :class="[
                  'p-3 border rounded-lg text-center transition-colors',
                  selectedTimeSlot?.time === slot.time
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : slot.available
                    ? 'border-gray-300 hover:border-gray-400'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                ]"
              >
                <div class="font-medium">{{ slot.time }}</div>
                <div class="text-xs">{{ slot.available ? '可预约' : '已满' }}</div>
              </button>
            </div>
          </div>

          <!-- Patient Info -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">就诊人信息</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  v-model="patientInfo.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入就诊人姓名"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
                <input
                  v-model="patientInfo.idCard"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入身份证号"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input
                  v-model="patientInfo.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入手机号"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <select
                  v-model="patientInfo.gender"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Fee Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">费用明细</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>挂号费</span>
                <span>¥{{ selectedDoctor?.consultationFee || 0 }}</span>
              </div>
              <div class="flex justify-between font-medium text-lg border-t pt-2">
                <span>总计</span>
                <span class="text-red-600">¥{{ selectedDoctor?.consultationFee || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            @click="submitAppointment"
            :disabled="!canSubmit"
            :class="[
              'w-full py-3 px-4 rounded-lg font-medium transition-colors',
              canSubmit
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            确认预约
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import { doctors } from '../data/mockData.js'

const route = useRoute()
const router = useRouter()
const appointment = inject('appointment')

const selectedDate = ref('')
const selectedTimeSlot = ref(null)
const patientInfo = ref({
  name: '',
  idCard: '',
  phone: '',
  gender: ''
})

const selectedDoctor = computed(() => {
  return doctors.find(doctor => doctor.id === parseInt(route.params.doctorId))
})

const availableDates = computed(() => {
  if (!selectedDoctor.value) return []
  
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const schedule = selectedDoctor.value.schedule.find(s => 
      new Date(s.date).toDateString() === date.toDateString()
    )
    
    if (schedule) {
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: i === 0 ? '今天' : i === 1 ? '明天' : date.toLocaleDateString('zh-CN', { weekday: 'short' }),
        dateStr: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        availableSlots: schedule.timeSlots.filter(slot => slot.available).length
      })
    }
  }
  
  return dates
})

const availableTimeSlots = computed(() => {
  if (!selectedDate.value || !selectedDoctor.value) return []
  
  const schedule = selectedDoctor.value.schedule.find(s => 
    s.date.split('T')[0] === selectedDate.value
  )
  
  return schedule ? schedule.timeSlots : []
})

const canSubmit = computed(() => {
  return selectedDate.value && 
         selectedTimeSlot.value && 
         patientInfo.value.name && 
         patientInfo.value.idCard && 
         patientInfo.value.phone && 
         patientInfo.value.gender
})

const submitAppointment = async () => {
  if (!canSubmit.value) return
  
  try {
    const appointmentData = {
      doctorId: selectedDoctor.value.id,
      doctorName: selectedDoctor.value.name,
      department: selectedDoctor.value.department,
      date: selectedDate.value,
      timeSlot: selectedTimeSlot.value.time,
      patientInfo: { ...patientInfo.value },
      fee: selectedDoctor.value.consultationFee
    }
    
    const newAppointment = await appointment.createAppointment(appointmentData)
    router.push(`/payment/${newAppointment.id}`)
  } catch (error) {
    alert('预约失败：' + error.message)
  }
}

onMounted(() => {
  if (!selectedDoctor.value) {
    router.push('/departments')
  }
})
</script>