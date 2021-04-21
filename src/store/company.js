import { firestore } from '@/firebase'
import router from '../router'
import store  from '@/store'

const today = new Date()
// const thisMonth = today.getMonth() + 1;
const thisYear = today.getFullYear()

const actions = {
  async createNew(_, payload) {
    await firestore.collection('company').add({
      name: payload.company,
      ownerId: payload.ownerId,
      ownerName: payload.ownerName,
      users: payload.users
    })
    .then((doc) => {
      const companyRef = firestore.collection('company').doc(doc.id);
      const balanceRef = firestore.collection('balance_sheet_accounts')

      const thisYearCurrentAssets = companyRef.collection('current_assets').doc(thisYear + '_')

      const thisYearLongAssets = companyRef.collection('long_assets').doc(thisYear + '_')

      const thisYearLiabilities = companyRef.collection('liabilities').doc(thisYear + '_')

      const thisYearEquities = companyRef.collection('equities').doc(thisYear + '_')


      thisYearCurrentAssets.set({
        total: Number(0)
      })

      thisYearLongAssets.set({
        total: Number(0)
      })

      thisYearLiabilities.set({
        total: Number(0)
      })

      thisYearEquities.set({
        total: Number(0)
      })

      balanceRef.doc('assets').collection('current_assets').get().then((querySnap) => {
        querySnap.forEach((assetDoc) => {
          let accNum = assetDoc.data().accNum
          if (assetDoc.data().payment === true) {
            companyRef.collection('payment_methods').doc(accNum.toString()).set({
              name: assetDoc.data(name)
            },
            { merge: true },
            )
          }
          thisYearCurrentAssets.update({
            [accNum]: {
              name: assetDoc.data().name,
              accNum: assetDoc.data().accNum,
              total: Number(0)
            }
          })
        })
      })

      balanceRef.doc('assets').collection('long_assets').get().then((querySnap) => {
        querySnap.forEach((longAssetDoc) => {
          let accNum = longAssetDoc.data().accNum
          thisYearLongAssets.update({
            [accNum]: {
              name: longAssetDoc.data().name,
              accNum: longAssetDoc.data().accNum,
              total: Number(0)
            }
          })
        })
      })

      balanceRef.doc('liabilities').collection('current_liabilities').get().then((querySnap) => {
        querySnap.forEach((liabilityDoc) => {
          let accNum = liabilityDoc.data().accNum
          thisYearLiabilities.update({
            [accNum]: {
              name: liabilityDoc.data().name,
              accNum: liabilityDoc.data().accNum,
              total: Number(0)
            }
          })
        })
      })

      balanceRef.doc('equities').collection('current_equities').get().then((querySnap) => {
        querySnap.forEach((equityDoc) => {
          let accNum = equityDoc.data().accNum
          thisYearEquities.update({
            [accNum]: {
              name: equityDoc.data().name,
              accNum: equityDoc.data().accNum,
              total: Number(0)
            }
          })
        })
      })


      store.dispatch('auth/setCompany', doc.id)
      router.push('/dashboard/' + doc.id)
    })
  }
}

export default {
  namespaced: true,
  actions,
}