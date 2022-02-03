<template>
  <v-app>
    <navbar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/index.vue";

export default {
  components: { Navbar },

  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
body {
  font-family: "Open Sans", sans-serif;
}

$body-font-family: "Open Sans";
$heading-font-family: "Open Sans";

.poppins {
  font-family: "Poppins", sans-serif;
}

.v-application {
  [class*="text-"] {
    font-family: $heading-font-family, sans-serif !important;
  }
  font-family: $body-font-family, sans-serif !important;
}
.v-main__wrap {
  display: flex !important;
  flex-direction: column;
}
.cup {
  cursor: pointer;
}
.flex-1 {
  flex: 1;
}
.roit-btn {
  border-color: var(--border);
  text-transform: initial;
  letter-spacing: initial;
}
</style>
