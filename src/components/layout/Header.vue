<template>
  <div class="header">
    <div class="left">
      <div class="icon-box">
        <span class="red-icon" @click="goHome">
          <i class="iconfont icon-shouye"></i>
        </span>
        <span class="yellow-icon" @click="fullscreen">
          <i class="iconfont icon-quanpingchongmanpingmufangdaxianxing"></i>
        </span>
        <span class="green-icon" @click="exitFullscreen">
          <i class="iconfont icon-suoxiao"></i>
        </span>
      </div>
      <div class="shrink-player" v-if="isPlayerShow" @click="shrinkPlayer">
        <i class="el-icon-arrow-down"></i>
      </div>
      <div class="history-box" v-else>
        <span @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </span>
        <span @click="goForward">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="right">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        size="small"
        v-model="keywords"
        @change="handleSearch"
      ></el-input>
      <User />
    </div>
  </div>
</template>

<script>
import {
  requestFullScreen,
  exitFullscreen,
  isFullscreen,
} from "@/utils/common";
import { mapState, mapMutations } from "vuex";
import User from "@/components/User";

export default {
  name: "Header",
  components: { User },
  data() {
    return {
      keywords: "",
    };
  },
  computed: {
    ...mapState("music", ["isPlayerShow"]),
  },
  methods: {
    ...mapMutations("music", ["setPlayerShow"]),
    goBack() {
      this.$router.back();
    },
    goForward() {
      this.$router.forward();
    },
    goHome() {
      this.$router.push("/");
    },
    fullscreen() {
      requestFullScreen(document.documentElement);
    },
    exitFullscreen() {
      if (isFullscreen()) {
        exitFullscreen();
      }
    },
    shrinkPlayer() {
      this.setPlayerShow(false);
    },
    handleSearch() {
      this.keywords = this.keywords.trim();
      if (this.keywords) {
        this.$router.push({
          name: "SearchSongs",
          query: { keywords: this.keywords },
        });
      }
      this.keywords = "";
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  height: 60px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 30px;
    display: flex;
    align-items: center;

    .icon-box {
      margin-right: 50px;
      display: flex;
      &:hover {
        span {
          i {
            opacity: 1;
          }
        }
      }
      .red-icon,
      .yellow-icon,
      .green-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #424242;

        i {
          transition: opacity 0.3s;
          opacity: 0;
        }
      }
      .red-icon {
        background-color: #ed655a;
      }
      .yellow-icon {
        background-color: #e0c04c;
      }
      .green-icon {
        background-color: #72be47;
      }
    }

    .shrink-player {
      margin-right: 15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: #ebebeb;
      }
      .el-icon-arrow-down {
        font-size: 30px;
      }
    }

    .history-box {
      font-size: 20px;

      span {
        display: inline-block;
        margin-right: 8px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        &:hover {
          background-color: #ebebeb;
        }
      }
    }
  }

  .right {
    margin-right: 60px;
    display: flex;
    align-items: center;
  }
}
</style>