<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Procurar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :search="search"
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
          <v-btn
            v-if="!item.pendente"
            outlined
            color="green"
            block
            @click="changeStatusConfirm(item)"
          >Transferido</v-btn>
          <v-btn v-else color="red" outlined block @click="changeStatusConfirm(item)">Pendente</v-btn>
        </template>
        <template v-slot:item.tipo="{ item }">
          <v-icon>{{ item.tipo }}</v-icon>
        </template>
      </v-data-table>

      <v-dialog v-if="saidaObj" v-model="dialogConfirm" width="500">
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="red lighten-2"></v-icon>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{msg}}</v-card-title>
          <v-container>
            <p>R$ {{saidaObj.valor}}</p>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogConfirm = false">Não</v-btn>
            <v-btn :loading="loading" color="red darken-1" text @click="changeStatus(saidaObj)">Sim</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      dialogConfirm: false,
      saidaObj: null,
      loading: false,
      msg: "",
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
    changeStatusConfirm(saida) {
      if (saida.pendente) this.msg = "Marcar esta saida como paga?";
      else this.msg = "Marcar esta saida como pendente?";
      this.saidaObj = saida;
      this.dialogConfirm = true;
    },
    async changeStatus(saidaObj) {
      this.loading = true;
      try {
        await this.trocarPendente(saidaObj);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
      this.dialogConfirm = false;
    },
    ...mapActions("saida", ["trocarPendente"])
  },
  computed: {
    ...mapGetters("saida", { saidas: "getSaidas" })
  }
};
</script>

<style scoped>
.disable-click {
  pointer-events: none;
}
</style>