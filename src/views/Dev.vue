<template>
  <v-container fluid>
    <v-row justify="center">
      <v-container fluid>
        <v-card outlined class="text-center">
          <v-card-title class="justify-center">Painel de controle</v-card-title>
        </v-card>
      </v-container>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card outlined class="text-center pa-4">
          <v-card-title class="justify-center">Lucros</v-card-title>
          <v-btn @click="next2" class="mx-2 green lighten-2" fab height="256" width="256">
            <v-icon color="white" size="256">mdi-currency-usd</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="text-center pa-4">
          <v-card-title class="justify-center">Despesas</v-card-title>
          <v-btn @click="next2" class="mx-2 red lighten-2" fab height="256" width="256">
            <v-icon color="white" size="256">mdi-currency-usd-off</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <CardInfo
        msg="Processos em andamento"
        num="teste"
        icon="mdi-account-group"
        theme="#3b3b3b"
      />
      <CardInfo msg="Usuários registrados" num="teste" icon="mdi-account" theme="#5b358c" />
      <CardInfo msg="Árbitros registrados" num="teste" icon="mdi-account-tie" theme="#345382" />
      <CardInfo msg="Processos concluídos" num="teste" icon="mdi-check-circle" theme="#74966c" />
      <CardInfo msg="Desistências" num="teste" icon="mdi-alert-circle" theme="#c7a256" />
    </v-row>
  </v-container>
</template>

<script>
import CardInfo from "@/components/CardInfo.vue";
export default {
  name: "Dev",
  data() {
    return { style: {} };
  },
  components: {
    CardInfo
  },
  methods: {
    next: function() {
      this.$router.push("/");
    },
    next2: () => console.log("asdad")
  },
  created() {
    this.$store.dispatch("saida/getSaidas");
    this.$store.dispatch("entrada/getEntradas");
  }
};
</script>

<style lang="scss">
.bg-gradient-primary {
  background: #1f1498 !important;
  background: linear-gradient(45deg, #321fdb, #1f1498) !important;
  border-color: #1f1498 !important;
}
.text-value-lg {
  font-size: 1.3125rem;
}
</style>
