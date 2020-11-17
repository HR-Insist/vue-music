<template>
  <div class="singers">
    <div class="tabs-wrap">
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
        <span class="tabs-type">地区：</span>
        <Tabs
          :tabs="areaTabs"
          type="split"
          v-model="activeAreaTabIndex"
          @tabChange="handleTabChange"
        />
      </div>
    </div>
    <div class="list-wrap">
      <div class="list-item" v-for="item in artists" :key="item.id">
        <SingerCard :id="item.id" :img="item.picUrl" :name="item.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistList } from "@/api/artist";
import Tabs from "@/common/Tabs";
import SingerCard from "@/common/SingerCard";

const typeTabs = [
  { type: -1, title: "全部" },
  { type: 1, title: "男歌手" },
  { type: 2, title: "女歌手" },
  { type: 3, title: "乐队" },
];
const areaTabs = [
  { area: -1, title: "全部" },
  { area: 7, title: "华语" },
  { area: 96, title: "欧美" },
  { area: 8, title: "日本" },
  { area: 16, title: "韩国" },
  { area: 0, title: "其它" },
];
export default {
  name: "Singer",
  metaInfo: {
    title: "这里有你喜欢的爱豆",
    titleTemplate: "%s | vue-music",
  },
  components: {
    Tabs,
    SingerCard,
  },
  data() {
    return {
      typeTabs: typeTabs,
      areaTabs: areaTabs,
      activeAreaTabIndex: 0,
      activeTypeTabIndex: 0,
      limit: 30,
      currentPage: 1,
      artists: [],
      more: false,
      isLoading: false,
    };
  },
  created() {
    this.getArtistList();
  },
  mounted() {
    const main = document.querySelector(".el-main");
    main.addEventListener("scroll", this.getMoreAritsts, false);
  },
  destroyed() {
    const main = document.querySelector(".el-main");
    main.removeEventListener("scroll", this.getMoreAritsts, false);
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async getArtistList() {
      const { artists, more } = await getArtistList({
        limit: this.limit,
        offset: this.offset,
        type: this.typeTabs[this.activeTypeTabIndex].type,
        area: this.areaTabs[this.activeAreaTabIndex].area,
        initial: -1,
      });
      this.artists = this.artists.concat(artists);
      this.more = more;
      this.isLoading = false;
    },
    getMoreAritsts() {
      const main = document.querySelector(".el-main");
      if (
        main.scrollHeight - main.scrollTop - 100 <= window.innerHeight &&
        this.more &&
        !this.isLoading
      ) {
        this.isLoading = true;
        this.currentPage++;
        this.getArtistList();
      }
    },
    handleTabChange() {
      this.currentPage = 1;
      this.artists.length = 0;
      this.getArtistList();
    },
  },
};
</script>

<style lang='scss' scoped>
.singers {
  padding: 20px 0;
  max-width: 1050px;
  margin: 0 auto;

  .tabs-wrap {
    margin-bottom: 30px;
    .tabs-item {
      display: flex;
      margin-bottom: 16px;
      align-items: center;

      .tabs-type {
        font-size: 12px;
      }
    }
  }
  @include list(20%);
}
</style>