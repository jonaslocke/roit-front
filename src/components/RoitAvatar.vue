<template>
  <div class="avatar" :style="`--size: ${size}px`">
    <div class="avatar__regular-border" v-if="!detachedBorder">
      <v-avatar color="avatar__circle" :size="size">
        <slot></slot>
      </v-avatar>
    </div>
    <div
      class="avatar__detached-border"
      :style="`--detached-border: ${detachedBorder}px`"
      v-else
    >
      <v-avatar color="avatar__circle avatar__circle--bigger" :size="size">
        <slot></slot>
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoitAvatar",
  props: {
    detachedBorder: { type: Number },
    size: { type: Number, default: 36 },
  },
};
</script>

<style lang="scss">
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
  &__detached-border {
    position: relative;
    width: calc(var(--size) + (2 * var(--detached-border)));
    height: calc(var(--size) + (2 * var(--detached-border)));
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
      width: calc(var(--size) + (2 * var(--detached-border)));
      height: calc(var(--size) + (2 * var(--detached-border)));
      background-color: #e4eaef;
    }
    &::after {
      width: calc(var(--size) + var(--detached-border));
      height: calc(var(--size) + var(--detached-border));
      background-color: white;
    }
  }
}
</style>