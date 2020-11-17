<template>
  <div class="comment">
    <div class="avatar">
      <img v-lazy="$utils.getImgUrl(comment.user.avatarUrl, 80)" />
    </div>
    <div class="content">
      <p class="comment-text">
        <span class="username">{{ comment.user.nickname }}:</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <div class="replied" v-if="comment.beReplied.length">
        <img v-lazy="$utils.getImgUrl(comment.beReplied[0].user.avatarUrl, 50)" />
        <p class="comment-text">
          <span class="username">{{ comment.beReplied[0].user.nickname }}:</span>
          <span class="text">{{ comment.beReplied[0].content }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{ $utils.formatDate(comment.time) }}</span>
        <div class="actions">
          <i class="iconfont icon-good"></i>
          {{ comment.likedCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
};
</script>

<style lang='scss' scoped>
.comment {
  display: flex;
  padding-top: 20px;

  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;

    img {
      border-radius: 50%;
    }
  }

  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: 14px;
    letter-spacing: 1.2px;
    border-bottom: 1px solid #ccc;

    .replied {
      padding: 8px;
      margin-top: 8px;
      background: #e6e5e6;
      border-radius: 4px;

      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        float: left;
        margin-right: 7px;
      }
    }

    .comment-text {
      .username {
        display: inline-block;
        margin-right: 4px;
        color: #517eaf;
      }

      .text {
        line-height: 1.5;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .date {
        color: #bebebe;
      }

      .actions {
        color: #bebebe;
      }
    }
  }
}
</style>