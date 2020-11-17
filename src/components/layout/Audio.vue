<template>
  <div class="audio" id="audio" v-show="isShowAudio">
    <div class="song">
      <div class="img">
        <div class="mask"></div>
        <img v-lazy="currentSong.img" />
      </div>
      <div class="content">
        <div class="artistsInfo">
          <p class="name">{{ currentSong.name }}</p>
          <p class="split">-</p>
          <p class="artists">{{ currentSong.artistsText }}</p>
        </div>
        <div class="time">
          <span class="played-time">{{currentTime | formatTime}}</span>
          <span class="split">/</span>
          <span class="total-time">{{currentSong.durationSecond | formatTime}}</span>
        </div>
      </div>
    </div>
    <div class="control">
      <el-tooltip class="prev" effect="dark" content="上一首" placement="left" :enterable="false">
        <i class="el-icon-d-arrow-left" @click="prevSong"></i>
      </el-tooltip>

      <i
        class="play"
        :class="[playing ? 'el-icon-video-pause' : 'el-icon-video-play']"
        @click="playOrPause"
      ></i>

      <el-tooltip class="next" effect="dark" content="下一首" placement="right" :enterable="false">
        <i class="el-icon-d-arrow-right" @click="nextSong"></i>
      </el-tooltip>
    </div>
    <div class="utils">
      <div class="lyric" @click="handleShowLyric">
        <el-tooltip
          effect="light"
          :hide-after="1500"
          content="歌词"
          placement="top"
          :enterable="false"
        >
          <i class="iconfont icon-geciweidianji"></i>
        </el-tooltip>
      </div>
      <div class="volume-item">
        <el-tooltip effect="light" content="列表" placement="top" :enterable="false">
          <i class="iconfont icon-gedan" @click="handleShowPlayList"></i>
        </el-tooltip>

        <i class="iconfont" :class="[isMute ? 'icon-jingyin' : 'icon-laba']" @click="handleMute"></i>
        <el-slider v-model="volume" @change="changeVolume" :format-tooltip="volumeFormat"></el-slider>
      </div>
    </div>
    <div class="progress" v-if="haveCurrentSong">
      <el-slider v-model="progerss" @change="changeCurrentTime" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <audio
      autoplay
      ref="audio"
      :src="currentSong.url"
      @play="play"
      @pause="pause"
      @ended="nextSong"
      @timeupdate="onTimeUpdate"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "@/store/helper/music";
import { checkMusic } from "@/api/song";
export default {
  name: "Audio",
  computed: {
    ...mapState([
      "currentSong",
      "currentTime",
      "playing",
      "isPlaylistShow",
      "isShowAudio",
      "isPlayerShow",
    ]),
    ...mapGetters(["getNextSong", "getPrevSong"]),
    haveCurrentSong() {
      return (
        this.currentSong?.id !== undefined && this.currentSong?.id !== null
      );
    },
  },
  data() {
    return {
      // 音量大小
      volume: 50,
      // 进度条进度
      progerss: 0,
      // 是否静音
      isMute: false,
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "setCurrentSong",
      "setPlayHistory",
      "setPlaylistShow",
      "setPlayingState",
      "setPlayerShow",
    ]),
    prevSong() {
      this.setCurrentSong(this.getPrevSong);
      this.setPlayHistory(this.currentSong);
    },
    nextSong() {
      this.setCurrentSong(this.getNextSong);
      this.setPlayHistory(this.currentSong);
    },
    handleShowPlayList() {
      this.setPlaylistShow(!this.isPlaylistShow);
    },
    handleMute() {
      this.isMute = !this.isMute;
      if (this.isMute) {
        this.$refs.audio.muted = true;
      } else {
        this.$refs.audio.muted = false;
      }
    },
    playOrPause() {
      if (this.currentSong.id) {
        return this.playing ? this.pause() : this.play();
      }
    },
    play() {
      this.setPlayingState(true);
    },
    pause() {
      this.setPlayingState(false);
    },
    changeCurrentTime(value) {
      console.log(value);
      this.$refs.audio.currentTime = parseInt(
        (value / 100) * this.currentSong.durationSecond
      );
    },
    onTimeUpdate(res) {
      this.setCurrentTime(res.target.currentTime);
      this.progerss =
        (this.currentTime / this.currentSong.durationSecond) * 100;
    },
    formatTooltip() {
      return this.$options.filters["formatTime"](this.currentTime);
    },
    changeVolume(value) {
      this.$refs.audio.volume = value / 100;
      if (value === 0) {
        this.isMute = true;
      } else {
        this.isMute = false;
      }
    },
    volumeFormat(value) {
      return value + "%";
    },
    handleShowLyric() {
      this.setPlayerShow(!this.isPlayerShow);
    },
    async checkMusic(newSong) {
      const { success } = await checkMusic(newSong.id);
      return success;
    },
  },
  filters: {
    formatTime(interval) {
      interval = parseInt(interval) | 0;
      const minute = (interval / 60) | 0;
      const second = interval % 60;
      return ("0" + minute).slice(-2) + ":" + ("0" + second).slice(-2);
    },
  },
  watch: {
    playing: {
      handler() {
        if (!this.playing) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
      },
    },
    currentSong: {
      handler(newSong) {
        const res = this.checkMusic(newSong);
        if (!res) {
          setTimeout(() => {
            this.nextSong();
          }, 2000);
        }
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.audio {
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 8px 16px;
  padding-right: 24px;
  background-color: #fff;
  z-index: 100;
  .song {
    display: flex;
    flex: 1;
    overflow: hidden;

    .img {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      width: 40px;
      height: 40px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .artistsInfo {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: #333;
          @include text-ellipsis;
        }

        .split {
          font-size: 10px;
          margin: 0 4px;
        }

        .artists {
          font-size: 10px;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: 10px;
        color: #5c5c5c;

        .split {
          margin: 0 4px;
        }
      }
    }
  }
  .control {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d33a31;

    .prev,
    .next {
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
    }
    .play {
      font-size: 40px;
      font-weight: 600;
      margin: 0 15px;
      cursor: pointer;
    }
  }
  .utils {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .lyric {
      margin-right: 20px;
      cursor: pointer;
      .iconfont {
        font-size: 21px;
      }
    }
    .volume-item {
      width: 50%;
      align-items: center;
      display: flex;
      .iconfont {
        width: 20px;
        font-size: 20px;
        cursor: pointer;
        margin-right: 5px;
      }
      .icon-gedan {
        font-size: 21px;
        margin-right: 20px;
        // font-weight: 600;
      }
      .el-slider {
        flex: 1;
      }
    }
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  audio {
    display: none;
  }
}
</style>