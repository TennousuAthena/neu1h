<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
    
    <!-- 通知系统 -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <Toast
        v-for="toast in toasts.toasts.value"
        :key="toast.id"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :show="toast.show"
        @close="toasts.removeToast(toast.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import { useAuth } from './composables/useAuth'
import { useAppointment } from './composables/useAppointment'
import { useToast } from './composables/useToast'
import Toast from './components/Toast.vue'

const auth = useAuth()
const appointment = useAppointment()
const toasts = useToast()

provide('auth', auth)
provide('appointment', appointment)
provide('toast', toasts)
</script>

<style>
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style>