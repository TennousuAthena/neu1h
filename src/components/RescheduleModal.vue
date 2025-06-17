<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 背景遮罩 -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
      
      <!-- 弹窗内容 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <!-- 头部 -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">改期预约</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- 当前预约信息 -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 class="font-medium text-gray-900 mb-2">当前预约信息</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">医生：</span>
                <span class="font-medium">{{ appointment.doctorName }}</span>
              </div>
              <div>
                <span class="text-gray-500">科室：</span>
                <span class="font-medium">{{ appointment.department }}</span>
              </div>
              <div>
                <span class="text-gray-500">原时间：</span>
                <span class="font-medium">{{ formatDate(appointment.date) }}</span>
              </div>
              <div>
                <span class="text-gray-500">原时段：</span>
                <span class="font-medium">{{ appointment.timeSlot }}</span>
              </div>
            </div>
          </div>
          
          <!-- 选择新日期 -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 mb-4">选择新日期</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="dateOption in availableDates"
                :key="dateOption.date"
                @click="selectedDate = dateOption.date"
                :class="[
                  'p-3 border rounded-lg text-center transition-colors text-sm',
                  selectedDate === dateOption.date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="font-medium">{{ dateOption.dayName }}</div>
                <div class="text-xs text-gray-600">{{ dateOption.dateStr }}</div>
                <div class="text-xs text-green-600 mt-1">{{ dateOption.availableSlots }}个号源</div>
              </button>
            </div>
          </div>

          <!-- 选择新时间段 -->
          <div v-if="selectedDate" class="mb-6">
            <h4 class="font-medium text-gray-900 mb-4">选择新时间段</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="slot in availableTimeSlots"
                :key="slot.time"
                @click="selectedTimeSlot = slot"
                :disabled="!slot.available"
                :class="[
                  'p-3 border rounded-lg text-center transition-colors text-sm',
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

          <!-- 改期说明 -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-sm text-yellow-800">
                <p class="font-medium">改期须知：</p>
                <ul class="mt-1 list-disc list-inside space-y-1">
                  <li>改期后的预约时间不可退改</li>
                  <li>请确认您选择的时间能够按时就诊</li>
                  <li>改期不产生额外费用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部按钮 -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="confirmReschedule"
            :disabled="!canConfirm || loading"
            :class="[
              'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm',
              canConfirm && !loading
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-gray-300 cursor-not-allowed'
            ]"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? '处理中...' : '确认改期' }}
          </button>
          <button
            @click="closeModal"
            :disabled="loading"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { doctors } from '../data/mockData.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  appointment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const selectedDate = ref('')
const selectedTimeSlot = ref(null)
const loading = ref(false)

// 获取对应的医生信息
const doctor = computed(() => {
  return doctors.find(doc => doc.name === props.appointment.doctorName)
})

// 可选择的日期（排除当前预约日期）
const availableDates = computed(() => {
  if (!doctor.value) return []
  
  const dates = []
  const today = new Date()
  const currentAppointmentDate = new Date(props.appointment.date)
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // 跳过原预约日期
    if (date.toDateString() === currentAppointmentDate.toDateString()) {
      continue
    }
    
    const schedule = doctor.value.schedule.find(s => 
      new Date(s.date).toDateString() === date.toDateString()
    )
    
    if (schedule && schedule.timeSlots.some(slot => slot.available)) {
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

// 可选择的时间段
const availableTimeSlots = computed(() => {
  if (!selectedDate.value || !doctor.value) return []
  
  const schedule = doctor.value.schedule.find(s => 
    s.date.split('T')[0] === selectedDate.value
  )
  
  return schedule ? schedule.timeSlots : []
})

// 是否可以确认改期
const canConfirm = computed(() => {
  return selectedDate.value && selectedTimeSlot.value && selectedTimeSlot.value.available
})

// 格式化日期
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 关闭弹窗
const closeModal = () => {
  if (!loading.value) {
    resetForm()
    emit('close')
  }
}

// 重置表单
const resetForm = () => {
  selectedDate.value = ''
  selectedTimeSlot.value = null
}

// 确认改期
const confirmReschedule = async () => {
  if (!canConfirm.value) return
  
  loading.value = true
  try {
    await emit('confirm', {
      appointmentId: props.appointment.id,
      newDate: selectedDate.value,
      newTimeSlot: selectedTimeSlot.value.time
    })
    closeModal()
  } catch (error) {
    console.error('改期失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听弹窗打开，重置表单
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
  }
})
</script> 