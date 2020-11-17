<template>
  <div class="hot-singer" v-if="singers.length > 0">
    <div class="title-wrap">
      <Title>热门歌手</Title>
      <span class="more" @click="goMoreSinger">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </span>
    </div>
    <div class="list-wrap">
      <div class="list-item" v-for="item in singers" :key="item.id">
        <SingerCard :id="item.id" :img="item.picUrl" :name="item.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSinger } from "@/api/discovery";
import Title from "@/common/Title";
import SingerCard from "@/common/SingerCard";
export default {
  name: "HotSinger",
  components: {
    Title,
    SingerCard,
  },
  data() {
    return {
      singers: [],
    };
  },
  async created() {
    const { artists } = await getHotSinger({ limit: 10 });
    this.singers = artists;
  },
  methods: {
    goMoreSinger() {
      this.$router.push({
        name: "Singers",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.hot-singer {
  margin-bottom: 30px;
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .more {
      cursor: pointer;
    }
  }
  @include list(20%);
}
</style>