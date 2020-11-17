<template>
  <div class="playlist" v-if="isPlaylistShow">
    <div class="header">
      <span :class="{active: activeTab}" @click="chooseList">播放列表</span>
      <span :class="{active: !activeTab}" @click="chooseHistory">历史记录</span>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      @row-click="handleRowClick"
      :row-class-name="activeSong"
    >
      <el-table-column prop="name" label="音乐" width="150"></el-table-column>
      <el-table-column prop="artistsText" label="歌手" width="150"></el-table-column>
      <el-table-column prop="durationSecond" label="时长" :formatter="formatTime"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlayList",
  computed: {
    ...mapState("music", ["playlist", "isPlaylistShow", "playHistory"]),
    list() {
      return this.activeTab ? this.playlist : this.playHistory;
    },
  },
  data() {
    return {
      // true 代表播放记录，false 代表历史记录
      activeTab: true,
    };
  },
  methods: {
    chooseList() {
      this.activeTab = true;
    },
    chooseHistory() {
      this.activeTab = false;
    },
    formatTime(row, column, interval) {
      // console.log(row, column, interval);
      interval = parseInt(interval) | 0;
      const minute = (interval / 60) | 0;
      const second = interval % 60;
      return ("0" + minute).slice(-2) + ":" + ("0" + second).slice(-2);
    },
    handleRowClick(row) {
      // console.log(row, event);
      this.$store.commit("music/setCurrentSong", row);
      this.$store.commit("music/setPlayHistory", row);
    },
    activeSong({ row }) {
      // console.log(this.$store);
      return row.id === this.$store.state.music.currentSong.id
        ? "active-song"
        : "";
    },
  },
};
</script>

<style lang='scss' scoped>
.playlist {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 60px;
  width: 400px;
  background-color: #fff;
  box-shadow: 0 0 3px #ccc;
  z-index: 99;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 0 20px;
    border-bottom: 1px solid #f2f2f1;
    justify-content: space-around;
    font-size: 15px;
    font-weight: normal;

    span {
      cursor: pointer;
      color: #a8a7a7;
      &:hover {
        color: #000;
      }
      &.active {
        color: #000;
      }
    }
  }
  .el-table {
    font-size: 12px;
    overflow-y: auto;
  }
}
</style>