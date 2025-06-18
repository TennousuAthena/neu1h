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

      // 获取已注册用户列表
      const users = JSON.parse(localStorage.getItem("hospital_users") || "[]");

      // 查找用户
      const foundUser = users.find((u) => u.phone === phone);

      if (!foundUser) {
        throw new Error("用户不存在，请先注册");
      }

      // 验证密码（在实际应用中，密码应该是加密的）
      if (foundUser.password !== password) {
        throw new Error("密码错误");
      }

      // 登录成功，设置用户状态
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        phone: foundUser.phone,
        idCard: foundUser.idCard,
        gender: foundUser.gender,
        registeredAt: foundUser.registeredAt,
        avatar: foundUser.avatar || "/assets/images/guan.png",
      };

      user.value = userData;
      isAuthenticated.value = true;
      localStorage.setItem("hospital_user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 验证必要字段
      if (
        !userData.name ||
        !userData.phone ||
        !userData.idCard ||
        !userData.password
      ) {
        throw new Error("请填写完整的注册信息");
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(userData.phone)) {
        throw new Error("手机号格式不正确");
      }

      // 验证身份证号格式
      const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!idCardRegex.test(userData.idCard)) {
        throw new Error("身份证号格式不正确");
      }

      // 验证密码长度
      if (userData.password.length < 6) {
        throw new Error("密码长度不能少于6位");
      }

      // 获取已注册用户列表
      const users = JSON.parse(localStorage.getItem("hospital_users") || "[]");

      // 检查手机号是否已注册
      if (users.some((u) => u.phone === userData.phone)) {
        throw new Error("该手机号已注册");
      }

      // 检查身份证号是否已注册
      if (users.some((u) => u.idCard === userData.idCard)) {
        throw new Error("该身份证号已注册");
      }

      // 创建新用户
      const newUser = {
        id: Date.now(),
        name: userData.name.trim(),
        phone: userData.phone,
        idCard: userData.idCard,
        gender: userData.gender || "",
        password: userData.password, // 在实际应用中应该加密存储
        registeredAt: new Date().toISOString().split("T")[0],
        avatar: "/assets/images/guan.png", // 默认头像
        createdAt: new Date().toISOString(),
      };

      // 存储用户数据
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
