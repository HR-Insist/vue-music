<template>
  <div class="comments">
    <template v-if="loading">
      <Loading />
    </template>
    <template v-else>
      <div class="block" v-if="shouldHotComment">
        <p class="title">精彩评论</p>
        <Comment v-for="item in hotComments" :key="item.id" :comment="item" />
      </div>
      <div class="block" v-if="shouldComment" ref="latestCommentRef">
        <p class="title" ref="commentTitle">
          最新评论
          <span class="count">({{total}})</span>
        </p>
        <Comment v-for="item in comments" :key="item.id" :comment="item" />
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :hide-on-single-page="true"
        :total="total"
        layout="prev, pager, next"
      ></el-pagination>
    </template>
    <div v-if="!loading && !shouldHotComment && !shouldComment" class="empty">
      暂无评论！
      <i class="iconfont icon-shangxin"></i>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import Loading from "./Loading";
import {
  getSongComment,
  getPlaylistComment,
  getHotComment,
  getMvComment,
} from "@/api/comment";
import { scrollInto } from "@/utils/dom";

const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";
const PAGE_SIZE = 20;

export default {
  name: "Comments",
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: SONG_TYPE,
    },
  },
  components: {
    Comment,
    Loading,
  },
  data() {
    return {
      loading: true,
      hotComments: [],
      comments: [],
      total: 0,
      currentPage: 1,
    };
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE;
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * PAGE_SIZE;
    },
    shouldHotComment() {
      return this.hotComments.length > 0 && this.currentPage === 1;
    },
    shouldComment() {
      return this.comments.length > 0;
    },
  },
  methods: {
    async getCommend() {
      const commentRequestMap = {
        [PLAYLIST_TYPE]: getPlaylistComment,
        [SONG_TYPE]: getSongComment,
        [MV_TYPE]: getMvComment,
      };
      const commentRequest = commentRequestMap[this.type];
      const { hotComments = [], comments, total } = await commentRequest({
        id: this.id,
        limit: PAGE_SIZE,
        offset: this.offset,
      }).finally(() => {
        this.loading = false;
      });
      // 歌单的热评需要单独请求接口获取
      if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
        const { hotComments: exactHotComments = [] } = await getHotComment({
          id: this.id,
          type: 2, // 歌单type
        });
        this.hotComments = exactHotComments;
      } else {
        this.hotComments = hotComments;
      }
      this.comments = comments;
      this.total = total;
    },
    async handleCurrentChange() {
      await this.getCommend();
      this.$nextTick(() => {
        scrollInto(this.$refs?.latestCommentRef);
      });
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.getCommend();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.block {
  margin-bottom: 30px;

  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;

    .count {
      font-size: 14px;
    }
  }
}
.el-pagination {
  float: right;
}
.empty {
  text-align: center;

  .icon-shangxin {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>