import Vue from 'vue';
const vue = Vue.prototype;

const state = {
    entradas: []
};

const getters = {
    entradasLen: state => state.entradas.length,

}
const mutations = {
    SET_ENTRADAS: function (state, payload) {
        state.entradas = payload;
    },
}

function reduz(entrada) {
    entrada = entrada.attributes;
    const processo = entrada.processo.attributes;
    return {
        numProcesso: processo.numeroProcesso,
        valor: entrada.valor,
        taxa: entrada.taxa,
        data: vue.$helpers.ddMMyyyy(entrada.createdAt),
        descricao: entrada.descricao,
        tipo: entrada.idBoleto ? 'mdi-barcode':'mdi-credit-card',
    }
}

const actions = {
    getEntradas: function ({ commit }) {
        vue.$parse.Cloud.run("fetchEntradasFinanceirasApp")
            .then(resp => {
                const filter = resp.map((entrada) => reduz(entrada));
                commit('SET_ENTRADAS', filter)
            })
            .catch(error => console.log(error))
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
