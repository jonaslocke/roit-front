<template>
  <div class="user-menu ml-3">
    <v-menu offset-y :close-on-content-click="false" nudge-bottom="4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <roit-avatar>
            <span class="grey--text avatar__text">{{ initials }}</span>
          </roit-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="pl-2 pr-2">
          <v-card
            width="300"
            elevation="0"
            class="pt-4 pb-4 d-flex align-center flex-column"
          >
            <div class="d-flex align-center flex-column">
              <roit-avatar :detachedBorder="8" :size="68">
                <span class="secondary--text avatar__text">
                  {{ initials }}
                </span>
              </roit-avatar>
              <div class="font-weight-bold secondary--text pt-2 pb-2">
                {{ user }}
              </div>
              <div class="user-menu__detail">ROIT</div>
              <div class="user-menu__detail mt-1">{{ email }}</div>
              <v-btn class="user-menu__btn mt-4" elevation="0" outlined>
                <span class="font-weight-bold secondary--text">
                  Gerenciar Perfil
                </span>
              </v-btn>
            </div>
          </v-card>
        </v-list-item>
        <v-divider class="ml-4 mr-4"></v-divider>
        <v-list-item class="pl-2 pr-2">
          <v-card
            width="300"
            elevation="0"
            class="pt-4 pb-4 d-flex align-center flex-column"
          >
            <v-btn class="user-menu__btn mt-4" elevation="0" outlined>
              <span class="font-weight-bold primary--text"> Sair </span>
            </v-btn>
          </v-card>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import RoitAvatar from "../../../RoitAvatar.vue";

export default {
  name: "UserMenu",
  components: { RoitAvatar },
  props: {
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "contact@roitbank.com",
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

<style lang="scss"  scoped>
.user-menu {
  &__detail {
    color: var(--gray-33);
    font-size: 14px;
  }
  &__btn {
    border-color: var(--border);
    text-transform: initial;
    letter-spacing: initial;
    padding: 0 52px !important;
  }
}
</style>