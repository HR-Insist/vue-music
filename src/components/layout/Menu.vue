<template>
  <el-container class="container" :style="{height: containerHeight}">
    <el-aside :width="isCollapse? '64px' : '260px'" v-show="isMenuShow">
      <div class="toggle-button" @click="toggleCollapse">
        <i :class="leftOrRight"></i>
        |||
      </div>
      <el-menu
        :default-active="activeIndex"
        background-color="#f3f3f3"
        active-text-color="#d33a31"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/discovery" :route="{name: 'Discovery'}">
          <i class="el-icon-menu"></i>
          <span slot="title">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="/recommend" :route="{name: 'Recommend'}">
          <i class="el-icon-document"></i>
          <span slot="title">推荐歌单</span>
        </el-menu-item>
        <el-menu-item index="/latestmusic" :route="{name: 'LatestSongs'}">
          <i class="el-icon-video-play"></i>
          <span slot="title">最新音乐</span>
        </el-menu-item>
        <el-menu-item index="/mvs" :route="{name: 'MVs'}">
          <i class="el-icon-video-camera"></i>
          <span slot="title">最新MV</span>
        </el-menu-item>
        <template v-if="isLogin">
          <el-submenu
            :index="(index + 1).toString()"
            v-for="(menu, index) in userMenus"
            :key="menu.id"
          >
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">{{menu.title}}</span>
            </template>
            <el-menu-item :index="item.path" v-for="item in menu.playlist" :key="item.id">
              <i class="el-icon-collection-tag"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-main>
      <keep-alive include="Discovery,Recommend,MVs,LatestSongs">
        <router-view></router-view>
      </keep-alive>
    </el-main>
    <el-backtop target=".el-main" :visibility-height="1000" :bottom="bottomPx">
      <i class="iconfont icon-iconcopy"></i>
    </el-backtop>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { debounce } from "@/utils/common";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState({
      isMenuShow: (state) => state.global.isMenuShow,
      isShowAudio: (state) => state.music.isShowAudio,
    }),
    ...mapState("user", ["isLogin", "userId"]),
    ...mapGetters("user", ["userMenus"]),
    activeIndex() {
      return this.$route.path;
    },
    leftOrRight() {
      return {
        "el-icon-arrow-right": this.isCollapse,
        "el-icon-arrow-left": !this.isCollapse,
      };
    },
    containerHeight() {
      return this.isShowAudio ? "calc(100vh - 120px)" : "calc(100vh - 60px)";
    },
    bottomPx() {
      return this.isShowAudio ? 100 : 40;
    },
  },
  methods: {
    // 切换菜单的展开折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  mounted() {
    const main = document.querySelector(".el-main");
    main.addEventListener(
      "scroll",
      debounce(() => {
        if (this.$route.meta.keepAlive) {
          this.$route.meta.scrollTop = main.scrollTop;
        }
      })
    );
  },
  watch: {
    $route: {
      handler(newRoute) {
        const main = document.querySelector(".el-main");
        if (newRoute.meta.keepAlive) {
          this.$nextTick(() => {
            main.scrollTop = newRoute.meta.scrollTop;
          });
        }
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  // height: calc(100vh - 120px);
  .el-aside {
    height: 100%;
    overflow-x: hidden;
    .toggle-button {
      position: relative;
      background-color: #e06e68;
      color: #fff;
      height: 24px;
      letter-spacing: 0.3em;
      line-height: 24px;
      font-size: 10px;
      text-align: center;
      cursor: pointer;
      .el-icon-arrow-left,
      .el-icon-arrow-right {
        line-height: 24px;
        position: absolute;
        left: 10px;
        font-size: 12px;
      }
      &:hover {
        background-color: #d33a31;
      }
    }

    .el-menu {
      height: calc(100% - 24px);
      border: none;
      padding-top: 15px;
      .el-menu-item {
        @include text-ellipsis();
      }
    }
  }
  .el-main {
    overflow-y: auto;
    min-width: 700px;
  }
  .el-backtop {
    color: #d33a31;
    i {
      font-size: 25px;
    }
  }
}
</style>