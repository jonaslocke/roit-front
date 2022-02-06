<template>
  <v-snackbar
    top
    :timeout="snackbar.timeout"
    v-model="snackbar.open"
    :color="snackbar.color"
  >
    <div class="d-flex justify-space-between align-center">
      <span>{{ snackbar.text }}</span>
      <v-btn text @click="setSnackbar({ open: false, color: snackbar.color })">
        Fechar
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoitSnackbar",
  computed: {
    ...mapGetters({
      snackbar: "getSnackbar",
    }),
  },
  methods: {
    ...mapActions(["setSnackbar"]),
  },
};
</script>