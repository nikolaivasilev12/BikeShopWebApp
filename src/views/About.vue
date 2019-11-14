<template>
  <v-container grid-list-xs>
    <v-layout align-center id="layout" class="info_box">
      <v-flex sm4 xs12 offset-sm1>
        <h1 class="display-3 font-weight-bold" style="font-family: 'Big Shoulders Text'!important;" >About us at Good Bike Shop</h1>
        <p class="mt-5">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </v-flex>
    </v-layout>

    <!-- <v-layout align-center class="info_box" row wrap>
      <v-flex sm3 xs12 offset-sm-1>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>

      <v-flex sm3 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>

      <v-flex sm3 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>
    </v-layout> -->
  </v-container>
</template>

<style lang="scss" scoped>
.info_box:first-child .flex h1 {
  margin-top: 50px;
}
.info_box .flex div {
  background-color: white;
  padding: 20px;
}
#layout {
  margin-top:200px;
}
@media only screen and (max-width: 600px) {
 #layout {
  margin-top:0px;
}
}
</style>