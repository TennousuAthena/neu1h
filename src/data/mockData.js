// Mock data for the hospital appointment system

// Department categories and icons
export const departments = [
  {
    id: 1,
    name: "内科",
    category: "内科",
    description: "诊治内科常见疾病，包括呼吸系统、循环系统、消化系统等疾病",
    doctorCount: 12,
    availableSlots: 45,
    icon: "M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33",
  },
  {
    id: 2,
    name: "外科",
    category: "外科",
    description: "各类外科手术治疗，包括普通外科、骨科、泌尿外科等",
    doctorCount: 15,
    availableSlots: 32,
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4",
  },
  {
    id: 3,
    name: "儿科",
    category: "儿科",
    description: "专门诊治儿童疾病，提供儿童健康检查和疫苗接种服务",
    doctorCount: 8,
    availableSlots: 28,
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    id: 4,
    name: "妇产科",
    category: "妇产科",
    description: "妇科疾病诊治、产前检查、分娩服务等女性健康全方位服务",
    doctorCount: 10,
    availableSlots: 38,
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
  {
    id: 5,
    name: "眼科",
    category: "五官科",
    description: "眼部疾病诊治，包括近视、白内障、青光眼等眼科疾病",
    doctorCount: 6,
    availableSlots: 22,
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    id: 6,
    name: "耳鼻喉科",
    category: "五官科",
    description: "耳鼻喉疾病专科诊治，包括中耳炎、鼻窦炎、咽喉炎等",
    doctorCount: 5,
    availableSlots: 18,
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  },
  {
    id: 7,
    name: "皮肤科",
    category: "皮肤科",
    description: "皮肤疾病诊治，包括湿疹、皮炎、痤疮等皮肤问题",
    doctorCount: 4,
    availableSlots: 15,
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
  },
  {
    id: 8,
    name: "心理科",
    category: "精神科",
    description: "心理健康咨询和治疗，包括焦虑、抑郁等心理问题",
    doctorCount: 3,
    availableSlots: 12,
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    id: 9,
    name: "中医科",
    category: "中医科",
    description: "传统中医诊疗，包括针灸、推拿、中药调理等",
    doctorCount: 7,
    availableSlots: 25,
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: 10,
    name: "急诊科",
    category: "急诊科",
    description: "24小时急诊服务，处理各类急危重症患者",
    doctorCount: 20,
    availableSlots: 60,
    icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// Generate realistic doctor data
const generateDoctorSchedule = () => {
  const schedule = [];
  const today = new Date();

  // Generate schedule for next 14 days
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip some random days to make it realistic
    if (Math.random() > 0.8) continue;

    const timeSlots = [
      { time: "08:00-08:30", available: Math.random() > 0.3 },
      { time: "08:30-09:00", available: Math.random() > 0.3 },
      { time: "09:00-09:30", available: Math.random() > 0.3 },
      { time: "09:30-10:00", available: Math.random() > 0.3 },
      { time: "10:00-10:30", available: Math.random() > 0.3 },
      { time: "10:30-11:00", available: Math.random() > 0.3 },
      { time: "11:00-11:30", available: Math.random() > 0.3 },
      { time: "14:00-14:30", available: Math.random() > 0.3 },
      { time: "14:30-15:00", available: Math.random() > 0.3 },
      { time: "15:00-15:30", available: Math.random() > 0.3 },
      { time: "15:30-16:00", available: Math.random() > 0.3 },
      { time: "16:00-16:30", available: Math.random() > 0.3 },
    ];

    schedule.push({
      date: date.toISOString(),
      timeSlots: timeSlots,
    });
  }

  return schedule;
};

// Doctors data
export const doctors = [
  // Internal Medicine Doctors
  {
    id: 1,
    name: "张建华",
    departmentId: 1,
    department: "内科",
    level: "主任医师",
    specialty: "心血管内科",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    consultations: 1256,
    consultationFee: 50,
    introduction:
      "从事心血管内科临床工作30年，擅长冠心病、高血压、心律失常的诊治，发表论文50余篇。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 14:00", "明天 09:00", "后天 10:30"],
  },
  {
    id: 2,
    name: "李明珠",
    departmentId: 1,
    department: "内科",
    level: "副主任医师",
    specialty: "呼吸内科",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    consultations: 892,
    consultationFee: 35,
    introduction:
      "呼吸系统疾病专家，擅长肺炎、哮喘、慢阻肺等疾病的诊治，临床经验丰富。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 15:30", "明天 08:30", "周三 14:00"],
  },
  {
    id: 3,
    name: "王志强",
    departmentId: 1,
    department: "内科",
    level: "主治医师",
    specialty: "消化内科",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    rating: 4.4,
    consultations: 567,
    consultationFee: 25,
    introduction:
      "消化系统疾病诊治专家，擅长胃炎、溃疡、肝病等消化道疾病的治疗。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 10:00", "周三 09:30", "周四 14:30"],
  },

  // Surgery Doctors
  {
    id: 4,
    name: "陈国栋",
    departmentId: 2,
    department: "外科",
    level: "主任医师",
    specialty: "普通外科",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    consultations: 1432,
    consultationFee: 60,
    introduction:
      "普外科专家，擅长腹腔镜微创手术，肝胆胰脾疾病的外科治疗，手术经验丰富。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 08:00", "周三 10:00", "周五 14:00"],
  },
  {
    id: 5,
    name: "刘晓东",
    departmentId: 2,
    department: "外科",
    level: "副主任医师",
    specialty: "骨科",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    consultations: 1028,
    consultationFee: 45,
    introduction: "骨科专业医师，擅长关节置换、脊柱外科、创伤骨科等手术治疗。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 16:00", "明天 14:30", "周四 09:00"],
  },

  // Pediatrics Doctors
  {
    id: 6,
    name: "孙美丽",
    departmentId: 3,
    department: "儿科",
    level: "主任医师",
    specialty: "小儿内科",
    avatar:
      "https://images.unsplash.com/photo-1594824962330-1ad8b94f1677?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    consultations: 2156,
    consultationFee: 40,
    introduction:
      "儿科专家，从事儿科临床工作25年，擅长小儿呼吸道疾病、消化道疾病的诊治。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 11:00", "明天 15:00", "周三 08:30"],
  },
  {
    id: 7,
    name: "赵小华",
    departmentId: 3,
    department: "儿科",
    level: "副主任医师",
    specialty: "小儿外科",
    avatar:
      "https://images.unsplash.com/photo-1591123120675-6f7d1a6ad52f?w=150&h=150&fit=crop&crop=face",
    rating: 4.5,
    consultations: 876,
    consultationFee: 35,
    introduction:
      "小儿外科专业，擅长小儿疝气、阑尾炎等常见外科疾病的手术治疗。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 10:30", "周三 14:00", "周五 09:30"],
  },

  // Gynecology Doctors
  {
    id: 8,
    name: "吴惠兰",
    departmentId: 4,
    department: "妇产科",
    level: "主任医师",
    specialty: "妇科",
    avatar:
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    consultations: 1687,
    consultationFee: 50,
    introduction: "妇科专家，擅长妇科肿瘤、不孕不育、妇科内分泌疾病的诊治。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 14:30", "明天 11:30", "周四 15:00"],
  },
  {
    id: 9,
    name: "马丽娟",
    departmentId: 4,
    department: "妇产科",
    level: "副主任医师",
    specialty: "产科",
    avatar:
      "https://images.unsplash.com/photo-1594824962330-1ad8b94f1677?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    consultations: 1234,
    consultationFee: 40,
    introduction:
      "产科专业医师，擅长高危妊娠管理、产前诊断、剖宫产等产科手术。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 08:30", "周三 10:00", "周五 14:30"],
  },

  // Ophthalmology Doctors
  {
    id: 10,
    name: "林志远",
    departmentId: 5,
    department: "眼科",
    level: "主任医师",
    specialty: "眼科",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    consultations: 943,
    consultationFee: 45,
    introduction:
      "眼科专家，擅长白内障、青光眼、眼底疾病的诊治，视网膜手术经验丰富。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 16:30", "明天 09:30", "周四 11:00"],
  },

  // ENT Doctors
  {
    id: 11,
    name: "郑文博",
    departmentId: 6,
    department: "耳鼻喉科",
    level: "副主任医师",
    specialty: "耳鼻喉科",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    rating: 4.5,
    consultations: 672,
    consultationFee: 35,
    introduction:
      "耳鼻喉专科医师，擅长鼻窦炎、中耳炎、声带疾病等耳鼻喉科疾病的诊治。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 14:00", "周三 09:00", "周五 10:30"],
  },

  // Dermatology Doctors
  {
    id: 12,
    name: "何晓燕",
    departmentId: 7,
    department: "皮肤科",
    level: "主治医师",
    specialty: "皮肤科",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 4.4,
    consultations: 458,
    consultationFee: 30,
    introduction: "皮肤科专业医师，擅长湿疹、皮炎、痤疮等常见皮肤病的诊治。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 15:00", "明天 11:00", "周四 14:30"],
  },

  // Psychology Doctors
  {
    id: 13,
    name: "方心理",
    departmentId: 8,
    department: "心理科",
    level: "主治医师",
    specialty: "临床心理学",
    avatar:
      "https://images.unsplash.com/photo-1591123120675-6f7d1a6ad52f?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    consultations: 234,
    consultationFee: 100,
    introduction:
      "临床心理学专家，擅长焦虑症、抑郁症、睡眠障碍等心理疾病的咨询和治疗。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["明天 15:30", "周三 14:00", "周五 11:30"],
  },

  // TCM Doctors
  {
    id: 14,
    name: "雄忠懿",
    departmentId: 9,
    department: "中医科",
    level: "主任医师",
    specialty: "中医内科",
    avatar: "/assets/images/xzy.jpg",
    rating: 4.8,
    consultations: 1567,
    consultationFee: 60,
    introduction:
      "中医世家传人，从事中医临床40年，擅长中药调理、针灸治疗各种慢性疾病，雄氏老方，专治各种疑难杂症。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["今天 10:00", "明天 16:00", "周三 08:00"],
  },

  // Emergency Doctors
  {
    id: 15,
    name: "急诊王",
    departmentId: 10,
    department: "急诊科",
    level: "副主任医师",
    specialty: "急诊医学",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    consultations: 2890,
    consultationFee: 0, // Emergency consultations are usually free for triage
    introduction:
      "急诊医学专家，擅长各类急危重症的抢救和治疗，具有丰富的急救经验。",
    schedule: generateDoctorSchedule(),
    nearestSlots: ["24小时", "全天候", "随时接诊"],
  },
];

// Sample appointment data for testing
export const sampleAppointments = [
  {
    id: 1001,
    doctorId: 1,
    doctorName: "张建华",
    department: "内科",
    date: "2024-12-30",
    timeSlot: "09:00-09:30",
    patientInfo: {
      name: "关羽开",
      phone: "13800138000",
      idCard: "210123199001011234",
      gender: "male",
    },
    fee: 50,
    status: "confirmed",
    createdAt: "2024-12-28T10:30:00.000Z",
    updatedAt: "2024-12-28T10:35:00.000Z",
  },
  {
    id: 1002,
    doctorId: 6,
    doctorName: "孙美丽",
    department: "儿科",
    date: "2024-12-29",
    timeSlot: "14:00-14:30",
    patientInfo: {
      name: "小明",
      phone: "13800138000",
      idCard: "210123201501011234",
      gender: "male",
    },
    fee: 40,
    status: "completed",
    createdAt: "2024-12-26T15:20:00.000Z",
    updatedAt: "2024-12-29T14:45:00.000Z",
  },
  {
    id: 1003,
    doctorId: 8,
    doctorName: "吴惠兰",
    department: "妇产科",
    date: "2025-01-02",
    timeSlot: "10:30-11:00",
    patientInfo: {
      name: "李女士",
      phone: "13800138000",
      idCard: "210123198501011234",
      gender: "female",
    },
    fee: 50,
    status: "pending",
    createdAt: "2024-12-28T16:45:00.000Z",
    updatedAt: "2024-12-28T16:45:00.000Z",
  },
];

// Hospital information
export const hospitalInfo = {
  name: "东北大学附属第一医院",
  address: "辽宁省沈阳市和平区南京北街155号",
  phone: "024-83283333",
  emergencyPhone: "024-83283120",
  website: "https://www.hospital.neu.edu.cn",
  established: "1987年",
  level: "三级甲等",
  beds: 1200,
  departments: 45,
  introduction:
    "东北大学附属第一医院是一所集医疗、教学、科研为一体的大型综合性三级甲等医院，是东北大学的直属附属医院。医院始建于1987年，经过30多年的发展，已成为东北地区重要的医疗中心之一。",
  services: [
    "24小时急诊服务",
    "网上预约挂号",
    "移动支付服务",
    "住院服务",
    "健康体检",
    "医疗保险服务",
  ],
};
