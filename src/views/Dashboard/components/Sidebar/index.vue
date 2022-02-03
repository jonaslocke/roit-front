<template>
  <v-container class="sidebar flex-column" :class="{ open }" fill-height>
    <roit-button :active="true">
      <template #regular>
        <img src="@/assets/images/bars-graphic-primary.svg" alt="" />
      </template>
      <template #hover>
        <img src="@/assets/images/bars-graphic-secondary.svg" alt="" />
      </template>
    </roit-button>
    <roit-button class="mt-4">
      <template #regular>
        <img src="@/assets/images/flow-magic-primary.svg" alt="" />
      </template>
      <template #hover>
        <img src="@/assets/images/flow-magic-secondary.svg" alt="" />
      </template>
    </roit-button>
    <roit-button class="mt-4">
      <template #regular>
        <img src="@/assets/images/file-edit-primary.svg" alt="" />
      </template>
      <template #hover>
        <img src="@/assets/images/file-edit-secondary.svg" alt="" />
      </template>
    </roit-button>
    <roit-button class="mt-4">
      <template #regular>
        <img src="@/assets/images/contract-primary.svg" alt="" />
      </template>
      <template #hover>
        <img src="@/assets/images/contract-secondary.svg" alt="" />
      </template>
    </roit-button>
    <v-spacer></v-spacer>
    <img src="@/assets/images/roit-r.svg" height="16px" alt="" />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import RoitButton from "./components/RoitButton.vue";
export default {
  components: { RoitButton },
  name: "sidebar",
  computed: {
    ...mapGetters({ open: "getOpenDrawer" }),
    displacement() {
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  --size: 84px;
  width: var(--size);
  background-color: white;
  padding: 16px 0;
  border-right: 1px solid var(--border);
  transform: translateX(calc(-1 * var(--size)));
  transition: 0.2s ease-in-out;
  &.open {
    transform: translateX(0);
  }
}
</style>