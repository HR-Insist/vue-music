<template>
  <el-table
    :data="songs"
    style="width: 100%"
    :header-row-class-name="headerRowClassName"
    :row-class-name="activeSong"
    @row-click="handleRowClick"
  >
    <el-table-column type="index"></el-table-column>
    <el-table-column width="100px">
      <template slot-scope="scope">
        <div class="img" v-if="scope.row.img">
          <img v-lazy="$utils.getImgUrl(scope.row.img, 64)" />
          <div class="play-icon">
            <i class="iconfont icon-bofangliang"></i>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="音乐">
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
    <el-table-column prop="artistsText" label="歌手"></el-table-column>
    <el-table-column prop="albumName" label="专辑"></el-table-column>
    <el-table-column prop="durationSecond" label="时长" :formatter="formatTime"></el-table-column>
  </el-table>
</template>

<script>
import { mapMutations } from "@/store/helper/music";

export default {
  name: "SongTable",
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
    headerRowClassName: {
      type: String,
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
    formatTime(row, column, interval) {
      // console.log(row, column, interval);
      interval = parseInt(interval) | 0;
      const minute = (interval / 60) | 0;
      const second = interval % 60;
      return ("0" + minute).slice(-2) + ":" + ("0" + second).slice(-2);
    },
  },
};
</script>

<style scope lang='scss'>
.el-table {
  font-size: 14px;

  .img {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(225, 223, 223, 0.5);
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s;
      i {
        color: #d33a31;
        font-size: 30px;
      }
    }
    &:hover {
      .play-icon {
        opacity: 1;
      }
    }
  }
  .icon-mv {
    color: #d33a31;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>