<template>
  <div
    class="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
    @click="$emit('click')"
  >
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="department.icon"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ department.name }}</h3>
        <p class="text-sm text-gray-600">{{ department.category }}</p>
      </div>
    </div>
    
    <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ department.description }}</p>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4 text-sm text-gray-500">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          {{ department.doctorCount }}位医生
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ department.availableSlots }}个号源
        </span>
      </div>
      
      <div class="flex items-center text-blue-600">
        <span class="text-sm font-medium mr-1">进入科室</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  department: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>