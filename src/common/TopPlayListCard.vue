<template>
  <div class="container" @click="handleClickCard">
    <div class="top-play-list-card">
      <div class="img">
        <img v-lazy="getImgUrl(img, 300)" />
      </div>
      <div class="content">
        <div class="tag">
          <span>精品歌单</span>
        </div>
        <p class="name">{{name}}</p>
        <p class="desc">{{desc}}</p>
      </div>
    </div>
    <div class="background" :style="{ backgroundImage: `url(${img})` }"></div>
    <div class="background-mask"></div>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils/common";
export default {
  name: "TopPlayListCard",
  props: ["id", "img", "name", "desc"],
  methods: {
    getImgUrl(url, w, h) {
      return getImgUrl(url, w, h);
    },
    handleClickCard() {
      this.$router.push(`/playlist/${this.id}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;

  .top-play-list-card {
    position: relative;
    display: flex;
    padding: 16px;
    z-index: 1;

    .img {
      margin-right: 8px;
      width: 150px;
      height: 150px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      .tag {
        width: 100px;
        text-align: center;
        padding: 4px 0;
        margin-bottom: 16px;
        color: #e7aa5a;
        border: 1px solid currentColor;
        border-radius: 4px;
      }
      .name {
        margin-bottom: 8px;
        font-size: 16px;
        color: white;
      }
      .desc {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .background,
  .background-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  .background {
    filter: blur(16px);
  }
  .background-mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>