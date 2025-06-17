import { ref, reactive } from "vue";

export function useToast() {
  const toasts = ref([]);

  const showToast = (options) => {
    const toast = {
      id: Date.now(),
      type: options.type || "info",
      title: options.title,
      message: options.message || "",
      duration: options.duration || 3000,
      show: true,
    };

    toasts.value.push(toast);

    // 自动移除通知
    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration + 300); // 额外时间用于动画
    }

    return toast.id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (title, message) => {
    return showToast({ type: "success", title, message });
  };

  const error = (title, message) => {
    return showToast({ type: "error", title, message });
  };

  const info = (title, message) => {
    return showToast({ type: "info", title, message });
  };

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
  };
}
