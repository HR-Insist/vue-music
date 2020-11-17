<template>
  <div class="search">
    <div class="search-input">
      <el-input
        placeholder="请输入内容"
        v-model="keywords"
        class="input-with-select"
        clearable
        @change="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <el-tabs v-model="activeComponent" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.component"
        :label="tab.label"
        :name="tab.component"
      ></el-tab-pane>
    </el-tabs>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const tabs = [
  { label: "单曲", component: "SearchSongs" },
  { label: "专辑", component: "SearchAlbums" },
  { label: "歌手", component: "SearchSingers" },
  { label: "歌单", component: "SearchPlaylists" },
  { label: "用户", component: "SearchUsers" },
  { label: "MV", component: "SearchMVs" },
  { label: "歌词", component: "SearchLyrics" },
  { label: "电台", component: "SearchPrograms" },
];
export default {
  name: "Search",
  created() {
    this.tabs = tabs;
    this.keywords = this.$route.query.keywords;
    this.activeComponent = this.$route.name;
  },
  data() {
    return {
      keywords: "",
      activeComponent: "SearchSongs",
    };
  },
  methods: {
    handleClick(tab) {
      // console.log(this.tabs[tab.index]);
      this.$router.push({
        name: this.tabs[tab.index].component,
        query: { keywords: this.keywords },
      });
    },
    handleSearch() {
      this.keywords = this.keywords.trim();
      if (this.keywords) {
        this.$router.push({
          name: this.activeComponent,
          query: { keywords: this.keywords },
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.search {
  max-width: 1050px;
  margin: 0 auto;

  .search-input {
    width: 600px;
    margin: 25px auto;
  }
}
</style>