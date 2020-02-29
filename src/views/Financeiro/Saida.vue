<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="saidas"
      class="elevation-1"
      :footer-props="{
      itemsPerPageText:'Processos por página',
      pageText:'{0}-{1} de {2}'
    }"
    >
      <template v-slot:item.valor="{ item }">R$ {{ item.valor }}</template>
      <template v-slot:item.pendente="{ item }">
        <v-btn v-if="!item.pendente" outlined class="disable-click" color="green" block>Transferido</v-btn>
        <v-btn v-else color="red" outlined class="disable-click" block>Pendente</v-btn>
      </template>
      <template v-slot:item.tipo="{ item }">
        <v-icon>{{ item.tipo }}</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Processo",
          align: "start",
          sortable: false,
          value: "numProcesso"
        },
        { text: "Árbitro", value: "nome" },
        { text: "Valor a pagar o árbitro", value: "valor", align: "center" },
        { text: "Recebido em", value: "data" },
        { text: "Descrição", value: "descricao" },
        { text: "Status ", value: "pendente", align: "center" }
      ]
    };
  },
  methods: {
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    }
  },
  computed: {
    ...mapState("saida", ["saidas"]),
    ...mapGetters("saida", ["saidasLen"])
  },

  created() {
    
  }
};
</script>

<style scoped>
.disable-click {
  pointer-events: none;
}
</style>