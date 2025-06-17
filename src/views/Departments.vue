<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">选择科室</h1>
          <p class="text-gray-600">请选择您需要就诊的科室</p>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="搜索科室..."
            />
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Department Categories -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = selectedCategory === category ? '' : category"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Departments Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DepartmentCard
            v-for="department in filteredDepartments"
            :key="department.id"
            :department="department"
            @click="selectDepartment(department)"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredDepartments.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">没有找到相关科室</h3>
          <p class="mt-1 text-sm text-gray-500">请尝试其他搜索条件</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import DepartmentCard from '../components/DepartmentCard.vue'
import { departments } from '../data/mockData.js'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = ref([
  '全部',
  '内科',
  '外科',
  '妇产科',
  '儿科',
  '五官科',
  '皮肤科',
  '精神科',
  '中医科',
  '急诊科'
])

const filteredDepartments = computed(() => {
  let filtered = departments

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(dept =>
      dept.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== '全部') {
    filtered = filtered.filter(dept => dept.category === selectedCategory.value)
  }

  return filtered
})

const selectDepartment = (department) => {
  router.push(`/doctors/${department.id}`)
}
</script>