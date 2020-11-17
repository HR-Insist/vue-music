<template>
  <div class="play-list-card" @click="handleClick">
    <div class="img">
      <img v-lazy="$utils.getImgUrl(img, 300)" />
      <div class="play-count" v-if="playCount">
        <i class="iconfont icon-eye"></i>
        <span class="text">{{playCount | formatNumber}}</span>
      </div>
      <div class="play-icon">
        <i class="iconfont icon-bofangliang"></i>
      </div>
    </div>
    <p class="name">{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "PlayListCard",
  props: ["id", "img", "name", "playCount"],
  methods: {
    handleClick() {
      // console.log("click");
      this.$router.push(`/playlist/${this.id}`);
    },
  },
  filters: {
    formatNumber(num) {
      return num > 10000 ? Math.round(num / 10000) + "万" : num;
    },
  },
};
</script>

<style lang='scss' scoped>
.play-list-card {
  position: relative;
  cursor: pointer;

  .img {
    position: relative;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;

    img {
      width: 100%;
      height: 100%;
    }
    .play-count {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: all 0.3s;
      text-align: center;
      color: #fff;
      i {
        font-size: 15px;
      }
      .text {
        color: #fff;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .play-icon {
      position: absolute;
      bottom: 5px;
      right: 5px;
      background-color: rgba(225, 223, 223, 0.5);
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s;
      i {
        color: #d33a31;
        font-size: 30px;
      }
    }
    &:hover {
      .play-count {
        transform: translateY(0);
      }
      .play-icon {
        opacity: 1;
      }
    }
  }
  .name {
    @include text-ellipsis;
    font-size: 12px;
  }
}
</style>