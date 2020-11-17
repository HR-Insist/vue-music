<template>
  <div class="search-songs" ref="searchSongsRef">
    <SongTable :songs="songs" />
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      :hide-on-single-page="true"
      :total="songCount"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
import { createSong } from "@/utils/songs";
import { scrollInto } from "@/utils/dom";
import SongTable from "@/common/SongTable";

export default {
  name: "SearchSongs",
  components: {
    SongTable,
  },
  data() {
    return {
      songs: [],
      songCount: 0,
      limit: 30,
      currentPage: 1,
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async getSongs() {
      const {
        result: { songs, songCount },
      } = await getSearch({
        keywords: this.$route.query.keywords,
        limit: this.limit,
        offset: this.offset,
      });
      // console.log(songs);
      this.songs = songs.map((song) => {
        const { id, mvid, name, alias, artists, duration, album } = song;
        return createSong({
          id,
          name,
          alias,
          artists,
          duration,
          mvId: mvid,
          albumName: album.name,
          albumId: album.id,
        });
      });
      this.songCount = songCount;
    },
    handleCurrentChange() {
      this.getSongs();
      this.$nextTick(() => {
        scrollInto(this.$refs?.searchSongsRef);
      });
    },
  },
  watch: {
    "$route.query.keywords": {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.getSongs();
      },
    },
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>