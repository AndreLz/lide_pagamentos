<template>
  <v-container fill-height fluid>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row justify="center">
      <v-col cols="12" md="6" xl="5">
        <v-card class="pa-2" outlined tile>asdasd</v-card>
      </v-col>
      <v-col cols="12" md="6" xl="5">
        <v-card class="pa-2" outlined tile>.col-12 .col-md-6</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>

</style>