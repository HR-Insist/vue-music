<template>
  <div class="search-playlists" ref="searchPlaylistsRef">
    <div class="list-wrap">
      <div class="list-item" v-for="item in playLists" :key="item.id">
        <PlayListCard
          :id="item.id"
          :img="item.coverImgUrl"
          :name="item.name"
          :play-count="item.playCount"
        />
      </div>
    </div>
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
import { getSearch } from "@/api/search";
import { scrollInto } from "@/utils/dom";
import PlayListCard from "@/common/PlayListCard";
export default {
  name: "SearchPlaylists",
  components: {
    PlayListCard,
  },
  data() {
    return {
      playLists: [],
      total: 0,
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
    async getPlaylist() {
      const {
        result: { playlists, playlistCount },
      } = await getSearch({
        keywords: this.$route.query.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1000,
      });
      this.playLists = playlists;
      this.total = playlistCount;
    },
    handleCurrentChange() {
      this.getPlaylist();
      this.$nextTick(() => {
        scrollInto(this.$refs?.searchPlaylistsRef);
      });
    },
  },
  watch: {
    "$route.query.keywords": {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.getPlaylist();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.search-playlists {
  max-width: 1050px;
  margin: auto;

  @include list(20%);
  .el-pagination {
    margin-top: 30px;
    float: right;
  }
}
</style>