<template>
  <div class="detail-header">
    <div class="img">
      <img v-lazy="$utils.getImgUrl(playlist.img, 400)" />
    </div>
    <div class="content">
      <p class="title">{{ playlist.name}}</p>
      <div class="creator">
        <img v-lazy="$utils.getImgUrl(playlist.avatarUrl, 50)" />
        <span class="nickname">{{ playlist.nickname }}</span>
        <p class="create-time">{{$utils.formatDate(playlist.createTime, 'yyyy-MM-dd')}} 创建</p>
      </div>
      <div class="btn" @click="playAll">
        <el-button type="primary">
          <i class="el-icon-video-play el-icon--right"></i>播放全部
        </el-button>
      </div>
      <div class="desc-wrap">
        <p class="tag" v-if="playlist.tags">标签：{{playlist.tags}}</p>
        <p class="desc" v-if="playlist.description">简介：{{playlist.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "@/store/helper/music";
export default {
  name: "Header",
  props: {
    playlist: {
      type: Object,
      default: () => {},
    },
    songlists: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(["setPlayList", "setCurrentSong", "setShowAudio"]),
    playAll() {
      this.setShowAudio(true);
      this.setCurrentSong(this.songlists[0]);
      this.setPlayList(this.songlists);
    },
  },
};
</script>

<style lang='scss' scoped>
.detail-header {
  display: flex;
  padding-bottom: 36px;

  .img {
    width: 200px;
    height: 200px;
    margin-right: 24px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1;

    .title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
    .creator {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .nickname {
        margin-right: 8px;
      }

      .create-time {
        font-size: 12px;
      }
    }
    .btn {
      .el-button {
        padding: 8px 12px;
        text-align: center;
        .el-icon-video-play {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .desc-wrap {
      // font-family: ;
      font-weight: 400;
      font-size: 14px;
      color: #333;
      .tag {
        display: inline-block;
        margin-bottom: 5px;
      }

      .desc {
        font-family: "Georgia", Tahoma, Sans-Serif;
        display: -webkit-box;
        overflow: hidden;
        letter-spacing: 2px;
        line-height: 18px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>