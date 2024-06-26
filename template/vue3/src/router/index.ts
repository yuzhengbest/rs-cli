import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/home'
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log('to: ', to)
    console.log('from: ', from)
  }
)

router.afterEach(() => {
})

export default router
