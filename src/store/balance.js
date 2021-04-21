import { firestore }  from '@/firebase'

const actions = {
  async getAllPaymentMethods({commit}, payload) {
    await firestore.collection('company').doc(payload).collection('payment_methods').get().then (querySnap => {
      const paymentArray = [];
      querySnap.forEach(doc => {
        const data = {
          accNum: doc.id,
          name: doc.data().name,
        }
        paymentArray.push(data)
      })
      commit('setPaymentMethods', paymentArray)
    })
  }
}

const mutations = {
  setPaymentMethods(state, payload) {
    state.paymentMethods = payload
  }
}

const state = {
  paymentMethods: []
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}