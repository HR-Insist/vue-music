<template>
  <p class="title">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: "Title",
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}
</style>