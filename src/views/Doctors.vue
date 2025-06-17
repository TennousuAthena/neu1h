<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <button @click="$router.push('/departments')" class="text-blue-600 hover:text-blue-800">
                科室选择
              </button>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-500 ml-1 md:ml-2">{{ currentDepartment?.name || '医生选择' }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Department Info -->
        <div v-if="currentDepartment" class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex items-center">
            <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ currentDepartment.name }}</h1>
              <p class="text-gray-600 mt-1">{{ currentDepartment.description }}</p>
            </div>
          </div>
        </div>

        <!-- Filter Options -->
        <div class="mb-6">
          <div class="flex flex-wrap gap-4">
            <select v-model="selectedLevel" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">所有级别</option>
              <option value="主任医师">主任医师</option>
              <option value="副主任医师">副主任医师</option>
              <option value="主治医师">主治医师</option>
            </select>
            
            <select v-model="selectedDay" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">所有时间</option>
              <option value="today">今天</option>
              <option value="tomorrow">明天</option>
              <option value="week">本周</option>
            </select>
          </div>
        </div>

        <!-- Doctors List -->
        <div class="grid gap-6">
          <DoctorCard
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            :doctor="doctor"
            @select="selectDoctor"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredDoctors.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">暂无医生信息</h3>
          <p class="mt-1 text-sm text-gray-500">请选择其他筛选条件</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import DoctorCard from '../components/DoctorCard.vue'
import { departments, doctors } from '../data/mockData.js'

const route = useRoute()
const router = useRouter()

const selectedLevel = ref('')
const selectedDay = ref('')

const currentDepartment = computed(() => {
  return departments.find(dept => dept.id === parseInt(route.params.departmentId))
})

const departmentDoctors = computed(() => {
  return doctors.filter(doctor => doctor.departmentId === parseInt(route.params.departmentId))
})

const filteredDoctors = computed(() => {
  let filtered = departmentDoctors.value

  if (selectedLevel.value) {
    filtered = filtered.filter(doctor => doctor.level === selectedLevel.value)
  }

  if (selectedDay.value) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    filtered = filtered.filter(doctor => {
      return doctor.schedule.some(slot => {
        const slotDate = new Date(slot.date)
        switch (selectedDay.value) {
          case 'today':
            return slotDate.toDateString() === today.toDateString()
          case 'tomorrow':
            return slotDate.toDateString() === tomorrow.toDateString()
          case 'week':
            const weekFromNow = new Date(today)
            weekFromNow.setDate(weekFromNow.getDate() + 7)
            return slotDate >= today && slotDate <= weekFromNow
          default:
            return true
        }
      })
    })
  }

  return filtered
})

const selectDoctor = (doctor) => {
  router.push(`/appointment/${doctor.id}`)
}
</script>