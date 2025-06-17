import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { sampleAppointments } from "./data/mockData.js";

// 初始化测试数据
const initializeTestData = () => {
  const existingAppointments = localStorage.getItem("hospital_appointments");
  if (!existingAppointments) {
    localStorage.setItem(
      "hospital_appointments",
      JSON.stringify(sampleAppointments)
    );
  }
};

initializeTestData();

const app = createApp(App);
app.use(router);
app.mount("#app");
