<template>
  <div class="mvs" v-if="mvs.length > 0">
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li class="list-item" v-for="item in mvs" :key="item.id">
        <MVCard
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :author="item.artistName"
          :playCount="item.playCount"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getPersonalizedMv } from "@/api/discovery";
import Title from "@/common/Title";
import MVCard from "@/common/MVCard";

export default {
  name: "MVs",
  components: {
    Title,
    MVCard,
  },
  data() {
    return {
      mvs: [],
    };
  },
  async created() {
    const { result } = await getPersonalizedMv();
    // console.log(result);
    this.mvs = result;
  },
  methods: {
    goMVDetail(id) {
      // console.log("goMv");
      if (id) {
        this.$router.push(`/mv-detail/${id}`);
      }
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
.mvs {
  @include list(25%);
}
</style>