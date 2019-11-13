import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import Admin from './views/Admin.vue'
import Orders from './views/Orders.vue'
import Basket from './views/Basket.vue'
import Register from './components/Register.vue'
import AddNewItems from './components/admin/AddNewItems.vue'
import Login from './components/admin/Login.vue'
import firebase from 'firebase'
import 'firebase/firestore'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component:  Menu
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component:  Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component:  Orders,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: '/basket',
      name: 'basket',
      component:  Basket,  
    },
    {
      path: '/register',
      name: 'register',
      component:  Register,  
    },
    {
      path: '/addNew',
      name: 'addNew',
      component:  AddNewItems,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component:  Login
    },
    {
      path: '*',
      redurect: '/'
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentuser = firebase.auth().currentUser;
  const requresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requresAuth && !currentuser) next('login');
  else next();

});

export default router


