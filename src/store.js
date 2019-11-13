import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd } from '../firebase'
import { dbOrders } from '../firebase'


import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [],
    menuItems: [],
    orderItems: [],
    currentUser: null
  },
  mutations: {
    addCheckoutItem: (state, basketItems) => {
      dbOrders.add({
        orderNumber: 2,
        status: "not started",
        orderLines:state.basketItems
      })
    },
    // emptyBasket: (state,basketItems) => {
    //   getBasketItems.splice(0,length.getBasketItems)
    // },
    addBasketItems: (state, basketItems) => {

      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if(state.basketItems.find(itemInArray => item.name === itemInArray.name)) {
                item = state.basketItems.find(itemInArray => item.name === itemInArray.name);
                item.quantity++;
              }
              else { state.basketItems .push({
                name: item.name,
                price: item.price,
                quantity: 1
              });
            }
        })
      }
    },
    userStatus (state, user) {
      if (user) {
        state.currentUser = user
      }
      else {
        state.currentUser= null
      }
    },
  
  setMenuItems: state => { 
    let menuItems = []

    dbMenuAdd.onSnapshot((snapshotItems) => {
      menuItems = []
      snapshotItems.forEach((doc) => {
        var menuItemData = doc.data();
        menuItems.push({
          ...menuItemData,
          id: doc.id
        })
      })
      state.menuItems = menuItems
      }
    )},
  setOrderItems: state => { 
    let orderItems = []
    dbOrders.onSnapshot((snapshotItems) => {
      orderItems = []
      snapshotItems.forEach((doc) => {
        var orderItemData = doc.data();
        orderItems.push({
          ...orderItemData,
          id: doc.id
        })
      })
      state.orderItems = orderItems
      }
    )}
},
  actions: {
    setCheckoutItem(context) {
      context.commit ('addCheckoutItem')
    },
    // setEmptyBasket(context) {
    //   context.commit ('emptyBasket')
    // },
    setUser(context, user) {
      context.commit ('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    },
  }, 
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.orderItems
  }
})
