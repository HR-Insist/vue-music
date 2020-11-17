<template>
  <div class="artist-desc">
    <h2>简介</h2>
    <p>{{briefDesc}}</p>
    <div v-for="item in introduction" :key="item.ti">
      <h2>{{item.ti}}</h2>
      <p v-for="(content, index) in item.txt.split('\n')" :key="index">{{content}}</p>
    </div>
  </div>
</template>

<script>
import { getArtistsDesc } from "@/api/artist";
export default {
  name: "ArtistDesc",
  created() {
    this.getDesc();
  },
  data() {
    return {
      briefDesc: "",
      introduction: [],
    };
  },
  computed: {},
  methods: {
    async getDesc() {
      const { briefDesc, introduction } = await getArtistsDesc(
        this.$route.query.id
      );
      this.briefDesc = briefDesc;
      this.introduction = introduction;
    },
  },
};
</script>

<style lang='scss' scoped>
.artist-desc {
  h2 {
    margin: 20px 0 10px;
  }
  p {
    line-height: 25px;
    font-size: 12px;
    color: #666;
    text-indent: 2em;
  }
}
</style>