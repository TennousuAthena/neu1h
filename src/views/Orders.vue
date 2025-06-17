<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">我的订单</h1>
          <p class="text-gray-600">管理您的预约记录和费用信息</p>
        </div>

        <!-- Tabs -->
        <div class="mb-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
                <span v-if="tab.count > 0" class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {{ tab.count }}
                </span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="搜索医生姓名或科室..."
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <select v-model="sortOrder" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="newest">最新预约</option>
            <option value="oldest">最早预约</option>
            <option value="date-asc">就诊时间升序</option>
            <option value="date-desc">就诊时间降序</option>
          </select>
        </div>

        <!-- Orders List -->
        <div class="space-y-4">
          <div v-if="filteredAppointments.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">暂无订单记录</h3>
            <p class="mt-1 text-sm text-gray-500">您还没有任何预约记录</p>
            <div class="mt-6">
              <button
                @click="$router.push('/departments')"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                立即预约
              </button>
            </div>
          </div>

          <OrderCard
            v-for="appointment in filteredAppointments"
            :key="appointment.id"
            :appointment="appointment"
            @cancel="cancelAppointment"
            @pay="payAppointment"
            @reschedule="rescheduleAppointment"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一页
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 border rounded-md',
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一页
            </button>
          </nav>
        </div>
      </div>
    </main>

    <!-- 改期弹窗 -->
    <RescheduleModal
      v-if="currentRescheduleAppointment"
      :is-open="showRescheduleModal"
      :appointment="currentRescheduleAppointment"
      @close="closeRescheduleModal"
      @confirm="confirmReschedule"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import OrderCard from '../components/OrderCard.vue'
import RescheduleModal from '../components/RescheduleModal.vue'

const router = useRouter()
const appointment = inject('appointment')
const toast = inject('toast')

const activeTab = ref('all')
const searchQuery = ref('')
const sortOrder = ref('newest')
const currentPage = ref(1)
const pageSize = 10

// 改期弹窗状态
const showRescheduleModal = ref(false)
const currentRescheduleAppointment = ref(null)

const tabs = computed(() => [
  {
    key: 'all',
    label: '全部',
    count: appointment.appointments.value.length
  },
  {
    key: 'pending',
    label: '待支付',
    count: appointment.appointments.value.filter(apt => apt.status === 'pending').length
  },
  {
    key: 'confirmed',
    label: '已确认',
    count: appointment.appointments.value.filter(apt => apt.status === 'confirmed').length
  },
  {
    key: 'completed',
    label: '已完成',
    count: appointment.appointments.value.filter(apt => apt.status === 'completed').length
  },
  {
    key: 'cancelled',
    label: '已取消',
    count: appointment.appointments.value.filter(apt => apt.status === 'cancelled').length
  }
])

const filteredAppointments = computed(() => {
  let filtered = appointment.appointments.value

  // Filter by tab
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(apt => apt.status === activeTab.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(apt =>
      apt.doctorName.toLowerCase().includes(query) ||
      apt.department.toLowerCase().includes(query) ||
      apt.patientInfo.name.toLowerCase().includes(query)
    )
  }

  // Sort appointments
  filtered.sort((a, b) => {
    switch (sortOrder.value) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'date-asc':
        return new Date(a.date) - new Date(b.date)
      case 'date-desc':
        return new Date(b.date) - new Date(a.date)
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  // Pagination
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  const totalItems = appointment.appointments.value.filter(apt => {
    if (activeTab.value !== 'all' && apt.status !== activeTab.value) return false
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return apt.doctorName.toLowerCase().includes(query) ||
             apt.department.toLowerCase().includes(query) ||
             apt.patientInfo.name.toLowerCase().includes(query)
    }
    return true
  }).length
  return Math.ceil(totalItems / pageSize)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const cancelAppointment = async (appointmentId) => {
  if (confirm('确定要取消这个预约吗？')) {
    try {
      await appointment.updateAppointmentStatus(appointmentId, 'cancelled')
      toast.success('预约已取消', '您的预约已成功取消')
    } catch (error) {
      toast.error('取消失败', error.message)
    }
  }
}

const payAppointment = (appointmentId) => {
  router.push(`/payment/${appointmentId}`)
}

const rescheduleAppointment = (appointmentId) => {
  // 找到对应的预约记录并显示改期弹窗
  const apt = appointment.appointments.value.find(a => a.id === appointmentId)
  if (apt) {
    currentRescheduleAppointment.value = apt
    showRescheduleModal.value = true
  }
}

// 关闭改期弹窗
const closeRescheduleModal = () => {
  showRescheduleModal.value = false
  currentRescheduleAppointment.value = null
}

// 确认改期
const confirmReschedule = async (rescheduleData) => {
  try {
    await appointment.rescheduleAppointment(
      rescheduleData.appointmentId,
      rescheduleData.newDate,
      rescheduleData.newTimeSlot
    )
    toast.success('改期成功', '您的预约时间已成功修改')
    closeRescheduleModal()
  } catch (error) {
    toast.error('改期失败', error.message)
  }
}

onMounted(() => {
  appointment.loadAppointments()
})
</script>