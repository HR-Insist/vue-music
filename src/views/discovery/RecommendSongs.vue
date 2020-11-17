<template>
  <div class="RecSongs" v-if="songs.length > 0">
    <Title>推荐音乐</Title>
    <div class="list-wrap">
      <div
        class="item"
        v-for="(item, index) in songs"
        :key="item.id"
        @click="handlePlayMusic(index)"
      >
        <div class="order-wrap">
          <span class="order">{{ index+1 }}</span>
        </div>
        <div class="img">
          <img v-lazy="getImgUrl(item.img, 120)" />
        </div>
        <div class="song-content">
          <p class="song-name">{{item.name }}</p>
          <p class="singer">{{ item.artistsText}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from "@/api/discovery";
import { getImgUrl } from "@/utils/common";
import { createSong } from "@/utils/songs";
import { mapMutations } from "@/store/helper/music";

import Title from "../../common/Title";

export default {
  name: "RecommendSongs",
  components: {
    Title,
  },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    const { result } = await getNewSongs();
    // console.log(result[0]);
    this.songs = result.map((item) => {
      const {
        id,
        name,
        picUrl,
        song: { mvid, artists, duration },
      } = item;
      return createSong({
        id,
        name,
        img: picUrl,
        artists,
        duration,
        mvId: mvid,
      });
    });
  },
  methods: {
    ...mapMutations([
      "setCurrentSong",
      "setPlayHistory",
      "setPlayList",
      "setShowAudio",
    ]),
    getImgUrl(url, w, h) {
      return getImgUrl(url, w, h);
    },
    async handlePlayMusic(index) {
      this.setCurrentSong(this.songs[index]);
      this.setPlayHistory(this.songs[index]);
      this.setPlayList(this.songs);
      this.setShowAudio(true);
    },
  },
};
</script>

<style lang='scss' scoped>
.RecSongs {
  margin-bottom: 30px;
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      display: flex;
      font-size: 12px;
      cursor: pointer;
      margin-bottom: 15px;
      &:hover {
        background-color: #f5f5f5;
      }
      .order-wrap {
        width: 30px;
        margin-right: 8px;
        line-height: 30px;
        text-align: center;
      }
      .img {
        position: relative;
        width: 60px;
        height: 60px;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .song-content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        overflow: hidden;

        .song-name {
          color: #333333;
        }
      }
    }
  }
}
</style>