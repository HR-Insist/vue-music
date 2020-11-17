<template>
  <div class="search-mvs" ref="SearchMvsRef">
    <ul class="list-wrap">
      <li class="list-item" v-for="item in mvlists" :key="item.id">
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
import MVCard from "@/common/MVCard";
import { getSearch } from "@/api/search";
import { scrollInto } from "@/utils/dom";
export default {
  name: "SearchMVs",
  components: {
    MVCard,
  },
  data() {
    return {
      mvlists: [],
      total: 0,
      limit: 40,
      currentPage: 1,
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async getMvs() {
      const {
        result: { mvCount, mvs },
      } = await getSearch({
        keywords: this.$route.query.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1004,
      });
      this.mvlists = mvs;
      this.total = mvCount;
    },
    handleCurrentChange() {
      this.getMvs();
      scrollInto(this.$refs?.SearchMvsRef);
    },
  },
  watch: {
    "$route.query.keywords": {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.getMvs();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.search-mvs {
  max-width: 1050px;
  margin: auto;

  @include list(25%);
  .el-pagination {
    float: right;
  }
}
</style>