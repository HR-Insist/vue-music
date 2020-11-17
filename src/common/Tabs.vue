<template>
  <ul :class="{[align] : true}" class="tabs">
    <li
      class="tab-item"
      v-for="(item, index) in normalizedTabs"
      :key="index"
      @click="handleChangeTab(index)"
      :class="getItemClass(item, index)"
    >
      <span class="title">{{item.title}}</span>
    </li>
    <li class="tab-item" @click="showMore" v-if="more">
      <i :class="[isShowMore ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    avtiveTabIndex: {
      type: Number,
      default: 0,
    },
    align: {
      type: String,
      default: "left",
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    // 不传的话对应大号字体 高亮加粗
    // small对应小号字体 高亮红色
    // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
    type: {
      type: String,
    },
    itemClass: {
      type: String,
    },
    activeItemClass: {
      type: String,
    },
    more: {
      type: Boolean,
      default: false,
    },
    isShowMore: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "avtiveTabIndex",
    event: "tabChange",
  },
  computed: {
    normalizedTabs() {
      return typeof this.tabs[0] === "string"
        ? this.tabs.map((tab) => ({ title: tab }))
        : this.tabs;
    },
  },
  methods: {
    handleChangeTab(index) {
      this.$emit("tabChange", index);
    },
    isAvtive(tab, index) {
      return index === this.avtiveTabIndex;
    },
    getItemClass(tab, index) {
      const className = [];
      if (this.type) {
        className.push(this.type);
      }
      if (this.itemClass) {
        className.push(this.itemClass);
      }
      if (this.isAvtive(tab, index)) {
        if (this.activeItemClass) {
          className.push(this.activeItemClass);
        }
        className.push("active");
      }
      return className.join(" ");
    },
    showMore() {
      // console.log("more");
      this.$emit("showMoreTab");
    },
  },
};
</script>

<style lang='scss' scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }
  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: #7f7f81;
    font-size: 15px;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: skyblue;
    }
    &.small {
      font-size: 13px;

      &.active {
        color: #d33a31;
      }
    }
    &.split {
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 15px;
      display: flex;
      align-items: center;

      &.active {
        color: #d33a31;
        background: #fdf6f5;
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 2px;
          height: 100%;
          background: rgba(231, 231, 231, 0.5);
          display: inline-block;
          vertical-align: middle;
          content: " ";
        }

        .title {
          // vertical-align: middle;
          text-align: center;
        }
      }
    }
    &:hover {
      color: #000;
    }
  }
}
</style>