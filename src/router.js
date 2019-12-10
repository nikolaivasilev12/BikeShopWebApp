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
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component:  Menu,
      meta: {
        guest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requresAuth: true
      },
      beforeEnter: (to, from, next) => {
        firebase.auth().currentUser.getIdTokenResult()
        .then(function ({
          claims
        }) {
          if(claims.customer) {
            next(false);
        } 
        else 
        {
            next();
        }
      }
    )}
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        auth: true
      },
      beforeEnter: (to, from, next) => {
        firebase.auth().currentUser.getIdTokenResult()
        .then(function ({
          claims
        }) {
          if(claims.customer) {
            next(false);
        } 
        else 
        {
            next();
        }
      }
    )}
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket,
      meta: {
        auth: true
      }  
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      },
    },
    {
      path: '/addNew',
      name: 'addNew',
      component: AddNewItems,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '*',
      redurect: '/'
    },
  ]
});


// router.beforeEach((to, from, next) => {
//   firebase.auth().onAuthStateChanged(userAuth => {
//     if (userAuth) {
//       firebase.auth().currentUser.getIdTokenResult()
//         .then(function ({
//           claims
//         }) {
//           if (claims.customer) {
//             if (to.path !== '/basket')
//               return next()
//           } 
//           else if (claims.admin) {
//             if (to.path !== '/admin')
//               return next()
//           } 
//         })
//     } else {
//       if (to.matched.some(record => record.meta.auth)) {
//         next({
//           path: '/login',
//           query: {
//             redirect: to.fullPath
//           }
//         })
//       } else {
//         next()
//       }
//     }
//   })
//   next()
// });



// router.beforeEach((to, from, next) => {
//   const currentuser = firebase.auth().currentUser;
//   const requresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requresAuth && !currentuser) next('login');
//   else next();

// });

export default router


