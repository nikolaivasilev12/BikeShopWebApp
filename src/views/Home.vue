<template>
  <v-container grid-list-xs>
    <v-layout align-center class="info_box">
      <v-flex flex-column style="margin-top:300px;" sm6 xs12 offset-sm1>
        <h2 id="header" class="display-3 font-weight-bold" >Hand crafted to perfection</h2>
        <div class="body-1 mt-4">Our Bike Central at Copenhagen is responsible for all the production and etc.Our Bike Central at Copenhagen is responsible for all the production and etc.Our Bike Central at Copenhagen is responsible for all the production and etc.</div>
        
        <router-link style="" to="/menu">See our products<v-icon color="#bbbbbb"></v-icon></router-link>
      </v-flex>
      
    </v-layout>

    <!-- <v-layout align-center class="info_box" row wrap>
      <v-flex sm2 xs12 offset-sm1>
        <h1>Our bikes</h1>
        <div>
          <p>Buy our wonderful bikes!</p>
        </div>
      </v-flex>

      <v-flex sm2 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our wonderful bikes!</p>
        </div>
      </v-flex>

      <v-flex sm2 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our wonderful bikes!</p>
        </div>
      </v-flex>
    </v-layout> -->
  </v-container>
</template>

<script>
//import HelloWorld from '../components/HelloWorld';

export default {
  components: {}
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Bevan|Big+Shoulders+Text|Raleway:800&display=swap');
@font-face {
  font-family: Arial, Helvetica, sans-serif ;
  src: url();
}
#header {
  font-family: 'Big Shoulders Text'!important;

}
.info_box .flex div {

  max-width:550px!important;
  word-wrap: break-word;
}
.info_box .flex h1 {
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
  text-align: center;
  font-family: 'Raleway';
  letter-spacing: 0.2em;

}
// .info_box .flex div {
//   background-color: white;
//   padding: 20px;
// }

.layout:first-child {
  height: 40vh;
}
.layout:last-child {
  height: 40vh;
}
</style>