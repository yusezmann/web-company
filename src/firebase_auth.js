import { auth, firestore } from '@/firebase'
import store from '@/store'
import router from './router'

auth.onAuthStateChanged(user => {
  if(user) {
    const userData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL
    }

    firestore.collection('users').doc(user.uid).set(userData)
    store.commit('auth/setUser', userData)

    firestore.collection('company').where('users', 'array-contains', user.uid).limit(1).get().then(querySnap => {
      if (querySnap.size === 0) {
        router.push('/company-setup')
      } else {
        querySnap.forEach((doc) => {
          store.dispatch('auth/setCompany', doc.id)
          router.push('/dashboard/' + doc.id)
        })
      }
    })
  } else {
    store.commit('auth/setUser', null)
    store.commit('auth/setCompany', null)
  }
})