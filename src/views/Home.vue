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
#financ {
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-align: left;
  width: 1060px;
}

.left-column {
  border-color: #ebebeb;
  border-style: solid;
  border-width: 0 1px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: table-cell;
  padding-right: 10px;
  vertical-align: top;
  width: 725px;
}

.right-column {
  display: table-cell;
  padding-left: 10px;
  vertical-align: top;
  width: 300px;
}

.page-common .pt12 {
  padding-top: 12px !important;
}
</style>