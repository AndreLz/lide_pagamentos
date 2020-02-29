import Vue from 'vue';
const vue = Vue.prototype;

const state = {
    saidas: []
};

const getters = {
    saidasLen: state => state.saidas.length,
}
const mutations = {
    SET_SAIDAS: (state, payload) => state.saidas = payload
}
function reduz(saida) {
    saida = saida.attributes;
    const processo = saida.processo.attributes;
    const user = saida.arbitroUser.attributes;
    return {
        numProcesso: processo.numeroProcesso,
        nome: user.nome,
        valor: saida.valor,
        taxa: saida.taxa,
        data: vue.$helpers.ddMMyyyy(saida.createdAt),
        pendente: saida.pendente,
        descricao: saida.descricao,
    }
}

const actions = {
    getSaidas: function ({ commit }) {
        vue.$parse.Cloud.run("fetchSaidasFinanceirasApp")
            .then(resp => {
                const filter = resp.map((saida) => reduz(saida));
                commit('SET_SAIDAS', filter)
            })
            .catch(error => console.log(error))
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
