<template>
  <div class="album-acrd">
    <div class="img-wrap" @click="goAlbumDetail">
      <img v-lazy="$utils.getImgUrl(img, 260, 260)" />
      <PlayIcon :size="40" />
      <span class="msk"></span>
    </div>
    <div class="info">
      <p class="name" v-if="name">《{{ name }}》</p>
      <p class="author" v-if="publishTime">{{ $utils.formatDate(publishTime, 'yyyy-MM-dd') }}</p>
      <p class="author" v-if="author">{{ author }}</p>
    </div>
  </div>
</template>

<script>
import PlayIcon from "@/common/PlayIcon";
export default {
  name: "AlbumCard",
  props: ["id", "img", "name", "publishTime", "author"],
  components: {
    PlayIcon,
  },
  methods: {
    goAlbumDetail() {
      console.log("goAlbumDetail");
    },
  },
};
</script>

<style lang='scss' scoped>
.album-acrd {
  min-width: 140px;

  .img-wrap {
    cursor: pointer;
    position: relative;

    img {
      position: relative;
      display: block;
      width: 100%;
      border-radius: 2px;
      z-index: 1;
    }
    .msk {
      position: absolute;
      width: 165px;
      height: 130px;
      background-image: url("../assets/image/coverall.png");
      background-position: 0 -845px;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      overflow: hidden;
    }
    .play-icon {
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      .play-icon {
        opacity: 1;
      }
    }
  }
  .info {
    cursor: default;
    font-size: 13px;
    text-align: center;
    margin-top: 3px;
    .name {
      @include text-ellipsis;
    }
    .author {
      color: #727272;
      margin-top: 3px;
    }
  }
}
</style>