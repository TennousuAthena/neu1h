<template>
    <footer class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 主要内容区域 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- 医院信息 -->
                <div class="col-span-1 md:col-span-2">
                    <h3 class="text-lg font-semibold mb-4">东北大学第一附属医院</h3>
                    <p class="text-gray-300 text-sm mb-2">集医疗、教学、科研为一体的大型综合性三级甲等医院</p>
                    <div class="space-y-2 text-sm text-gray-300">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>辽宁省沈阳市弗雷尔卓德区创新路1999号</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                </path>
                            </svg>
                            <span>预约电话：024-511211511211</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>急诊电话：024-120</span>
                        </div>
                    </div>
                </div>

                <!-- 快速链接 -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">快速导航</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/departments" class="text-gray-300 hover:text-white transition-colors">科室介绍</a>
                        </li>
                        <li><a href="/doctors" class="text-gray-300 hover:text-white transition-colors">专家团队</a></li>
                        <li><a href="/orders" class="text-gray-300 hover:text-white transition-colors">预约挂号</a></li>
                        <li><a href="/profile" class="text-gray-300 hover:text-white transition-colors">个人中心</a></li>
                    </ul>
                </div>

                <!-- 服务时间 -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">服务时间</h3>
                    <div class="space-y-2 text-sm text-gray-300">
                        <div>
                            <div class="font-medium text-white">门诊时间</div>
                            <div>周一至周五：8:00-17:00</div>
                            <div>周末：8:00-16:00</div>
                        </div>
                        <div class="mt-3">
                            <div class="font-medium text-white">急诊服务</div>
                            <div>24小时全天候服务</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分割线 -->
            <div class="border-t border-gray-700 pt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <!-- 版权信息 -->
                    <div class="text-sm text-gray-300">
                        <p>&copy; 2025 东北大学附属第一医院. 保留所有权利.</p>
                        <p class="mt-1">技术支持：东北大学医学与生物信息工程学院</p>
                    </div>

                    <!-- 备案信息 -->
                    <div class="text-sm text-gray-300 md:text-right">
                        <div class="space-y-1">
                            <div>
                                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
                                    class="hover:text-white transition-colors">
                                    辽ICP备202501923号-1
                                </a>
                            </div>
                            <div class="flex items-center justify-start md:justify-end">
                                <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <a href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank"
                                    rel="noopener noreferrer" class="hover:text-white transition-colors">
                                    辽公网安备 21010302000001号
                                </a>
                            </div>
                            <div>
                                <span>医疗器械经营许可证：辽食药监械经营许1145141919810号</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部提示 -->
            <div class="mt-6 pt-4 border-t border-gray-700 text-center">
                <p class="text-xs text-gray-400">
                    本网站信息仅供参考，不能作为诊断及医疗的依据，就医请遵照医生诊断
                </p>
                <p class="text-xs text-gray-400 mt-1">
                    如有疑问请致电：024-19999999999 或在线咨询
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Footer组件无需特殊逻辑
</script>

<style scoped>
/* 确保链接在深色背景下可见 */
a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>