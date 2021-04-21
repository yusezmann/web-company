import { firestore }  from '@/firebase'

const today = new Date
const thisYear = today.getFullYear()

const actions = {
  async getThisYearBalanceSheet({commit}, payload) {

    const companyRef = firestore.collection('company').doc(payload)

    await companyRef.collection('current_assets').doc(thisYear + '_').get().then((doc) => {
      commit('setCurrentAssets', doc.data())
    })

    await companyRef.collection('long_assets').doc(thisYear + '_').get().then((doc) => {
      commit('setLongAssets', doc.data())
    })

    await companyRef.collection('liabilities').doc(thisYear + '_').get().then((doc) => {
      commit('setLiabilities', doc.data())
    })

    await companyRef.collection('equities').doc(thisYear + '_').get().then((doc) => {
      commit('setEquities', doc.data())
    })

  }

}

const mutations = {
  setCurrentAssets(state, payload) {
    state.currentAssets = payload
  },
  setLongAssets(state, payload) {
    state.longAssets = payload
  },
  setLiabilities(state, payload) {
    state.liabilities = payload
  },
  setEquities(state, payload) {
    state.equities = payload
  },
}

const state = {
  currentAssets: null,
  longAssets: null,
  liabilities: null,
  equities: null,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}