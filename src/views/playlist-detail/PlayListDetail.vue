<template>
  <div class="playlist-detail">
    <Header :playlist="playlist" :songlists="songlists" />
    <SongTable :songs="songlists" />
  </div>
</template>

<script>
import Header from "./Header";
import SongTable from "@/common/SongTable";

import { getSongDetail } from "@/api/song";
import { getListDetail } from "@/api/playlist";
import { createSong } from "@/utils/songs";

export default {
  name: "PlayList",
  metaInfo() {
    return {
      title: this.playlist.name,
      titleTemplate: "%s | vue-music",
    };
  },
  components: {
    Header,
    SongTable,
  },
  data() {
    return {
      playlist: {},
      songlists: [],
    };
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.$route.params.id });
      // console.log(res);
      this.playlist = this.createPlaylist(playlist);
      this.getSongList(playlist);
    },
    async getSongList(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id);
      // console.log(trackIds.slice(0, 2));
      const { songs } = await getSongDetail(trackIds);
      // console.log(songs);
      this.songlists = songs.map(({ id, name, al, ar, mv, dt }) => {
        return createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          mvId: mv,
          albumName: al.name,
          img: al.picUrl,
        });
      });
    },
    createPlaylist(playlist) {
      const {
        id,
        coverImgUrl,
        name,
        createTime,
        description,
        tags,
        creator: { avatarUrl, nickname },
      } = playlist;
      return {
        id,
        name,
        img: coverImgUrl,
        createTime,
        description,
        tags: tags.join(" / "),
        avatarUrl,
        nickname,
      };
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.playlist-detail {
  padding: 36px;
}
</style>