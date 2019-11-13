<template>
  <v-container fluid>
    <v-row>
      <v-col offset-md="1" md="6">
        <h1>Offers</h1>
        <div class="pa-2" id="info">
           <v-row class="ma-0" >
               <v-col cols="12" md="1" class="pa-2">
                   <p class="font-weight-bold body-1 pt-1 darkgrey--text">
                       INFO:
                   </p>
               </v-col>

               <v-col>
                  <v-row align="center">
                  <div id="status_box" class="complete">Completed</div>
                  <span class="font-weight-light caption pl-1"> Done </span>      
                  </v-row>

                  <v-row align="center">
                  <div id="status_box" class="orange">In-Progress</div>
                  <span class="font-weight-light caption pl-1"> Somebody is working on it </span>      
                  </v-row>

                  <v-row align="center">
                  <div id="status_box" class="incomplete">Not started</div>
                  <span class="font-weight-light caption pl-1">Not started yet </span>      
                  </v-row>
                </v-col>

               <v-col cols="12" md="6" class="pa-2">
                 <v-row>
                   <div id="status_box" class="complete">Completed</div>
                   <div id="status_box" class="orange">In-Progress</div>
                   <div id="status_box" class="incomplete">Not started</div>
                 </v-row>
                 <v-row>
                   <p class="font-weight-light caption pl-1">
                     <b>Single-click </b> to switch stage: complete => in progress =>
                     <b>Double-click </b> the box to reset to "not started"
                   </p>
                   <span class="font-weight-light caption pl-1">
                     <v-icon color="grey">archive</v-icon>
                     Archive to "hide it from orders list"
                   </span>
                 </v-row>

               </v-col>
           </v-row> 
        </div>
        <!-- Orders list area -->
        <div class="pa-2 mt-2" id="info">
             <p class="font-weight-bold body-1 pa-3 darkgrey--text">
                  Orders:
              </p>
          <v-simple-table id="menu-table" >
            <thead>
              <tr>
                <th class="text-left" style="width:10%;">Order mr.</th>
                <th class="text-left" style="width:10%;">QTY</th>
                <th class="text-left" style="width:30%;">Item</th>
                <th class="text-left" style="width:10%;">Price</th>
                <th class="text-left" style="width:10%;">Status</th>
                <th class="text-left" style="width:10%">Archive Item</th>
                <th class="text-left" style="width:10%">Remove</th>
              </tr>
            </thead>
            <tbody class="font-weight-light">
              <tr v-for="item in orderItems" :key="item.name">
                <td >
                  {{ item.orderNumber }}
                </td>
                <td class="py-3" style="margin:0;"><p v-for="subitem in item.orderLines" :key="subitem.id" > {{ subitem.quantity }} </p> </td>
                <td class="py-3" style="margin:0;"><p v-for="subitem in item.orderLines" :key="subitem.id"> {{ subitem.name }}</p></td>
                <td class="py-3" style="margin:0;"><p v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.price + "$" }} </p></td>
                 <td>
                   <div id="status_box" class="orange">{{ item.status }}</div>
                 </td>
                 <td>
                   <v-btn small text @click="addToBasket(item)">
                      <v-icon color="darkgrey">archive</v-icon>
                   </v-btn>
                </td>
                 <td>
                   <v-btn small text @click="deleteOrderItem(item.id)">
                      <v-icon color="incomplete">delete</v-icon>
                   </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>

        </div>
      </v-col>
      <v-col offset-md="0" md="4">
        <h1>Revenue</h1>
        <div class="pa-2" id="info">
            Revenue
        </div>
        <div class="pa-2 mt-1" id="info">
            Completed Orders
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { dbOrders } from '../../firebase'

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
    this.$store.dispatch('setOrderItems')
  },


  methods:{
    deleteOrderItem(id) {
      dbOrders.doc(id).delete().then( () => {
        console.log("deleted")
      }).catch((error) => {

      })
    },

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
    orderItems() {
      return this.$store.getters.getOrderItems
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
  #status_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 90px;
    font-size: 12px;
    border-radius: 2px;
    margin: 5px 0;
    color: map-get($colorz,white );
    text-shadow: 1px 1px 1px #aaa;
  }
</style>