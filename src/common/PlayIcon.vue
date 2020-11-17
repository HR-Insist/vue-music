<template>
  <span class="play-icon" :style="style">
    <i class="iconfont icon-bofangliang" :style="fontSize"></i>
  </span>
</template>

<script>
export default {
  name: "PlayIcon",
  props: {
    size: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    style() {
      return { width: `${this.size}px`, height: `${this.size}px` };
    },
    fontSize() {
      return { fontSize: Math.ceil(this.size * 0.7) + "px" };
    },
  },
};
</script>

<style lang='scss' scoped>
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  i {
    color: #d33a31;
  }
}
</style>