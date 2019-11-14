<template>
  <v-container>

     <v-snackbar
      top
      v-model="updatedSuccess"
    >
      {{ updatedText }}
      <v-btn
        color="pink"
        text
        @click="updatedSuccess = false"
      >
        Close
      </v-btn>
    </v-snackbar>


    <v-row>
      <v-col style="" offset-md="1" md="10">
        <h1 class="display-1 text-left">Admin Panel</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width:15%;">Image</th>
                <th class="text-left" style="width:25%;">Name
                  <v-btn color="#777777" class="ml-5" small text to="/addNew">
                    <v-icon>add</v-icon>
                    <span style="padding:0 10px;">Add Item</span>
                  </v-btn>
                </th>
                <th class="text-left" style="width:30%;">Description</th>
                <th class="text-left" style="width:15%;">Price</th>
                <th class="text-left" style="width:10%;">Edit</th>
                <th class="text-left" style="width:20%;">Remove</th>
                <th class="text-left" style="width:5%;">
                  <v-btn style="color:white;" small class="" color="red" @click.prevent="signOut()">Sign Out</v-btn></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.name">
                <td >
                  <v-img id="td_menuitem_img" v-bind:src="item.image" ></v-img>
                </td>
                <td>
                  <span id="td_name">{{ item.name }}</span>
                </td>
                <td>
                  <span id="menu_item_description">{{ item.description }}</span>
                  <br />
                 
                </td>
               
                <td>{{ item.price + " $" }}</td>
                <td>
                  <v-btn  small text @click.stop ="dialog = true" @click="editItem(item)">
                    <v-icon color="#777777">edit</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn small text @click="deleteItem(item.id)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
      </v-col>
    </v-row>
    <v-row>
      <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        

        <h1 class="pl-4 pt-2">Edit Item</h1>
        <div class="pa-5" id="info">
          <v-text-field v-model="item.name"></v-text-field>
          <v-text-field v-model="item.description"></v-text-field>
          <v-text-field v-model="item.price"></v-text-field>
          <v-btn color="complete"
          @click="updateItem()"
          @click.stop="dialog = false"
          >
          Edit
          </v-btn>
          <v-btn class="ml-2" color="incomplete" @click.stop="dialog = false"
          >
          Close
          </v-btn>
        </div>

        
      </v-card>
    </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store.js'

export default {
  data() {
    return {
      basket: [],
      dialog: false,
      item: [],
      activeEditItem: null,
      updatedSuccess: false,
      updatedText:'Menu Item has been updated successfully!'
    };
  },

  beforeCreate() {
    this.$store.dispatch('setMenuItems')
  },


  methods: {
     signOut() {
        firebase.auth().signOut().then(() => {
            alert('Logged Out')
            this.$router.replace('/')
        }).catch(error => {
            alert(error)
        })
    },
    editItem(item) {
      this.item =item
      this.activeEditItem = item.id
    },
    updateItem() {

        dbMenuAdd.doc(this.activeEditItem).update(this.item)  
        .then(() => {
          this.updatedSuccess = true;
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
 



    },
    deleteItem(id) {
      dbMenuAdd.doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },

    addToBasket(item) {
      this.basket.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  },
  computed: {
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
    total() {
      var deliveryPrice = 10;
      var totalCost = this.subtotal;
      return totalCost + deliveryPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.col h1 {
  border: none;
  //I kinda got out of the previous struggles but I couldn't solve this. this is the  error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  font-weight: bold;
  text-transform: uppercase;
  text-align: right;
  font-family: 'Big Shoulders Text'!important;
}
.col:last-child h1 {
  text-align: left;
}

#info {
  background-color: white;
}
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10x 10px 10px 16px;
}
#td_menuitem_img {
  max-width: 75px;
  max-height: 50px;
  padding: 0;
}
#menu_item_description {
  font-style: italic;
  font-weight: 300;
  color: darkgray;
  font-size: 13px;
}

#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:first-child {
  line-height: 2px;
}
</style>