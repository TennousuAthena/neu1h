<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <main class="pt-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Profile Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex items-center">
            <div class="relative mr-6">
              <img :src="user.avatar" :alt="user.name"
                class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" @error="handleImageError" />
              <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ user.name }}</h1>
              <p class="text-gray-600">{{ user.phone }}</p>
              <p class="text-sm text-gray-500 mt-1">注册时间：{{ formatDate(user.registeredAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <div class="text-2xl font-bold text-blue-600">{{ stats.totalAppointments }}</div>
            <div class="text-sm text-gray-600">总预约次数</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <div class="text-2xl font-bold text-green-600">{{ stats.completedAppointments }}</div>
            <div class="text-sm text-gray-600">已完成</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <div class="text-2xl font-bold text-orange-600">{{ stats.pendingAppointments }}</div>
            <div class="text-sm text-gray-600">待就诊</div>
          </div>
          <!-- <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <div class="text-2xl font-bold text-red-600">¥{{ stats.totalSpent }}</div>
            <div class="text-sm text-gray-600">累计消费</div>
          </div> -->
        </div>

        <!-- Profile Sections -->
        <div class="space-y-6">
          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">个人信息</h2>
              <button @click="editMode = !editMode" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                {{ editMode ? '取消编辑' : '编辑' }}
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input v-model="editableUser.name" :disabled="!editMode" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input v-model="editableUser.phone" :disabled="!editMode" type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
                <input v-model="editableUser.idCard" :disabled="!editMode" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <select v-model="editableUser.gender" :disabled="!editMode"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50">
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
            </div>

            <div v-if="editMode" class="mt-4 flex space-x-4">
              <button @click="saveProfile" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                保存
              </button>
              <button @click="cancelEdit" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                取消
              </button>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">账户设置</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div class="font-medium text-gray-900">修改密码</div>
                  <div class="text-sm text-gray-500">更改您的登录密码</div>
                </div>
                <button @click="showChangePassword = true"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  修改
                </button>
              </div>

              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <div class="font-medium text-gray-900">消息推送</div>
                  <div class="text-sm text-gray-500">接收预约提醒和医院通知</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="settings.notifications" type="checkbox" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                  </div>
                </label>
              </div>

              <div class="flex items-center justify-between py-3">
                <div>
                  <div class="font-medium text-gray-900">退出登录</div>
                  <div class="text-sm text-gray-500">退出当前账户</div>
                </div>
                <button @click="logout" class="text-red-600 hover:text-red-800 text-sm font-medium">
                  退出
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Password Change Modal -->
        <div v-if="showChangePassword"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">修改密码</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
                <input v-model="passwordForm.currentPassword" type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">新密码</label>
                <input v-model="passwordForm.newPassword" type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
                <input v-model="passwordForm.confirmPassword" type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div class="mt-6 flex space-x-4">
              <button @click="changePassword"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                确认修改
              </button>
              <button @click="showChangePassword = false"
                class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const router = useRouter()
const auth = inject('auth')
const appointment = inject('appointment')
const toast = inject('toast')

const editMode = ref(false)
const showChangePassword = ref(false)

// 使用真实的用户数据
const user = computed(() => auth.user.value || {
  name: '',
  phone: '',
  idCard: '',
  gender: '',
  registeredAt: '',
  avatar: '/assets/images/guan.png'
})

const editableUser = ref({})

// 监听用户数据变化，更新可编辑表单
watch(() => auth.user.value, (newUser) => {
  if (newUser) {
    editableUser.value = { ...newUser }
  }
}, { immediate: true })

const settings = ref({
  notifications: true
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const stats = computed(() => {
  const appointments = appointment.appointments.value
  return {
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
    pendingAppointments: appointments.filter(apt => apt.status === 'confirmed').length,
    totalSpent: appointments
      .filter(apt => apt.status === 'completed' || apt.status === 'confirmed')
      .reduce((sum, apt) => sum + (apt.fee || 0), 0)
  }
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

// 处理头像图片加载失败
const handleImageError = (event) => {
  // 如果图片加载失败，显示默认头像
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzZCNzI4MCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KPHN2ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgdmlld0JveD0iMCAwIDI0IDI0Ij4KPHN2ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgdmlld0JveD0iMCAwIDI0IDI0Ij4KPHA+CjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTYgN2E0IDQgMCAxMS04IDAgNCA0IDAgMDE4IDB6TTEyIDE0YTcgNyAwIDAwLTcgN2gxNGE3IDcgMCAwMC03LTd6Ii8+Cgo8L3N2Zz4KPC9zdmc+Cg=='
}

const saveProfile = async () => {
  try {
    await auth.updateProfile(editableUser.value)
    editMode.value = false
    toast.success('保存成功', '个人信息已更新')
  } catch (error) {
    toast.error('保存失败', error.message)
  }
}

const cancelEdit = () => {
  if (auth.user.value) {
    editableUser.value = { ...auth.user.value }
  }
  editMode.value = false
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.error('密码确认失败', '两次输入的新密码不一致')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    toast.error('密码格式错误', '新密码长度不能少于6位')
    return
  }

  try {
    await auth.changePassword(passwordForm.value.currentPassword, passwordForm.value.newPassword)
    toast.success('密码修改成功', '请使用新密码登录')
    showChangePassword.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    toast.error('密码修改失败', error.message)
  }
}

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    auth.logout()
    toast.success('退出成功', '您已安全退出登录')
    router.push('/login')
  }
}

onMounted(() => {
  appointment.loadAppointments()
})
</script>