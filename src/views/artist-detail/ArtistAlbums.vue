<template>
  <div class="artist-albums" ref="artistAlbumRef">
    <div class="list-wrap">
      <div class="list-item" v-for="item in albums" :key="item.id">
        <AlbumCard
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :publishTime="item.publishTime"
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
import { getArtistsAlbums } from "@/api/artist";
import AlbumCard from "@/common/AlbumCard";
import { scrollInto } from "@/utils/dom";
export default {
  name: "ArtistAlbums",
  components: {
    AlbumCard,
  },
  created() {
    this.getAblums();
  },
  data() {
    return {
      albums: [],
      limit: 16,
      total: 0,
      currentPage: 1,
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async getAblums() {
      const {
        artist: { albumSize },
        hotAlbums,
      } = await getArtistsAlbums({
        id: this.$route.query.id,
        limit: this.limit,
        offset: this.offset,
      });
      this.total = albumSize;
      this.albums = hotAlbums;
    },
    handleCurrentChange() {
      this.getAblums();
      scrollInto(this.$refs?.artistAlbumRef);
    },
  },
};
</script>

<style lang='scss' scoped>
.artist-albums {
  @include list(25%);
  .el-pagination {
    text-align: center;
  }
}
</style>