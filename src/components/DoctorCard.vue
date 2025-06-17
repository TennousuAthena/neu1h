<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-start space-x-4">
      <!-- Doctor Avatar -->
      <img
        :src="doctor.avatar"
        :alt="doctor.name"
        class="w-20 h-20 rounded-full object-cover"
      />
      
      <!-- Doctor Info -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-semibold text-gray-900">{{ doctor.name }}</h3>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {{ doctor.level }}
          </span>
        </div>
        
        <p class="text-gray-600 mb-2">{{ doctor.specialty }}</p>
        
        <div class="flex items-center mb-3">
          <div class="flex text-yellow-400 mr-2">
            <svg
              v-for="i in 5"
              :key="i"
              class="w-4 h-4"
              :class="i <= doctor.rating ? 'fill-current' : 'text-gray-300'"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="text-sm text-gray-600">({{ doctor.rating }}/5)</span>
          <span class="text-sm text-gray-400 ml-4">{{ doctor.consultations }}次咨询</span>
        </div>
        
        <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ doctor.introduction }}</p>
        
        <!-- Available Time Slots -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">近期出诊时间</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="slot in doctor.nearestSlots"
              :key="slot"
              class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
            >
              {{ slot }}
            </span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center justify-between">
          <div class="text-lg font-semibold text-red-600">
            ¥{{ doctor.consultationFee }}
          </div>
          
          <button
            @click="$emit('select', doctor)"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            立即预约
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  doctor: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>