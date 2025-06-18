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
            <button @click="switchTab('login')" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
              activeTab === 'login'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            ]">
              登录
            </button>
            <button @click="switchTab('register')" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
              activeTab === 'register'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
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

          <div v-if="activeTab === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
            <select v-model="form.gender"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">请选择性别</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>

          <button type="submit" :disabled="!isFormValid || loading" :class="[
            'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center',
            isFormValid && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ loading
              ? (activeTab === 'login' ? '登录中...' : '注册中...')
              : (activeTab === 'login' ? '登录' : '注册')
            }}
          </button>
        </form>

        <!-- 演示账号提示 -->
        <div v-if="activeTab === 'login'" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 class="text-sm font-medium text-blue-800 mb-2">演示账号</h4>
          <div class="text-xs text-blue-600 space-y-1">
            <p>手机号：13800138000 密码：123456</p>
            <p>手机号：13900139000 密码：123456</p>
            <p>手机号：13700137000 密码：123456</p>
          </div>
        </div>

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
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = inject('auth')
const toast = inject('toast')

const activeTab = ref('login')
const loading = ref(false)
const form = ref({
  name: '',
  phone: '',
  idCard: '',
  password: '',
  confirmPassword: '',
  gender: ''
})

// 表单验证
const isFormValid = computed(() => {
  if (activeTab.value === 'login') {
    return form.value.phone && form.value.password
  } else {
    return form.value.name &&
      form.value.phone &&
      form.value.idCard &&
      form.value.password &&
      form.value.confirmPassword
  }
})

// 重置表单
const resetForm = () => {
  form.value = {
    name: '',
    phone: '',
    idCard: '',
    password: '',
    confirmPassword: '',
    gender: ''
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    toast.error('表单填写错误', '请填写完整的信息')
    return
  }

  loading.value = true

  try {
    if (activeTab.value === 'register') {
      // 注册逻辑
      if (form.value.password !== form.value.confirmPassword) {
        toast.error('密码确认失败', '两次输入的密码不一致')
        return
      }

      if (form.value.password.length < 6) {
        toast.error('密码格式错误', '密码长度不能少于6位')
        return
      }

      await auth.register(form.value)
      toast.success('注册成功', '请使用您的账号登录')

      // 切换到登录页面并保留手机号
      activeTab.value = 'login'
      const phone = form.value.phone
      resetForm()
      form.value.phone = phone

    } else {
      // 登录逻辑
      if (!form.value.phone || !form.value.password) {
        toast.error('登录信息不完整', '请输入手机号和密码')
        return
      }

      await auth.login(form.value.phone, form.value.password)
      toast.success('登录成功', `欢迎回来，${auth.user.value.name}`)

      // 清空表单
      resetForm()

      // 跳转到首页
      router.push('/home')
    }
  } catch (error) {
    console.error('Auth error:', error)
    toast.error(
      activeTab.value === 'register' ? '注册失败' : '登录失败',
      error.message
    )
  } finally {
    loading.value = false
  }
}

// 切换标签时重置表单
const switchTab = (tab) => {
  activeTab.value = tab
  resetForm()
}
</script>