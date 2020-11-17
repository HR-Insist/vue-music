<template>
  <el-table
    :data="songs"
    stripe
    style="width: 100%"
    @row-click="handleRowClick"
    :row-class-name="activeSong"
  >
    <el-table-column type="index"></el-table-column>
    <el-table-column width="320px">
      <template slot-scope="scope">
        <div class="name">
          <span>{{scope.row.name}}</span>
          <i
            class="iconfont icon-mv"
            v-if="scope.row.mvId !== 0"
            @click.stop="handleClickMV(scope.row.mvId)"
          ></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="100px">
      <template slot-scope="scope">
        <span>{{$utils.formatTime(scope.row.duration / 1000)}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="albumName"></el-table-column>
  </el-table>
</template>

<script>
import { mapMutations } from "@/store/helper/music";
export default {
  name: "ArtistSongs",
  props: {
    songs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapMutations([
      "setCurrentSong",
      "setPlayHistory",
      "setPlayList",
      "setShowAudio",
    ]),
    activeSong({ row }) {
      // console.log(this.$store);
      return row.id === this.$store.state.music.currentSong.id
        ? "current-song"
        : "";
    },
    handleRowClick(row) {
      this.setCurrentSong(row);
      this.setPlayList(this.songs);
      this.setPlayHistory(row);
      this.setShowAudio(true);
    },
    handleClickMV(id) {
      if (id) {
        this.$router.push(`/mv-detail/${id}`);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.el-table {
  font-size: 13px;
  // margin-top: -20px;
  .icon-mv {
    color: #d33a31;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>