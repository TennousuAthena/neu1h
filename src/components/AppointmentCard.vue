<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ appointment.doctorName }}</h3>
          <p class="text-sm text-gray-600">{{ appointment.department }}</p>
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
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p class="text-sm text-gray-500">就诊日期</p>
        <p class="font-medium">{{ formatDate(appointment.date) }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">就诊时间</p>
        <p class="font-medium">{{ appointment.timeSlot }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">就诊人</p>
        <p class="font-medium">{{ appointment.patientInfo.name }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">费用</p>
        <p class="font-medium text-red-600">¥{{ appointment.fee }}</p>
      </div>
    </div>
    
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-500">
        预约时间：{{ formatDateTime(appointment.createdAt) }}
      </p>
      <div class="flex space-x-2">
        <button 
          v-if="appointment.status === 'pending'"
          @click="$emit('pay', appointment.id)"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
        >
          立即支付
        </button>
        <button 
          v-if="appointment.status === 'confirmed'"
          @click="$emit('reschedule', appointment.id)"
          class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
        >
          改期
        </button>
        <button 
          v-if="appointment.status === 'pending' || appointment.status === 'confirmed'"
          @click="$emit('cancel', appointment.id)"
          class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
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