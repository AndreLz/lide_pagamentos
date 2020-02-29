<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="entradas"
      class="elevation-1"
      :footer-props="{
      itemsPerPageText:'Processos por página',
      pageText:'{0}-{1} de {2}'
    }"
    >
      <template v-slot:item.valor="{ item }">R$ {{ item.valor }}</template>
      <template v-slot:item.taxa="{ item }">R$ {{ item.taxa }}</template>
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
        { text: "Valor", value: "valor" },
        { text: "Recebido em", value: "data" },
        { text: "Taxa cobrada a mais", value: "taxa" },
        { text: "Descrição", value: "descricao" },
        { text: "Tipo de pagamento", value: "tipo", align: "center" }
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
    ...mapState("entrada", ["entradas"]),
    ...mapGetters("entrada", ["entradasLen"])
  },

  created() {
   
  }
};
</script>


