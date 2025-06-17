<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Hospital Logo and Title -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">东北大学附属第一医院</h1>
        <p class="text-gray-600">挂号缴费系统</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="mb-6">
          <div class="flex space-x-1">
            <button @click="activeTab = 'login'" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md',
              activeTab === 'login'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            ]">
              登录
            </button>
            <button @click="activeTab = 'register'" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md',
              activeTab === 'register'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            ]">
              注册
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="activeTab === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input v-model="form.name" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入真实姓名" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <input v-model="form.phone" type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入手机号" required />
          </div>

          <div v-if="activeTab === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
            <input v-model="form.idCard" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入身份证号" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input v-model="form.password" type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码" required />
          </div>

          <div v-if="activeTab === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input v-model="form.confirmPassword" type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请再次输入密码" required />
          </div>

          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {{ activeTab === 'login' ? '登录' : '注册' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          <p>使用本系统即表示您同意我们的</p>
          <a href="#" class="text-blue-600 hover:text-blue-500">服务条款</a>
          和
          <a href="#" class="text-blue-600 hover:text-blue-500">隐私政策</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = inject('auth')

const activeTab = ref('login')
const form = ref({
  name: '',
  phone: '',
  idCard: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  try {
    if (activeTab.value === 'register') {
      if (form.value.password !== form.value.confirmPassword) {
        alert('密码不一致')
        return
      }
      await auth.register(form.value)
      alert('注册成功，请登录')
      activeTab.value = 'login'
      form.value.confirmPassword = ''
    } else {
      await auth.login(form.value.phone, form.value.password)
      router.push('/home')
    }
  } catch (error) {
    alert(error.message)
  }
}
</script>