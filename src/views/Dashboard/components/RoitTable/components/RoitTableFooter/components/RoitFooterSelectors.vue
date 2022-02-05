<template>
  <div
    class="footer-selectors"
    :class="{
      cup: !active,
      disabled: active,
      secondary: active,
      'white--text': active,
    }"
    :style="`--bc-color: ${color}; --size: ${size}px`"
    @click="callback ? callback() : null"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FooterSelectors",
  props: {
    size: {
      type: Number,
      default: 28,
    },
    color: {
      type: String,
      default: "#F2F3F5",
    },
    callback: {
      type: Function,
    },
    active: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-selectors {
  width: var(--size);
  height: var(--size);
  background-color: var(--bc-color);
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 13px;
  &.disabled {
    pointer-events: none;
    opacity: 0.8;
  }
}
</style>