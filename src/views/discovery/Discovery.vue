<template>
  <div class="discovery">
    <div class="discovery-content" ref="discoveryRef">
      <Banner />
      <HotSinger />
      <RecommendSongs />
      <RecommendMVs />
    </div>
  </div>
</template>

<script>
import Banner from "./Banner";
import HotSinger from "./HotSinger";
import RecommendSongs from "./RecommendSongs";
import RecommendMVs from "./RecommendMVs";
export default {
  name: "Discovery",
  metaInfo: {
    title: "发现好音乐",
    titleTemplate: "%s | vue-music",
  },
  components: {
    Banner,
    HotSinger,
    RecommendSongs,
    RecommendMVs,
  },
  // activated() {
  //   this.$nextTick(() => {
  //     this.$refs.discoveryRef.scrollTo(0, 200);
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   // console.log(document.querySelector(".discovery").scrollTop);
  //   next();
  // },
};
</script>

<style scoped>
.discovery {
  padding: 18px 0;
  max-width: 1000px;
  margin: 0 auto;
}
</style>