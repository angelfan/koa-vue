import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import TodoList from '@/components/TodoList';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/',  // 默认首页打开是登录页
      component: Login,
    },
    {
      path: '/todolist',
      component: TodoList,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('demo-token');
  if (to.path === '/') {
    if (token !== 'null' && token != null) {
      next('/todolist');
    }
    next();
  } else {
    if (token != 'null' && token != null) {
      Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
      next();
    } else {
      next('/');
    }
  }
});

export default router;
