<template>
  <div class="delete-user">
    <v-dialog :value="open" persistent max-width="368">
      <v-card>
        <v-card-title class="pt-5 pb-0">
          <div class="flex-1">
            <div class="poppins d-flex justify-space-between pb-3">
              <span>Excluir</span>
              <v-btn icon small @click="closeDialog()">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
          </div>
        </v-card-title>
        <v-card-text class="mt-4">
          <div class="d-flex align-center">
            <v-icon color="error">mdi-close-circle</v-icon>
            <span class="ml-1 black--text"
              >Confirma a exclusão deste registro?</span
            >
          </div>

          <v-divider class="mt-4"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            class="roit-btn px-5"
            @click="closeDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            class="roit-btn px-5"
            @click="confirmDelete()"
            :disabled="loading"
          >
            <span>Excluir</span>
            <v-progress-circular
              indeterminate
              color="white"
              size="16"
              class="ml-2"
              v-if="loading"
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DeleteUser",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    selected: {
      type: String,
    },
  },
  data: () => {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({ users: "getUsers" }),
  },
  methods: {
    ...mapActions(["setUsers"]),
    closeDialog() {
      this.$emit("update:open", false);
    },
    async confirmDelete() {
      this.loading = true;
      const api = `${process.env.VUE_APP_API}/${this.selected}`;
      const response = await fetch(api, {
        method: "DELETE",
      });
      if (response.status === 200) {
        this.setUsers(this.users.filter(({ _id }) => _id != this.selected));
        this.closeDialog();
      }

      this.loading = false;
    },
  },
};
</script>
