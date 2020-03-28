<template>
  <v-app-bar app color="#343056" dark>
    <div class="d-flex align-center">
      <v-img class="shrink mr-2" src="@/assets/lide_oficial.png" width="40" />
    </div>

    <v-spacer></v-spacer>

   

    <v-btn to="/" text replace>
      <span class="mr-2">Home</span>
    </v-btn>

    <v-btn to="/entrada" text replace>
      <span class="mr-2">Entradas</span>
    </v-btn>

    <v-btn to="/saida" text>
      <span class="mr-2">Saidas</span>
    </v-btn>

    <v-btn to="/devolucao" text>
      <span class="mr-2">Devolução</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style>
</style>