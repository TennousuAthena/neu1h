import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { sampleAppointments } from "./data/mockData.js";

// 初始化测试数据
const initializeTestData = () => {
  // 初始化预约数据
  const existingAppointments = localStorage.getItem("hospital_appointments");
  if (!existingAppointments) {
    localStorage.setItem(
      "hospital_appointments",
      JSON.stringify(sampleAppointments)
    );
  }

  // 初始化用户数据
  const existingUsers = localStorage.getItem("hospital_users");
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 1,
        name: "关羽开",
        phone: "13800138000",
        idCard: "210123199001011234",
        gender: "male",
        password: "123456",
        registeredAt: "2024-01-01",
        avatar: "/assets/images/guan.png",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        name: "张三",
        phone: "13900139000",
        idCard: "110101199002021234",
        gender: "male",
        password: "123456",
        registeredAt: "2024-01-15",
        avatar: "/assets/images/guan.png",
        createdAt: "2024-01-15T10:30:00.000Z",
      },
      {
        id: 3,
        name: "李四",
        phone: "13700137000",
        idCard: "320101199503151234",
        gender: "female",
        password: "123456",
        registeredAt: "2024-02-01",
        avatar: "/assets/images/guan.png",
        createdAt: "2024-02-01T14:20:00.000Z",
      },
    ];
    localStorage.setItem("hospital_users", JSON.stringify(demoUsers));
  }
};

initializeTestData();

const app = createApp(App);
app.use(router);
app.mount("#app");
