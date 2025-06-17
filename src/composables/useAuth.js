import { ref } from "vue";

export function useAuth() {
  const user = ref(null);
  const isAuthenticated = ref(false);

  // Check if user is already logged in
  const checkAuth = () => {
    const storedUser = localStorage.getItem("hospital_user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  };

  // Login function
  const login = async (phone, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (phone && password) {
        const userData = {
          id: 1,
          name: "关羽开",
          phone: phone,
          idCard: "210123199001011234",
          gender: "male",
          registeredAt: "2024-01-01",
        };

        user.value = userData;
        isAuthenticated.value = true;
        localStorage.setItem("hospital_user", JSON.stringify(userData));

        return userData;
      } else {
        throw new Error("手机号或密码错误");
      }
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (userData.phone === "13800138000") {
        throw new Error("该手机号已注册");
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        phone: userData.phone,
        idCard: userData.idCard,
        gender: userData.gender || "",
        registeredAt: new Date().toISOString().split("T")[0],
      };

      // Store in localStorage (mock database)
      const users = JSON.parse(localStorage.getItem("hospital_users") || "[]");
      users.push(newUser);
      localStorage.setItem("hospital_users", JSON.stringify(users));

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("hospital_user");
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...user.value, ...profileData };
      user.value = updatedUser;
      localStorage.setItem("hospital_user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (currentPassword !== "123456") {
        throw new Error("当前密码错误");
      }

      // In a real app, this would update the password in the database
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Initialize auth state
  checkAuth();

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuth,
  };
}
