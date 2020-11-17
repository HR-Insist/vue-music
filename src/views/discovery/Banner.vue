<template>
  <el-carousel :interval="4000" type="card" height="220px" trigger="click">
    <el-carousel-item v-for="item in banners" :key="item.scm">
      <img v-lazy="item.imageUrl" class="img" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from "@/api/discovery";

export default {
  name: "Banner",
  data() {
    return {
      banners: [],
    };
  },
  async created() {
    const { banners } = await getBanner();
    // console.log(res);
    this.banners = banners;
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>