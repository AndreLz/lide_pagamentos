import Vue from 'vue'
import Vuex from 'vuex'

import entrada from '@/store/modules/entrada.js';
import saida from '@/store/modules/saida.js';
import devolucao from '@/store/modules/devolucao.js';

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    entrada, saida, devolucao
  }
})
