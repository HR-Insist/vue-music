<template>
  <div class="singer-card">
    <div class="img-wrap" @click="goSinger(id)">
      <img v-lazy="$utils.getImgUrl(img, 500)" />
      <PlayIcon :size="40" />
    </div>
    <p class="name">{{name}}</p>
  </div>
</template>

<script>
import PlayIcon from "@/common/PlayIcon";
export default {
  name: "SingerCard",
  props: ["id", "img", "name"],
  components: {
    PlayIcon,
  },
  methods: {
    goSinger(id) {
      this.$router.push({
        name: "ArtistSongs",
        query: { id },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.singer-card {
  min-width: 120px;
  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      height: 100%;
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
  }
  .name {
    font-size: 16px;
    color: #272626;
    text-align: center;
  }
}
</style>