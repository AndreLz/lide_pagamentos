import Vue from 'vue';
const vue = Vue.prototype;

const state = {
    devolucoes: []
};

const getters = {
    devolucoesLen: state => state.devolucoes.length,
    getDevolucoes: state => state.devolucoes,
}
const mutations = {
    SET_DEVOLUCOES: (state, payload) => state.devolucoes = payload
}
function reduz(devolucaoObj) {
    const devolucao = devolucaoObj.attributes;
    const processo = devolucao.processo.attributes;
    const parte = devolucao.parte.attributes;

    return {
        numProcesso: processo.numeroProcesso,
        valor: devolucao.valor,
        pendente: devolucao.pendente,
        descricao: devolucao.descricao,
        nome: parte.nome,
        data: vue.$helpers.ddMMyyyy(devolucao.createdAt),
        id: devolucaoObj.id
    }
}

const actions = {
    getDevolucoes: function ({ commit }) {
        vue.$parse.Cloud.run("fetchDevolucoesFinanceiras")
            .then(resp => {
                const filter = resp.map((devolucao) => reduz(devolucao));
                commit('SET_DEVOLUCOES', filter)
            })
            .catch(error => console.log(error))
    },

    trocarPendente: function ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //só trocando o bool do pendente com !pendente. 
            vue.$parse.Cloud.run("changePendenteDevolucaoFinanceira", { id: payload.id, newPendente: !payload.pendente })
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
