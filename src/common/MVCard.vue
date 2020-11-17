<template>
  <div class="mv-card">
    <div class="img-wrap" @click="goMVDetail">
      <img v-lazy="$utils.getImgUrl(img, 500, 260)" />
      <PlayIcon :size="40" />
      <div class="play-count" v-if="playCount ">
        <i class="el-icon-video-play"></i>
        {{$utils.formatNumber(playCount)}}
      </div>
      <span class="duration" v-if="duration">{{ $utils.formatTime(duration / 1000) }}</span>
    </div>
    <div class="info">
      <p class="name" v-if="name">《{{ name }}》</p>
      <p class="author" v-if="author">{{ author }}</p>
    </div>
  </div>
</template>

<script>
import PlayIcon from "@/common/PlayIcon";
export default {
  name: "MVCard",
  components: {
    PlayIcon,
  },
  props: ["id", "img", "duration", "playCount", "name", "author"],
  methods: {
    goMVDetail() {
      if (this.id) {
        this.$router.push(`/mv-detail/${this.id}`);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.mv-card {
  min-width: 140px;

  .img-wrap {
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      border-radius: 4px;
    }
    .play-icon {
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      .play-icon {
        opacity: 1;
      }
    }
    .play-count {
      position: absolute;
      top: 2px;
      right: 5px;
      color: #fff;
      font-size: 14px;
    }
    .duration {
      position: absolute;
      bottom: 5px;
      right: 8px;
      color: #fff;
      font-size: 14px;
    }
  }
  .info {
    cursor: default;
    font-size: 13px;
    text-align: center;
    .name {
      @include text-ellipsis;
    }
    .author {
      color: #727272;
      margin-left: 10px;
    }
  }
}
</style>