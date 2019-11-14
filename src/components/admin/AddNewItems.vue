<template>
  <v-container>
    <v-row>
     
      <v-col offset-md="1" md="5">
        <h1>Add New Item</h1>
        <div class="pa-2" id="info">
          <v-text-field label="Name" required v-model="name"></v-text-field>
          <v-text-field label="Description" required v-model="description"></v-text-field>
          <v-text-field label="Price" required v-model="price"></v-text-field> 
          <v-file-input label="Image" @change="uploadImage"></v-file-input>

          <v-btn class="mr-2" color="complete" @click="addNewMenuItem()"  :disabled="btnDisable">Add Item</v-btn>
          <v-btn color="incomplete">Cancel</v-btn>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Preview</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width:70%">Name</th>
                <th class="text-left" style="width:100%">Price DKK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span id="td_name">{{name}}</span>
                  <br />
                  <span id="menu_item_description">{{description}}</span>
                </td>
                <td id="preview_menuitem_price">{{price}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd,fb } from "../../../firebase";


export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisable: true
    }
  },
  methods: {

    uploadImage (e) {
      let file = e;
      console.log(e);
      var storageRef = fb.storage().ref('products/'+ file.name);
      let uploadTask = storageRef.put(file)
   


    uploadTask.on('state_changed', (snapshot) => {
  
    },  (error) => {
      // Handle u nsuccessful uploads
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        this.image = downloadURL;
        this.btnDisable = false;
        console.log('File available at', downloadURL);
      });
    });


    },
      
    addNewMenuItem() {
      dbMenuAdd.add ({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.col h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  //I kinda got out of the previous struggles but I couldn't solve this. this is the  error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
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