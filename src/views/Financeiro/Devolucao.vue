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
        :items="devolucoes"
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

      <v-dialog v-if="devolucaoObj" v-model="dialogConfirm" width="500">
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="red lighten-2"></v-icon>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{msg}}</v-card-title>
          <v-container>
            <p>R$ {{devolucaoObj.valor}}</p>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogConfirm = false">Não</v-btn>
            <v-btn
              :loading="loading"
              color="red darken-1"
              text
              @click="changeStatus(devolucaoObj)"
            >Sim</v-btn>
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
      dialogConfirm: false,
      devolucaoObj: null,
      loading: false,
      search: "",
      msg: "",
      headers: [
        {
          text: "Processo",
          align: "start",
          sortable: false,
          value: "numProcesso"
        },
        { text: "Parte", value: "nome" },
        { text: "Valor a pagar o árbitro", value: "valor", align: "center" },
        { text: "Recebido em", value: "data" },
        { text: "Descrição", value: "descricao" },
        { text: "Status ", value: "pendente", align: "center" }
      ]
    };
  },
  methods: {
    changeStatusConfirm(devolucao) {
      if (devolucao.pendente) this.msg = "Marcar esta devolução como feita?";
      else this.msg = "Disfazer esta devolucao?";
      this.devolucaoObj = devolucao;
      this.dialogConfirm = true;
    },
    async changeStatus(devolucaoObj) {
      this.loading = true;
      try {
        await this.trocarPendente(devolucaoObj);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
      this.dialogConfirm = false;
    },
    ...mapActions("devolucao", ["trocarPendente"])
  },
  computed: {
    ...mapGetters("devolucao", { devolucoes: "getDevolucoes" })
  }
};
</script>

<style scoped>
.disable-click {
  pointer-events: none;
}
</style>