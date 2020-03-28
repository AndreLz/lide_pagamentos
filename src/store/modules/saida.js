import Vue from 'vue';
const vue = Vue.prototype;

const state = {
    saidas: []
};

const getters = {
    saidasLen: state => state.saidas.length,
    getSaidas: state => state.saidas,
}
const mutations = {
    SET_SAIDAS: (state, payload) => state.saidas = payload
}
function reduz(saidaObj) {
    const saida = saidaObj.attributes;
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
        id: saidaObj.id
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

    trocarPendente: function ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //só trocando o bool do pendente com !pendente. 
            vue.$parse.Cloud.run("changePendenteSaidaFinanceira", { id: payload.id, newPendente: !payload.pendente })
                .then(resp => {
              
                    console.log(resp);
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
