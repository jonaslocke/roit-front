<template>
  <v-container fluid class="dashboard d-flex justify-space-between pa-0">
    <sidebar />
    <div class="dashboard__content flex-1 pa-5" :class="{ open }">
      <div class="dashboard__title poppins font-weight-bold">
        Teste Engenheiro de Software Full Stack
      </div>
      <div class="dashboard__subtitle mt-1">
        Desenvolva no padrão MVC. Use e abuse da Orientação a Objetos.
      </div>
      <v-card class="mt-5 py-5 px-4">
        <div class="d-flex">
          <v-btn color="primary" class="roit-btn px-5"> Cadastrar </v-btn>
          <v-spacer></v-spacer>
          <v-card elevation="0" width="176">
            <v-text-field
              solo
              dense
              label="Busca"
              prepend-inner-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-card>
        </div>
        <roit-table />
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./components/Sidebar";
import RoitTable from "./components/RoitTable";
export default {
  components: { Sidebar, RoitTable },
  name: "Dashboard",
  computed: {
    ...mapGetters({ open: "getOpenDrawer" }),
    displacement() {
      return this.open ? 84 : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  --size: 84px;
  flex: 1;
  background-color: var(--background);
  &__content {
    margin-left: calc(-1 * var(--size));
    transition: 0.2s ease-in-out;
    &.open {
      margin-left: 0;
    }
  }
  &__title {
    font-size: 20px;
    color: var(--gray-87);
  }
  &__subtitle {
    font-size: 14px;
    color: var(--gray-54);
  }
}
</style>
