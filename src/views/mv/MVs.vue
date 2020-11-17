<template>
  <div class="mvs" ref="mvs">
    <div class="tabs-wrap">
      <div class="tabs-item">
        <span class="tabs-type">地区：</span>
        <Tabs
          :tabs="areaTabs"
          type="split"
          v-model="activeAreaTabIndex"
          @tabChange="handleTabChange"
        />
      </div>
      <div class="tabs-item">
        <span class="tabs-type">类型：</span>
        <Tabs
          :tabs="typeTabs"
          type="split"
          v-model="activeTypeTabIndex"
          @tabChange="handleTabChange"
        />
      </div>
      <div class="tabs-item">
        <span class="tabs-type">排序：</span>
        <Tabs
          :tabs="sortTabs"
          type="split"
          v-model="activeSortTabIndex"
          @tabChange="handleTabChange"
        />
      </div>
    </div>
    <ul class="list-wrap">
      <li class="list-item" v-for="item in mvs" :key="item.id">
        <MVCard
          :author="item.artistName"
          :id="item.id"
          :img="item.cover"
          :name="item.name"
          :playCount="item.playCount"
        />
      </li>
    </ul>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      :hide-on-single-page="true"
      :total="total"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import Tabs from "@/common/Tabs";
import MVCard from "@/common/MVCard";

import { getAllMvs } from "@/api/mv";

import { scrollInto } from "@/utils/dom";

const areaTabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
const typeTabs = ["全部", "官方版", "原声", "现场版", "网易出品"];
const sortTabs = ["上升最快", "最热", "最新"];
const limit = 40;

export default {
  name: "MVs",
  metaInfo: {
    title: "最新MV，美丽动人",
    titleTemplate: "%s | vue-music",
  },
  components: {
    Tabs,
    MVCard,
  },
  data() {
    return {
      areaTabs: areaTabs,
      typeTabs: typeTabs,
      sortTabs: sortTabs,
      activeAreaTabIndex: 0,
      activeTypeTabIndex: 0,
      activeSortTabIndex: 0,
      total: 0,
      mvs: [],
      limit: limit,
      currentPage: 1,
    };
  },
  created() {
    this.getMvs();
  },
  methods: {
    async getMvs() {
      const res = await getAllMvs({
        limit: this.limit,
        offset: this.offset,
        ...this.params,
      });
      // console.log(res);
      if (res.count) {
        this.total = res.count;
      }
      this.mvs = res.data;
    },
    handleTabChange() {
      // console.log("tabchange");
      this.currentPage = 1;
      this.getMvs();
    },
    handleCurrentChange() {
      this.getMvs();
      scrollInto(this.$refs?.mvs);
    },
  },
  computed: {
    params() {
      return {
        area: areaTabs[this.activeAreaTabIndex],
        order: sortTabs[this.activeSortTabIndex],
        type: typeTabs[this.activeTypeTabIndex],
      };
    },
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
};
</script>

<style lang='scss' scoped>
.mvs {
  padding: 20px 0;
  max-width: 1050px;
  margin: 0 auto;
  .tabs-wrap {
    .tabs-item {
      display: flex;
      margin-bottom: 16px;
      align-items: center;

      .tabs-type {
        font-size: 12px;
      }
    }
  }
  @include list(25%);

  .el-pagination {
    float: right;
  }
}
</style>