<template>
  <div class="mv-detail" v-if="mvDetail.id">
    <div class="mv-player">
      <div class="header">
        <i class="iconfont icon-mv"></i>
        <h2 class="title">{{mvDetail.name}}</h2>
        <img v-lazy="$utils.getImgUrl(artist.picUrl, 40)" />
        <span class="artist-name">{{mvDetail.artistName}}</span>
      </div>
      <div class="video">
        <video :src="mvPlayInfo.url" controls autoplay></video>
      </div>
      <div class="info">
        <span class="date">发布：{{mvDetail.publishTime}}</span>
        <span class="count">播放：{{mvDetail.playCount}}次</span>
      </div>
    </div>
    <div class="content">
      <div class="comment">
        <Comments :id="id" type="mv" />
      </div>
      <div class="similar">
        <div class="title">相关推荐</div>
        <div class="mv-item" v-for="item in similarMvs" :key="item.id">
          <div class="img">
            <MVCard
              :id="item.id"
              :img="item.cover"
              :duration="item.duration"
              :playCount="item.playCount"
            />
          </div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="author">by {{ item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hideMenuMixin } from "@/utils/mixin";
import { getMvDetail, getMvUrl, getSimiMv } from "@/api/mv";
import { getArtists } from "@/api/artist";

import Comments from "@/common/Comments";
import MVCard from "@/common/MVCard";

export default {
  name: "MvDetail",
  metaInfo() {
    return {
      title: this.mvDetail.name,
      titleTemplate: "%s | vue-music",
    };
  },
  mixins: [hideMenuMixin],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Comments,
    MVCard,
  },
  data() {
    return {
      mvDetail: {},
      mvPlayInfo: "",
      artist: {},
      similarMvs: [],
    };
  },
  methods: {
    async init() {
      const [
        { data: mvDetail },
        { data: mvPlayInfo },
        { mvs: similarMvs },
      ] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id),
      ]);
      const { artist } = await getArtists(mvDetail.artistId);

      this.mvDetail = mvDetail;
      this.mvPlayInfo = mvPlayInfo;
      this.artist = artist;
      this.similarMvs = similarMvs;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.mv-detail {
  max-width: 1000px;
  margin: 0 auto;

  .mv-player {
    .header {
      position: relative;
      display: flex;
      align-items: flex-end;
      margin-bottom: 10px;
      .icon-mv {
        color: #d33a31;
        font-size: 36px;
        margin-right: 5px;
      }
      .title {
        height: 36px;
        line-height: 36px;
        font-size: 25px;
        margin-right: 10px;
        max-width: 800px;
        @include text-ellipsis();
      }
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .artist-name {
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        color: #417dee;
      }
    }
    .video {
      width: 1000px;
      height: 562px;
      margin-bottom: 15px;
      background-color: #000;
      padding: 5px 0;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      color: #747272;
      .date {
        margin-right: 14px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 30px;
    .comment {
      flex: 1;
    }
    .similar {
      width: 360px;
      padding-left: 30px;
      .title {
        height: 36px;
        line-height: 36px;
        font-size: 25px;
        margin-right: 10px;
      }
      .mv-item {
        display: flex;
        margin-bottom: 15px;
        .img {
          width: 60%;
        }
        .info {
          flex: 1;
          margin-left: 15px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: 14px;
          cursor: default;
          .name {
            margin-bottom: 10px;
            @include text-ellipsis-multi(2);
          }
          .author {
            color: #727272;
          }
        }
      }
    }
  }
}
</style>