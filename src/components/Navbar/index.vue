<template>
  <v-app-bar app color="secondary" dark>
    <div class="d-flex align-center">
      <div class="top-badge">
        <v-btn class="mx-2" fab dark small color="#FFFFFF33">
          <img src="@/assets/images/menu.svg" />
        </v-btn>
      </div>

      <v-img
        alt="Vuetify Name"
        class="ml-3"
        contain
        min-width="180"
        src="@/assets/images/roit-logo.svg"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-card width="236" elevation="0">
      <v-text-field
        solo
        dense
        label="Busca"
        prepend-inner-icon="mdi-magnify"
        hide-details
      ></v-text-field>
    </v-card>
    <lang-selection />
    <avatar user="jonas antunes"/>
  </v-app-bar>
</template>

<script>
import Avatar from "./components/Avatar.vue";
import LangSelection from "./components/LangSelection.vue";
export default {
  name: "Navbar",
  data: () => {
    return {};
  },
  components: {
    LangSelection,
    Avatar,
  },
};
</script>

<style lang="scss" scoped>
</style>