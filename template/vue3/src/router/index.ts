import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router';
import nprogress from 'nprogress'; // @types/nprogress
import 'nprogress/nprogress.css';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/home',
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes,
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log('to: ', to);
    console.log('from: ', from);
    nprogress.start(); // 开始加载进度条
  },
);

router.afterEach(() => {
  nprogress.done(); // 结束加载进度条
});

export default router;
