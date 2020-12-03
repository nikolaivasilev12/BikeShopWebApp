<template>
  <v-app id="app">
    <navigation />
    <componentas />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navigation from "./components/navigation";
import componentas from "./components/componentas.vue";

export default {
  components: {
    navigation,
    componentas
  },
  name: "App",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
<style lang="scss" >
//Stranges
//Strange, cause here it works!
main {
  background-image: url("./assets/img/background.png");
  background-size: cover;
}
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
</style>