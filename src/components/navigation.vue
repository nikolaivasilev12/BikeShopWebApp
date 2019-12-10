<template>
  <div>
    <v-navigation-drawer color="#666666" v-model="drawer" temporary app>
      <div v-if="currentUser">
        <v-avatar
        class="ml-5 mt-5"
        size="200">
          <v-img src="@/assets/img/dino.jpg"></v-img>
        </v-avatar>
        <v-card
            flat
            color="#666666"
            class="mx-auto"
            max-width="250"
            tile
          >
                <v-col class="py-0">
                  <v-list-item
                    
                    color="rgba(0, 0, 0, .4)"
                    dark
                  >
                    <v-list-item-content>
                      <v-list-item-title class="title"> {{ currentUser.email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
             </v-card>
      </div>
      
      <ul class="">
        <router-link tag="li" to="/"><v-icon color="#bbbbbb">home</v-icon>Home</router-link>
        <router-link tag="li" to="/menu"><v-icon color="#bbbbbb">directions_bike</v-icon>Products</router-link>
        <router-link tag="li" to="/basket"><v-icon color="#bbbbbb">shopping_cart</v-icon>Your Basket</router-link>
        <router-link tag="li" to="/about"><v-icon color="#bbbbbb">notes</v-icon>About</router-link>
        <router-link tag="li" to="/register"><v-icon color="#bbbbbb">account_box</v-icon>Register</router-link>
        <router-link tag="li" v-if="currentUser" to="/orders" class="complete--text"><v-icon color="complete">assignment</v-icon>Orders</router-link>
        <router-link v-if="currentUser" tag="li" to="/admin"><v-icon color="#bbbbbb">lock</v-icon>Admin</router-link>
        <router-link v-else tag="li"  to="/login"><v-icon color="#bbbbbb">vpn_key</v-icon>Login</router-link>
        <v-btn  v-if="currentUser" style="margin:50px 0 0 65px; color:white;" medium class="" tag="li" color="red" @click.prevent="signOut()">Sign Out</v-btn>
      </ul>
    </v-navigation-drawer>
   <!--  v-if="item.meta === 'auth' && $auth.admin() === true" -->

    <v-app-bar height="100px;" color="#cccccc" flat app>
      <v-app-bar-nav-icon class="ml-3" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
        <v-toolbar-side-icon>
        <img style="margin:10px 50px 0 0;"  src="@/assets/img/logo.png" height="50"/>
        </v-toolbar-side-icon>
      <v-toolbar-title class="headline">
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { db } from '../../firebase'

import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store.js'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUser', user)
  }
  else {
    store.dispatch('setUser', null)
  }
});


export default {
  data: () => ({
    drawer: null
    
  }),
  methods: {
    signOut() {
        firebase.auth().signOut().then(() => {
            alert('Logged Out')
            this.$router.replace('/')
        }).catch(error => {
            alert(error)
        })
    }
  },
  computed: {
    customer() {
      firebase.auth().currentUser.getIdTokenResult()
        .then(function ({
          claims
        }) 
        {
        if (claims.customer) {
          return customer = true;
        }
      })
    },
     admin() {

    },
    guest() {
      return this.guest
    },
    currentUser() {
      return this.$store.getters.currentUser
    }
  }
};
</script>

<style lang="scss" scoped>
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}

nav li {
  //scss doesn't work
  color: #ffffff;
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type:none;
  cursor: pointer;
}

nav li i {
  margin-right: 10px;
}

nav li:last-child {
  position: absolute;
  bottom: 40px;
  color: #ffffff;
}
</style>