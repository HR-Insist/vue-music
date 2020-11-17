<template>
  <div class="scroller" ref="scrollerRef">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

const defaultOptions = {
  mouseWheel: true,
  scrollY: true,
  scrollbar: true,
  probeType: 3,
};
export default {
  name: "Scroller",
  props: {
    data: {
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      scroller: null,
    };
  },
  methods: {
    getScroller() {
      return this.scroller;
    },
    refresh() {
      this.scroller?.refresh();
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroller) {
            this.scroller = new BScroll(
              this.$refs.scrollerRef,
              Object.assign({}, defaultOptions, this.options)
            );
            this.$emit("init", this.scroller);
          } else {
            this.scroller && this.scroller.refresh();
          }
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.scroller {
  position: relative;
  overflow: hidden;

  .content {
    width: 100%;
    overflow-y: auto;
  }
  .bscroll-indicator {
    border: none !important;
    background: var(--scrollbar-color) !important;
  }
}
</style>