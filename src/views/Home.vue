<template>
 <v-container grid-list-xl>
   <v-layout justify-center>
     <v-flex xs12>
       <v-btn color="blue" dark depressed @click="loginWithGoogle">Login dengan Akun Google</v-btn>
     </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions("auth", ["loginWithGoogle"])
  }
}
</script>
