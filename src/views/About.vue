<template>
  <v-container grid-list-xs>
    <v-layout align-center class="info_box">
      <v-flex sm4 xs12 offset-sm1>
        <h1>Watch shop</h1>
      </v-flex>
    </v-layout>

    <v-layout align-center class="info_box" row wrap>
      <v-flex sm2 xs12 offset-sm1>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>

      <v-flex sm2 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>

      <v-flex sm2 xs12>
        <h1>Our watches</h1>
        <div>
          <p>Buy our magnificent watches!</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.info_box:first-child .flex h1 {
  font-size: 150%;
  padding: 50px;
}
.info_box .flex div {
  background-color: white;
  padding: 20px;
}
</style>