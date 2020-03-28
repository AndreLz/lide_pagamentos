<template>
  <v-app>
    <NavBar />

    <v-content class="grey lighten-5">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch("saida/getSaidas");
    this.$store.dispatch("devolucao/getDevolucoes");
    this.$store.dispatch("entrada/getEntradas");
    console.log("buscou");
  }
};
</script>
