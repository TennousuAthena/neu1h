<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ appointment.doctorName }}</h3>
          <p class="text-sm text-gray-600">{{ appointment.department }}</p>
          <p class="text-xs text-gray-500 mt-1">订单号：{{ appointment.id }}</p>
        </div>
      </div>
      <span 
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium',
          statusStyles[appointment.status]
        ]"
      >
        {{ statusText[appointment.status] }}
      </span>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="space-y-3">
        <div>
          <p class="text-sm text-gray-500">就诊日期</p>
          <p class="font-medium">{{ formatDate(appointment.date) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">就诊时间</p>
          <p class="font-medium">{{ appointment.timeSlot }}</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div>
          <p class="text-sm text-gray-500">就诊人</p>
          <p class="font-medium">{{ appointment.patientInfo.name }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">联系电话</p>
          <p class="font-medium">{{ appointment.patientInfo.phone }}</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div>
          <p class="text-sm text-gray-500">费用</p>
          <p class="font-medium text-red-600 text-lg">¥{{ appointment.fee }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">预约时间</p>
          <p class="font-medium text-sm">{{ formatDateTime(appointment.createdAt) }}</p>
        </div>
      </div>
    </div>
    
    <!-- Status specific content -->
    <div v-if="appointment.status === 'confirmed'" class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-sm text-green-800">预约已确认，请按时就诊</p>
      </div>
    </div>
    
    <div v-if="appointment.status === 'pending'" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-sm text-yellow-800">请尽快完成支付以确认预约</p>
      </div>
    </div>
    
    <!-- Actions -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <div class="flex space-x-3">
        <button 
          v-if="appointment.status === 'pending'"
          @click="$emit('pay', appointment.id)"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          立即支付
        </button>
        <button 
          v-if="appointment.status === 'confirmed' && !isPastAppointment"
          @click="$emit('reschedule', appointment.id)"
          class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm font-medium"
        >
          改期预约
        </button>
      </div>
      
      <div class="flex space-x-2">
        <button 
          v-if="appointment.status === 'pending' || (appointment.status === 'confirmed' && !isPastAppointment)"
          @click="$emit('cancel', appointment.id)"
          class="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          取消预约
        </button>
        <button 
          v-if="appointment.status === 'completed'"
          class="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          查看病历
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

defineEmits(['pay', 'cancel', 'reschedule'])

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
}

const statusText = {
  pending: '待支付',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消'
}

const isPastAppointment = computed(() => {
  const appointmentDate = new Date(props.appointment.date)
  const now = new Date()
  return appointmentDate < now
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

const formatDateTime = (dateStr) => {
  return new Date(dateStr).toLocaleString('zh-CN')
}
</script>