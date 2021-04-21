import { googleProvider, auth, firestore } from "@/firebase"
// import VueRouter from "vue-router";
import router from  "@/router"

const actions = {
  async loginWithGoogle() {
    await auth.signInWithPopup( googleProvider);
  },

  async logout() {
    await auth.signOut();
  },

  async setCompany({commit}, payload) {
    await firestore.collection('company').doc(payload).get().then((doc) => {
      const data = {
        id: doc.id,
        name: doc.data().name
      }
      commit('setCompanyInfo', data)
    })
  }

}

const mutations = {
  setUser(state, payload) {
    if(payload) {
      state.user = payload
      state.isLoggedIn = true
    } else {
      (state.user = {}),
      (state.isLoggedIn = false);
      router.push('/');
    }
  },

  setCompanyInfo(state, payload) {
    state.company = payload
  }


}

const state = {
  user: null,
  isLoggedIn: false,
  company: null
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}