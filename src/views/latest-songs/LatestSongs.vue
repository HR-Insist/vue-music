<template>
  <div class="songs">
    <Tabs :tabs="tabs" align="right" type="small" v-model="avtiveTabIndex" @tabChange="getSongs" />
    <SongTable :songs="songs" />
  </div>
</template>

<script>
import Tabs from "@/common/Tabs";
import SongTable from "@/common/SongTable";
import { getTopSongs } from "@/api/song";
import { createSong } from "@/utils/songs";

export default {
  name: "LatestSongs",
  metaInfo: {
    title: "最新音乐",
    titleTemplate: "%s | vue-music",
  },
  components: {
    Tabs,
    SongTable,
  },
  data() {
    return {
      tabs: [
        { title: "全部", type: 0 },
        { title: "华语", type: 7 },
        { title: "欧美", type: 96 },
        { title: "日本", type: 8 },
        { title: "韩国", type: 16 },
      ],
      avtiveTabIndex: 0,
      songs: [],
    };
  },
  created() {
    this.getSongs(this.avtiveTabIndex);
  },

  methods: {
    async getSongs() {
      // this.avtiveTabIndex = index;
      const { data } = await getTopSongs(this.tabs[this.avtiveTabIndex].type);
      // console.log(data);
      this.songs = data.map((song) => {
        const {
          id,
          name,
          artists,
          duration,
          mvid,
          album: { picUrl, name: albumName },
        } = song;
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img: picUrl,
          mvId: mvid,
        });
      });
      // console.log(data[0]);
    },
  },
};
</script>

<style scoped lang='scss'>
.songs {
  padding: 18px 0;
  max-width: 1000px;
  margin: 0 auto;
}
</style>