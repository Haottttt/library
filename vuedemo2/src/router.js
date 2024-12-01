import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import MainPage from './views/MainPage.vue'
// 建立路由路径配置
const routes = [           
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    // 配置默认的路径，默认显示主页
    { path: '/', component: MainPage },
]
// 建立路由对象
const router = createRouter({   
    history: createWebHistory(),
    routes,                            
})
export default router // 导出路由对象
