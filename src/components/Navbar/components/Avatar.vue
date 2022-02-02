<template>
  <div class="avatar ml-3">
    <v-menu offset-y :close-on-content-click="false" nudge-bottom="4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-avatar color="avatar__circle" size="36">
            <span class="grey--text avatar__text">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="pl-2 pr-2">
          <v-card width="300" elevation="0" class="pt-4 pb-4">
            <div class="d-flex justify-center">
              <div class="deatached-border">
                <v-avatar
                  color="avatar__circle avatar__circle--bigger"
                  size="68"
                >
                  <span class="secondary--text avatar__text">
                    {{ initials }}
                  </span>
                </v-avatar>
              </div>
            </div>
          </v-card>
        </v-list-item>
        <v-divider class="ml-4 mr-4"></v-divider>
        <v-list-item class="pl-2 pr-2">
          <v-card width="300" elevation="0">12</v-card>
        </v-list-item>
      </v-list>
    </v-menu>
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
    border: 2px solid var(--primary);
    &--bigger {
      z-index: 1;
      background-image: radial-gradient(#ffffff 0%, #f4f4f8 100%) !important;
      border: transparent !important;

      .avatar__text {
        font-size: 24px !important;
        font-weight: 600;
      }
    }
  }
  &__text {
    font-size: 16px;
  }
}
.deatached-border {
  --size: 68px;
  --gap-size: 8px;
  position: relative;
  width: calc(var(--size) + (2 * var(--gap-size)));
  height: calc(var(--size) + (2 * var(--gap-size)));
  display: flex;
  justify-content: center;
  align-items: center;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  &::before {
    width: calc(var(--size) + (2 * var(--gap-size)));
    height: calc(var(--size) + (2 * var(--gap-size)));
    background-color: #e4eaef;
  }
  &::after {
    width: calc(var(--size) + var(--gap-size));
    height: calc(var(--size) + var(--gap-size));
    background-color: white;
  }
}
</style>