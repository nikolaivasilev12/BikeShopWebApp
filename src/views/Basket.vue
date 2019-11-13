<template>
     <v-col offset-md="1" md="4">
        <h1>Current basket</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table" v-if="basket.length > 0">
            <thead>
              <tr>
                <th class="text-left" style="width:30%;">Quantity</th>
                <th class="text-left" style="width:40%">Name of item</th>
                <th class="text-left" style="width:15%">Price</th>
                <th class="text-left" style="width:15%">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>
                  <v-icon color="#999999" @click="increaseQtn(item)">add_box</v-icon>
                  {{ item.quantity }}
                  <v-icon color="#999999" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.price + " $"}}</td>
                <td>{{ item.quantity * item.price + " $"}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-simple-table v-else>
            <p>The basket is empty</p>
          </v-simple-table>
          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4 ml-2" style="margin=0;">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>Total amount:</p>
            </v-col>
            <v-col class="text-right mr-4">
              <p>{{ subtotal }} $</p>
              <p>{{ delivery }} $</p>
              <p>
                <b>{{ total }} $</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin=0;">
            <v-spacer></v-spacer>
            <v-btn class="mr-5 mb-1" color="#cccccc" v-on:click="addCheckoutItem(),emptyBasket()">Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
</template>

<script>

import { dbMenuAdd } from '../../firebase'

export default {
  data() {
    return {
      basketDump: [],
 
    };
  },

  // created () {
  //   dbMenuAdd.get().then ((querySnapshot) => {
  //     querySnapshot.forEach((doc => {
  //       console.log(doc.id, " => ", doc.data());
  //       var menuItemData = doc.data();
  //       this.menuItems.push({
  //         id: doc.id,
  //         name: menuItemData.name,
  //         description: menuItemData.description,
  //         price: menuItemData.price,
  //       })
  //     }))
  //   })
  // },


  beforeCreate() {
    this.$store.dispatch('setMenuItems')
  },


  methods:{
    addCheckoutItem() {
      this.$store.dispatch('setCheckoutItem')
    },
    // emptyBasket() {
    //   this.$store.dispatch('emptyBasket')
    // },
   
    addToBasket(item) {
    //  if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
    //    item = this.basket.find(itemInArray => item.name === itemInArray.name);
    //    this.increaseQtn(item);

    //  }
    //  else { this.basket.push({
    //     name: item.name,
    //     price: item.price,
    //     quantity: 1
    //   });
    // }
      this.basketDump.push({
         name: item.name,
         price: item.price,
         quantity: 1
    });
      this.$store.commit('addBasketItems', this.basketDump);
      this.basketDump = [];
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
    reset() {
      this.basket = [];
    },
  },
  computed: {
    basket() {
     // return this.$store.state.basketItems
      return this.$store.getters.getBasketItems
    },
    menuItems() {
      return this.$store.getters.getMenuItems
    },
    subtotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    delivery() {
      var deliveryCost = 0;
      if (this.subtotal > 100) {
        deliveryCost = 0;
      }
      else {
        deliveryCost = 10;
      }
      return deliveryCost;
    },
    total() {
      var totalCost = this.subtotal;
      return totalCost + this.delivery;
    },
      
  },
  
};
</script>

<style lang="scss" scoped>

</style>