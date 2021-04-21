<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid">
          <v-card elevation="1">
            <v-card-title primary-title>
              <h3>Daftar Perusahaan</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field filled label="Nama Perusahaan" v-model="name"
              :rules="nameRules" autofocus></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" @click="submitNewCompany" depressed dark>Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
export default {
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [v => !!v || "Nama Perusahaan harus diisi."]
    }
  },

  computed: {
    ...mapState("auth", ["user"])
  },

  methods: {
    submitNewCompany() {
      const data = {
        company: this.name,
        ownerId: this.user.id,
        ownerName: this.user.name,
        users:[this.user.id]
      }
      this.$store.dispatch("company/createNew", data)
    }
  }
}
</script>