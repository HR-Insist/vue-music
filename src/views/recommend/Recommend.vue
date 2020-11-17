<template>
  <div class="recommend" ref="playlists">
    <template v-if="topPlayList.id">
      <TopPlayListCard
        :desc="topPlayList.desc"
        :id="topPlayList.id"
        :img="topPlayList.img"
        :name="topPlayList.name"
      />
    </template>
    <Tabs
      :tabs="MoreTabs"
      align="right"
      type="small"
      :more="true"
      :isShowMore="isShowMore"
      @tabChange="handleTabChange"
      @showMoreTab="showMoreTab"
      v-model="activeTabIndex"
    />
    <div class="list-wrap">
      <div class="list-item" v-for="item in playLists" :key="item.id">
        <PlayListCard :id="item.id" :img="item.img" :name="item.name" :play-count="item.playCount" />
      </div>
    </div>
    <template v-if="total > PAGE_SIZE">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        @current-change="handlePageChange"
        class="pagination"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import { getPlaylists, getTopPlaylists, getCatList } from "@/api/playlist";
import { scrollInto } from "@/utils/dom";
import Tabs from "@/common/Tabs";
import TopPlayListCard from "@/common/TopPlayListCard";
import PlayListCard from "@/common/PlayListCard";

const PAGE_SIZE = 50;

export default {
  name: "Recommend",
  metaInfo: {
    title: "推荐歌单，你值得拥有",
    titleTemplate: "%s | vue-music",
  },
  components: {
    Tabs,
    TopPlayListCard,
    PlayListCard,
  },
  data() {
    return {
      tabs: [],
      // 当前选择tab的位置
      activeTabIndex: 0,
      topPlayList: {},
      playLists: [],
      // 当前是第几页
      currentPage: 1,
      // 歌单总数
      total: 0,
      isShowMore: false,
    };
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE;
    this.getTopPlayList();
    this.getPlayList();
    this.getCatList();
  },
  computed: {
    MoreTabs() {
      return this.isShowMore ? this.tabs : this.tabs.slice(0, 14);
    },
  },
  methods: {
    async getTopPlayList() {
      const { playlists } = await getTopPlaylists({
        limit: 1,
        cat: this.tabs[this.activeTabIndex],
      });
      this.topPlayList = playlists.length
        ? this.createTopPlayList(playlists[0])
        : {};
    },
    async getPlayList() {
      const { playlists, total } = await getPlaylists({
        limit: PAGE_SIZE,
        offset: (this.currentPage - 1) * PAGE_SIZE,
        cat: this.tabs[this.activeTabIndex],
      });
      this.playLists = this.createPlayLists(playlists);
      this.total = total;
    },
    async getCatList() {
      const { sub } = await getCatList();
      this.tabs = sub.map((item) => item.name);
      this.tabs.unshift("全部");
    },
    createPlayLists(playlists) {
      return playlists.map((item) => {
        const { id, name, playCount, coverImgUrl } = item;
        return {
          id,
          name,
          playCount,
          img: coverImgUrl,
        };
      });
    },
    createTopPlayList(playlist) {
      const { id, name, description, coverImgUrl } = playlist;
      return {
        id,
        name,
        desc: description,
        img: coverImgUrl,
      };
    },
    handleTabChange() {
      this.getTopPlayList();
      this.getPlayList();
    },
    showMoreTab() {
      this.isShowMore = !this.isShowMore;
    },
    handlePageChange() {
      // console.log("change");
      this.getPlayList();
      scrollInto(this.$refs.playlists);
    },
  },
};
</script>

<style scoped lang='scss'>
.recommend {
  max-width: 1050px;
  margin: 0 auto;
  .more {
  }
  @include list(20%);
  .pagination {
    float: right;
  }
}
</style>