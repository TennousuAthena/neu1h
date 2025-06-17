<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="pt-16">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">
              欢迎来到东北大学附属第一医院
            </h1>
            <p class="text-xl opacity-90 mb-8">
              便捷挂号，智慧医疗，为您的健康保驾护航
            </p>
            <button @click="$router.push('/departments')"
              class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all">
              立即挂号
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="action in quickActions" :key="action.title" @click="$router.push(action.path)"
            class="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all">
            <div class="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ action.title }}</h3>
            <p class="text-sm text-gray-600">{{ action.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Hospital Info -->
      <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">医院介绍</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              东北大学附属第一医院是一所集医疗、教学、科研为一体的大型综合性三级甲等医院
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">专业医疗</h3>
              <p class="text-gray-600">拥有各科室专业医师团队，提供优质医疗服务</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
                  </path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">先进设备</h3>
              <p class="text-gray-600">配备国际先进的医疗设备和检测仪器</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">贴心服务</h3>
              <p class="text-gray-600">以患者为中心，提供温馨贴心的医疗服务</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Appointments -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" v-if="recentAppointments.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">最近预约</h2>
        <div class="grid gap-4">
          <AppointmentCard v-for="appointment in recentAppointments" :key="appointment.id" :appointment="appointment"
            @pay="handlePay" @cancel="handleCancel" @reschedule="handleReschedule" />
        </div>
      </div>
    </main>

    <!-- 改期弹窗 -->
    <RescheduleModal v-if="currentRescheduleAppointment" :is-open="showRescheduleModal"
      :appointment="currentRescheduleAppointment" @close="closeRescheduleModal" @confirm="confirmReschedule" />
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import AppointmentCard from '../components/AppointmentCard.vue'
import RescheduleModal from '../components/RescheduleModal.vue'

const appointment = inject('appointment')
const router = useRouter()
const toast = inject('toast')

// 改期弹窗状态
const showRescheduleModal = ref(false)
const currentRescheduleAppointment = ref(null)

const quickActions = ref([
  {
    title: '预约挂号',
    desc: '选择科室医生',
    path: '/departments',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: '我的订单',
    desc: '查看预约记录',
    path: '/orders',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  },
  {
    title: '费用查询',
    desc: '查看医疗费用',
    path: '/orders',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
  },
  {
    title: '个人中心',
    desc: '管理个人信息',
    path: '/profile',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  }
])

const recentAppointments = computed(() => {
  return appointment.appointments.value
    .filter(apt => apt.status === 'confirmed' || apt.status === 'pending')
    .slice(0, 3)
})

// 处理预约操作
const handlePay = (appointmentId) => {
  router.push(`/payment/${appointmentId}`)
}

const handleCancel = async (appointmentId) => {
  if (confirm('确定要取消这个预约吗？')) {
    try {
      await appointment.updateAppointmentStatus(appointmentId, 'cancelled')
      toast.success('预约已取消', '您的预约已成功取消')
    } catch (error) {
      toast.error('取消失败', error.message)
    }
  }
}

const handleReschedule = (appointmentId) => {
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