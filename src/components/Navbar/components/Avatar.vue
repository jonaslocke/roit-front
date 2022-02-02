<template>
  <div class="avatar ml-4">
    <v-avatar color="avatar__circle" size="36">
      <span class="grey--text avatar__text">{{ initials }}</span>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    user: {
      type: String,
      required: true,
    },
  },

  computed: {
    initials() {
      const userNameArray = this.user.toUpperCase().split(" ");
      return userNameArray.length > 1
        ? `${userNameArray[0][0]}${userNameArray[1][0]}`
        : `${userNameArray[0][0]}`;
    },
  },
};
</script>

<style lang="scss" >
.avatar {
  &__circle {
    background-color: white !important;
    border: 2px solid #e2b874;
  }
  &__text {
    font-size: 16px;
  }
}
</style>