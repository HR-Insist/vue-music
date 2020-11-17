<template>
  <div class="artist">
    <div class="main">
      <h2 class="name">{{artistName}}</h2>
      <img v-lazy="$utils.getImgUrl(artistImg, 640, 300)" />
      <el-tabs v-model="activeComponent" @tab-click="handleClick">
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.component"
          :label="tab.label"
          :name="tab.component"
        ></el-tab-pane>
      </el-tabs>
      <div class="content">
        <ArtistSongs v-if="$route.name === 'ArtistSongs'" :songs="songs" />
        <router-view v-else></router-view>
      </div>
    </div>
    <div class="aside"></div>
  </div>
</template>

<script>
const tabs = [
  { label: "热门作品", component: "ArtistSongs" },
  { label: "所有专辑", component: "ArtistAlbums" },
  { label: "相关MV", component: "ArtistMvs" },
  { label: "艺人介绍", component: "ArtistDesc" },
];
import { getArtists } from "@/api/artist";
import { createSong } from "@/utils/songs";
import ArtistSongs from "./ArtistSongs";
export default {
  name: "artistDetail",
  components: { ArtistSongs },
  created() {
    this.getSongs();
    this.artistId = this.$route.query.id;
    this.tabs = tabs;
  },
  data() {
    return {
      artistId: "",
      artistName: "",
      artistImg: "",
      songs: [],
      activeComponent: "",
    };
  },
  methods: {
    async getSongs() {
      const {
        artist: { name, picUrl },
        hotSongs,
      } = await getArtists(this.$route.query.id);
      this.artistName = name;
      this.artistImg = picUrl;
      this.songs = hotSongs.map((song) => {
        const {
          id,
          name,
          al: { id: albumId, name: albumName, picUrl: img },
          ar,
          mv,
          dt,
        } = song;
        return createSong({
          id,
          name,
          img,
          artists: ar,
          albumId,
          albumName,
          mvId: mv,
          duration: dt,
        });
      });
    },
    handleClick(tab) {
      this.$router.push({
        name: this.tabs[tab.index].component,
        query: {
          id: this.artistId,
        },
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        // console.log(newRoute);
        this.activeComponent = newRoute.name;
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.artist {
  max-width: 1050px;
  display: flex;
  margin: 0 auto;

  .main {
    width: 640px;

    .name {
      height: 34px;
      line-height: 24px;
      font-weight: normal;
      font-size: 24px;
      color: #333;
    }
    .el-tabs,
    .content {
      width: 640px;
    }
  }
  .aside {
    flex: 1;
  }
}
</style>
