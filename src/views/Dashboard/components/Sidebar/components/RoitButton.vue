<template>
  <div
    class="roit-button"
    :class="{ active }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="callback()"
  >
    <v-btn icon>
      <slot name="regular" v-if="isHover"></slot>
      <slot name="hover" v-if="!isHover"></slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "RoitButton",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    callback: {
      type: Function,
      default: () => console.log("callback activated"),
    },
  },
  data: () => {
    return {
      isHover: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.roit-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  width: 100%;
  &:hover {
    &::before {
      transform: translateX(0);
    }
  }
  &::before {
    --size: 4px;
    content: "";
    background-color: var(--primary);
    width: var(--size);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    transform: translateX(calc(-1 * var(--size)));
    transition: 0.2s ease-in;
  }
  &.active {
    &::before {
      $color: var(--primary);
      transform: translateX(0);
      background-color: darken($color: #e2b874, $amount: 20%);
    }
  }
}
</style>