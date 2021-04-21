<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-card elevation="1">
          <v-card-title primary-title>Investasi</v-card-title>
          <v-card-text>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Tanggal Investasi"
                  prepend-icon="mdi-event"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
            </v-menu>
            <v-select :items="paymentMethods" item-text="name"  v-model="selectedMethods" label="label">

            </v-select>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substring(0, 10),
      selectedMethods: ''
    }
  },

  created () {
    this.getAllPaymentMethods()
  },

  computed: {
    ...mapState('balance', ["paymentMethods"])
  },

  methods: {
    getAllPaymentMethods() {
      this.$store.dispatch("balance/getAllPaymentMethods", this.$route.params.cid)
    }
  }
}
</script>