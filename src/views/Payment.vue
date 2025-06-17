<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <main class="pt-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li><button @click="$router.push('/orders')" class="text-blue-600 hover:text-blue-800">我的预约</button></li>
            <li><span class="text-gray-400 mx-2">/</span></li>
            <li><span class="text-gray-500">支付订单</span></li>
          </ol>
        </nav>

        <!-- Payment Status -->
        <div v-if="paymentStatus === 'success'" class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-green-900">支付成功</h2>
              <p class="text-green-700">您的预约已确认，请按时就诊</p>
            </div>
          </div>
          <div class="mt-4 flex space-x-4">
            <button @click="$router.push('/orders')" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              查看订单
            </button>
            <button @click="$router.push('/home')" class="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50">
              返回首页
            </button>
          </div>
        </div>

        <!-- Payment Form -->
        <div v-else class="space-y-6">
          <!-- Appointment Details -->
          <div v-if="currentAppointment" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">预约详情</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">就诊科室：</span>
                  <span class="font-medium">{{ currentAppointment.department }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">主治医师：</span>
                  <span class="font-medium">{{ currentAppointment.doctorName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">就诊日期：</span>
                  <span class="font-medium">{{ formatDate(currentAppointment.date) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">就诊时间：</span>
                  <span class="font-medium">{{ currentAppointment.timeSlot }}</span>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">就诊人：</span>
                  <span class="font-medium">{{ currentAppointment.patientInfo.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">联系电话：</span>
                  <span class="font-medium">{{ currentAppointment.patientInfo.phone }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">订单号：</span>
                  <span class="font-medium text-sm">{{ currentAppointment.id }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Fee Details -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">费用明细</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span>挂号费</span>
                <span>¥{{ currentAppointment?.fee || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span>服务费</span>
                <span>¥0</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>应付总额</span>
                <span class="text-red-600">¥{{ currentAppointment?.fee || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">选择支付方式</h2>
            <div class="grid gap-4">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                :class="[
                  'flex items-center p-4 border rounded-lg cursor-pointer transition-colors',
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <input
                  type="radio"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                  class="hidden"
                />
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <img :src="method.icon" :alt="method.name" class="w-8 h-8" />
                </div>
                <div class="flex-1">
                  <h3 class="font-medium">{{ method.name }}</h3>
                  <p class="text-sm text-gray-600">{{ method.description }}</p>
                </div>
                <div v-if="selectedPaymentMethod === method.id" class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </label>
            </div>
          </div>

          <!-- Payment Action -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-lg font-medium">支付金额：</span>
              <span class="text-2xl font-bold text-red-600">¥{{ currentAppointment?.fee || 0 }}</span>
            </div>
            
            <button
              @click="processPayment"
              :disabled="!selectedPaymentMethod || isProcessing"
              :class="[
                'w-full py-3 px-4 rounded-lg font-medium transition-colors',
                selectedPaymentMethod && !isProcessing
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              {{ isProcessing ? '处理中...' : '立即支付' }}
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
              点击"立即支付"即表示您同意
              <a href="#" class="text-blue-600 hover:underline">支付协议</a>
              和
              <a href="#" class="text-blue-600 hover:underline">服务条款</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const route = useRoute()
const router = useRouter()
const appointment = inject('appointment')

const selectedPaymentMethod = ref('')
const isProcessing = ref(false)
const paymentStatus = ref('')

const paymentMethods = ref([
  {
    id: 'wechat',
    name: '微信支付',
    description: '使用微信扫码支付',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzA5QjEzQyIvPgo8cGF0aCBkPSJNOCAxNkM4IDE5LjMxIDEwLjY5IDIyIDEzIDIySDEyQzE0LjMxIDIyIDE1IDE5LjMxIDE1IDE2QzE1IDEyLjY5IDE0LjMxIDEwIDEyIDEwSDEzQzEwLjY5IDEwIDggMTIuNjkgOCAxNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNyAxNkMxNyAxOS4zMSAxOS42OSAyMiAyMiAyMkgyMUMyMy4zMSAyMiAyNCAxOS4zMSAyNCAxNkMyNCAxMi42OSAyMy4zMSAxMCAyMSAxMEgyMkMxOS42OSAxMCAxNyAxMi42OSAxNyAxNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
  },
  {
    id: 'alipay',
    name: '支付宝',
    description: '使用支付宝扫码支付',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwOUNEQSIvPgo8cGF0aCBkPSJNMTYgOEMxMiA4IDkgMTEgOSAxNUM5IDE5IDEyIDIyIDE2IDIyUzIzIDE5IDIzIDE1QzIzIDExIDIwIDggMTYgOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
  },
  {
    id: 'bank',
    name: '银行卡支付',
    description: '使用储蓄卡或信用卡支付',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNNiAxMkgyNlYyMEg2VjEyWk04IDE2SDE4VjE4SDhWMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
  }
])

const currentAppointment = computed(() => {
  return appointment.appointments.value.find(apt => 
    apt.id === parseInt(route.params.appointmentId)
  )
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

const processPayment = async () => {
  if (!selectedPaymentMethod.value || isProcessing.value) return
  
  isProcessing.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update appointment status
    await appointment.updateAppointmentStatus(currentAppointment.value.id, 'confirmed')
    
    paymentStatus.value = 'success'
  } catch (error) {
    alert('支付失败：' + error.message)
  } finally {
    isProcessing.value = false
  }
}

onMounted(() => {
  if (!currentAppointment.value) {
    router.push('/orders')
  }
})
</script>