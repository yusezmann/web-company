import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import { firestore } from '@/firebase'
import company from '@/store/company'
import report from '@/store/report'
import balance from '@/store/balance'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    company,
    report,
    balance
  },
  state: {
  },
  mutations: {
  },
  actions: {
    async search(_, payload) {
      await firestore.collection('search').add({
        name: payload,
      })
    }
  }
})
