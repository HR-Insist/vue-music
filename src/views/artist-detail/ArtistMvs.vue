<template>
  <div class="artist-mvs">
    <ul class="list-wrap">
      <li class="list-item" v-for="item in mvs" :key="item.id">
        <MVCard
          :id="item.id"
          :img="item.imgurl"
          :duration="item.duration"
          :playCount="item.playCount"
          :name="item.name"
          :author="item.artistName"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import MVCard from "@/common/MVCard";
import { getArtistsMvs } from "@/api/artist";
export default {
  name: "ArtistMvs",
  components: {
    MVCard,
  },
  created() {
    this.getMvs();
  },
  data() {
    return {
      hasMore: false,
      mvs: [],
      isLoading: false,
      limit: 30,
      currentPage: 1,
    };
  },
  mounted() {
    const main = document.querySelector(".el-main");
    main.addEventListener("scroll", this.getMoreMvs, false);
  },
  destroyed() {
    const main = document.querySelector(".el-main");
    main.removeEventListener("scroll", this.getMoreMvs, false);
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async getMvs() {
      const { hasMore, mvs } = await getArtistsMvs({
        id: this.$route.query.id,
        limit: this.limit,
        offset: this.offset,
      });
      this.hasMore = hasMore;
      this.mvs = this.mvs.concat(mvs);
      // this.isLoading = false;
    },
    getMoreMvs() {
      const main = document.querySelector(".el-main");
      if (
        main.scrollHeight - main.scrollTop - 100 <= window.innerHeight &&
        this.hasMore &&
        !this.isLoading
      ) {
        this.isLoading = true;
        this.currentPage++;
        this.getMvs().then(() => {
          this.isLoading = false;
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.artist-mvs {
  @include list(33.3%);
}
</style>