<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Laporan Neraca Saldo</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card elevation="1">
          <v-card-text>
            <v-list dense>
              <v-subheader><h2>Aktiva Lancar</h2></v-subheader>
              <v-list-item v-for="currentAsset in currentAssets" :key="currentAsset.id">
                <v-list-item-action>{{currentAsset.accNum}}</v-list-item-action>
                <v-list-item-content>{{currentAsset.name}}</v-list-item-content>
                <v-list-item-action>{{currentAsset.total}}</v-list-item-action>
              </v-list-item>
            </v-list>

            <v-list dense>
              <v-subheader><h2>Aktiva Tidak Lancar</h2></v-subheader>
              <v-list-item v-for="longAsset in currentAssets" :key="longAsset.id">
                <v-list-item-action>{{longAsset.accNum}}</v-list-item-action>
                <v-list-item-content>{{longAsset.name}}</v-list-item-content>
                <v-list-item-action>{{longAsset.total}}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card elevation="1">
          <v-card-text>
            <v-list dense>
              <v-subheader><h2>Kewajiban</h2></v-subheader>
              <v-list-item v-for="liability in liabilities" :key="liability.id">
                <v-list-item-action>{{liability.accNum}}</v-list-item-action>
                <v-list-item-content>{{liability.name}}</v-list-item-content>
                <v-list-item-action>{{liability.total}}</v-list-item-action>
              </v-list-item>
            </v-list>

            <v-list dense>
              <v-subheader><h2>Modal</h2></v-subheader>
              <v-list-item v-for="equity in equities" :key="equity.id">
                <v-list-item-action>{{equity.accNum}}</v-list-item-action>
                <v-list-item-content>{{equity.name}}</v-list-item-content>
                <v-list-item-action>{{equity.total}}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created() {
    this.getThisYearBalanceSheet()
  },

  computed: {
    ...mapState('report', ['currentAssets', 'longAssets', 'liabilities', 'equities'])
  },

  methods: {
    getThisYearBalanceSheet() {
      this.$store.dispatch("report/getThisYearBalanceSheet", this.$route.params.cid)
    }
  }
}
</script>