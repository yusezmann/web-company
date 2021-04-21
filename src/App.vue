<template>
  <v-app app>
    <div v-if="isLoggedIn">
    <Navigation v-if="company"/>
    </div>
    <v-main>
      <router-view/>
      <!-- {{company}} -->
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/layouts/Navigation"
import { mapState } from "vuex"
  export default {
    components: { Navigation },
    computed: {
      ...mapState("auth", ["isLoggedIn", "company"])
    }
  }

</script>
