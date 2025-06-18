<template>
  <header class="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/home" class="flex items-center">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                </path>
              </svg>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg font-semibold text-gray-900">东北大学附属第一医院</h1>
              <p class="text-xs text-gray-600">挂号缴费系统</p>
            </div>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link v-for="item in filteredNavigation" :key="item.name" :to="item.href" :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === item.href
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          ]">
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- 未登录状态 - 显示登录按钮 -->
          <div v-if="!auth.isAuthenticated.value">
            <router-link to="/login"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              登录
            </router-link>
          </div>

          <!-- 已登录状态 - 显示用户菜单 -->
          <div v-else class="relative" ref="userMenuRef">
            <button @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
              <!-- 用户头像 -->
              <div class="w-8 h-8 rounded-full overflow-hidden">
                <img v-if="user?.avatar && !avatarError" :src="user.avatar" :alt="user.name"
                  class="w-full h-full object-cover" @error="handleAvatarError" />
                <div v-else class="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <span class="hidden sm:block text-sm font-medium text-gray-700">{{ user?.name || '用户' }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showUserMenu = false">
                个人中心
              </router-link>
              <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showUserMenu = false">
                我的挂号
              </router-link>
              <hr class="my-1" />
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                退出登录
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <router-link v-for="item in filteredNavigation" :key="item.name" :to="item.href" :class="[
            'block px-3 py-2 rounded-md text-base font-medium',
            $route.path === item.href
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          ]" @click="showMobileMenu = false">
            {{ item.name }}
          </router-link>

          <!-- 移动端登录按钮 -->
          <router-link v-if="!auth.isAuthenticated.value" to="/login"
            class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
            @click="showMobileMenu = false">
            登录
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = inject('auth')
const toast = inject('toast')

const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenuRef = ref(null)

// 使用真实的用户数据
const user = computed(() => auth.user.value)

const notifications = ref([])

const navigation = [
  { name: '首页', href: '/home', requireAuth: false },
  { name: '预约挂号', href: '/departments', requireAuth: true },
  { name: '我的挂号', href: '/orders', requireAuth: true },
  { name: '个人中心', href: '/profile', requireAuth: true }
]

// 根据登录状态过滤导航菜单
const filteredNavigation = computed(() => {
  if (auth.isAuthenticated.value) {
    return navigation
  } else {
    return navigation.filter(item => !item.requireAuth)
  }
})

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    auth.logout()
    toast.success('退出成功', '您已安全退出登录')
    router.push('/login')
  }
  showUserMenu.value = false
}

// 处理头像加载失败
const avatarError = ref(false)
const handleAvatarError = (event) => {
  // 头像加载失败时的处理
  avatarError.value = true
  event.target.style.display = 'none'
}

// 当用户变化时重置头像错误状态
watch(() => user.value?.avatar, () => {
  avatarError.value = false
})

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>