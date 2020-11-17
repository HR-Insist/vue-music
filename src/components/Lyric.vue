<template>
  <transition name="slide">
    <div class="lyric" v-if="currentSong.id" :class="[isPlayerShow ? 'show' : 'hide']">
      <div class="content" ref="contentRef">
        <div class="song">
          <div class="left">
            <img class="play-bar-support" src="@/assets/image/play-bar-support.png" />
            <img :class="{playing}" class="play-bar" src="@/assets/image/play-bar.png" />
            <div class="img-outer-border" ref="disc">
              <div :class="{paused: !playing}" class="img-outer" ref="discRotate">
                <div class="img-wrap">
                  <img v-lazy="$utils.getImgUrl(currentSong.img, 400)" />
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{currentSong.name}}</p>
              <span class="mv-tag" v-if="currentSong.mvId" @click="handleGoMv">MV</span>
            </div>
            <div class="desc">
              <div class="desc-item">
                <span class="label">歌手：</span>
                <div class="value">{{currentSong.artistsText}}</div>
              </div>
            </div>
            <div v-if="noLyric" class="empty">还没有歌词哦~</div>
            <Scroller
              :data="lyric"
              :options="{disableTouch: true}"
              @init="handleInitScroller"
              ref="scrollerRef"
              v-else
            >
              <div
                v-for="(item, index) in lyricWithTranslation"
                :key="index"
                ref="lyricRef"
                class="lyric-item"
                :class="[activeLyricIndex===index ? 'active' : '']"
              >
                <p
                  :key="contentIndex"
                  class="lyric-text"
                  v-for="(content, contentIndex) in item.contents"
                >{{content}}</p>
              </div>
            </Scroller>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <Comments :id="currentSong.id" />
          </div>
          <div class="right" v-if="simiPlaylists.concat(simiSongs).length">
            <div class="similar-playlist" v-if="simiPlaylists.length">
              <p class="title">包含这首歌的歌单</p>
              <div
                v-for="item in simiPlaylists"
                :key="item.id"
                class="simi-item"
                @click="handleClickPlaylist(item.id)"
              >
                <div class="img-wrap">
                  <img v-lazy="$utils.getImgUrl(item.coverImgUrl, 160)" />
                </div>
                <div class="info">
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">{{ $utils.formatDate(item.createTime, 'yyyy-MM-dd') }}</div>
                </div>
              </div>
            </div>
            <div class="similar-songs" v-if="simiSongs.length">
              <p class="title">相似音乐</p>
              <div
                v-for="item in simiSongs"
                :key="item.id"
                class="simi-item"
                @click="handleClickSong(item)"
              >
                <div class="img-wrap">
                  <img v-lazy="$utils.getImgUrl(item.img, 160)" />
                  <PlayIcon :size="25" />
                </div>
                <div class="info">
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">{{ item.artistsText }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getLyric, getSimiSongs } from "@/api/song";
import { getSimiPlaylists } from "@/api/playlist";
import { mapState, mapMutations } from "@/store/helper/music";
import { lyricParser } from "@/utils/lrcparse";
import { createSong } from "@/utils/songs";
import { debounce } from "@/utils/common";
import { scrollInto } from "@/utils/dom";
import Scroller from "@/common/Scroller";
import Comments from "@/common/Comments";
import PlayIcon from "@/common/PlayIcon";

export default {
  name: "Lyric",
  components: {
    Scroller,
    Comments,
    PlayIcon,
  },
  data() {
    return {
      // 存放歌词
      lyric: [],
      // 相同时间的歌词
      tlyric: [],
      // 有没有歌词
      noLyric: false,
      simiLoading: true,
      simiPlaylists: [],
      simiSongs: [],
      lyricScrolling: {
        wheel: false,
        scroll: false,
      },
    };
  },
  computed: {
    ...mapState(["currentSong", "currentTime", "playing", "isPlayerShow"]),
    lyricWithTranslation() {
      let ret = [];
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) =>
        Boolean(content)
      );
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach((l) => {
          const { time, content } = l;
          const lyricItem = { time, content, contents: [content] };
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time
          );
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric;
            if (content) {
              lyricItem.contents.push(tLyricContent);
            }
          }
          ret.push(lyricItem);
        });
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content],
        }));
      }
      return ret;
    },
    activeLyricIndex() {
      return this.lyricWithTranslation
        ? this.lyricWithTranslation.findIndex((item, index, arr) => {
            const next = arr[index + 1];
            return (
              this.currentTime >= item.time &&
              (next ? this.currentTime < next.time : true)
            );
          })
        : -1;
    },
  },
  methods: {
    ...mapMutations(["setPlayerShow", "setCurrentSong", "setPlayHistory"]),
    async getLyric() {
      const res = await getLyric(this.currentSong.id);
      this.noLyric = !res.lrc?.lyric;
      if (!this.noLyric) {
        const { lyric, tlyric } = lyricParser(res);
        this.lyric = lyric;
        this.tlyric = tlyric;
      }
    },
    async getSimilar() {
      const [simiPlaylists, simiSongs] = await Promise.all([
        getSimiPlaylists(this.currentSong.id),
        getSimiSongs(this.currentSong.id),
      ]).finally(() => {
        this.simiLoading = false;
      });
      this.simiPlaylists = simiPlaylists.playlists;
      this.simiSongs = simiSongs.songs.map((song) => {
        const {
          id,
          name,
          artists,
          mvid,
          album: { picUrl },
          duration,
        } = song;
        return createSong({
          id,
          name,
          artists,
          duration,
          img: picUrl,
          mvId: mvid,
        });
      });
    },
    handleInitScroller(scroller) {
      scroller.on("scrollStart", () => {
        // this.clearTimer("scroll");
        this.lyricScrolling.scroll = true;
      });
      scroller.on("scrollEnd", () => {
        setTimeout(() => {
          this.lyricScrolling.scroll = false;
        }, 1000);
      });
      scroller.on("mousewheelStart", () => {
        this.lyricScrolling.wheel = true;
      });
      scroller.on("mousewheelEnd", () => {
        setTimeout(() => {
          this.lyricScrolling.wheel = false;
        }, 1000);
      });
    },
    scrollToActiveLyric() {
      if (this.activeLyricIndex !== -1) {
        const { lyricRef, scrollerRef } = this.$refs;
        if (lyricRef && lyricRef[this.activeLyricIndex]) {
          scrollerRef.scroller.scrollToElement(
            lyricRef[this.activeLyricIndex],
            200,
            0,
            true
          );
        }
      }
    },
    resizeScroller() {
      debounce(() => {
        this.$refs.scrollerRef.scroller.refresh();
      }, 500);
    },
    addResizeListener() {
      window.addEventListener("resize", this.resizeScroller);
    },
    removeResizeListener() {
      window.removeEventListener("resize", this.resizeScroller);
    },
    handleGoMv() {
      this.setPlayerShow(false);
      this.$router.push(`/mv-detail/${this.currentSong.mvId}`);
    },
    handleClickPlaylist(id) {
      this.setPlayerShow(false);
      if (id !== +this.$route.params.id) {
        this.$router.push({ name: "PlayList", params: { id } });
      }
    },
    handleClickSong(song) {
      this.setCurrentSong(song);
      this.setPlayHistory(song);
    },
  },
  watch: {
    isPlayerShow(show) {
      if (show) {
        if (this.simiSongs.length === 0) {
          this.getSimilar();
        }
        this.addResizeListener();
        this.$nextTick(() => {
          this.scrollToActiveLyric();
        });
      } else {
        this.removeResizeListener();
      }
    },
    currentSong(newSong, oldSong) {
      this.$nextTick(() => {
        scrollInto(this.$refs.contentRef);
      });
      if (newSong.id === oldSong.id) {
        return;
      }
      if (this.isPlayerShow) {
        this.getLyric();
        this.getSimilar();
      } else {
        this.getLyric();
      }
    },
    activeLyricIndex(newIndex, oldIndex) {
      if (
        newIndex !== oldIndex &&
        !this.lyricScrolling.scroll &&
        !this.lyricScrolling.wheel
      ) {
        this.scrollToActiveLyric();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;

.lyric {
  position: fixed;
  top: 60px;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: #f9f9f9;
  z-index: 88;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  &.hide {
    transform: translateY(120%);
  }

  &.show {
    transform: none;
  }
  .content {
    max-width: 870px;
    margin: auto;
    .song {
      display: flex;
      .left {
        position: relative;
        padding: 80px 70px 0 $img-left-padding;
        display: flex;
        justify-content: center;

        $support-d: 30px;
        $support-d-half: $support-d / 2;
        .play-bar-support {
          position: absolute;
          left: $img-left-padding + $img-outer-border-d / 2 - $support-d / 2;
          top: -$support-d-half;
          width: $support-d;
          height: $support-d;
          z-index: 2;
        }

        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: $img-left-padding + $img-outer-border-d / 2 - 6px;
          width: $w;
          height: $h;
          z-index: 1;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          @include round($img-outer-border-d);
          @include flex-center;
          background: #e6e5e6;

          .img-outer {
            @include round($img-outer-d);
            @include flex-center;
            background: #000;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        padding: 45px 0 0 30px;
        .name-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .name {
            font-size: 24px;
            color: #333;
          }

          .mv-tag {
            display: inline-block;
            margin-left: 8px;
            padding: 2px;
            border: 1px solid currentColor;
            border-radius: 2px;
            color: #d33a31;
            cursor: pointer;
          }
        }

        .artists {
          margin-bottom: 16px;
        }

        .desc {
          display: flex;
          font-size: 12px;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            margin-right: 32px;
            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: #517eaf;
            }
          }
        }
        .empty {
          font-size: 16px;
          margin-top: 150px;
        }

        .scroller {
          width: 380px;
          height: 350px;
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );
          .lyric-item {
            margin-bottom: 16px;
            font-size: 12px;

            &.active {
              font-size: 14px;
              color: #d33a31;
              font-weight: 700;
            }
            &:first-child {
              margin-top: 60px;
            }
            &:last-child {
              margin-bottom: 100px;
            }

            .lyric-text {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      margin-top: 40px;
      margin-bottom: 40px;

      .left {
        flex: 1;
      }
      .right {
        padding-left: 36px;
        width: 30%;
        overflow: hidden;
        .similar-playlist {
          margin-bottom: 30px;
        }
        .title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .simi-item {
          display: flex;
          margin-bottom: 20px;
          cursor: pointer;
          &:hover {
            background-color: #ececec;
          }
          .img-wrap {
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            @include img-wrap(80px);
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 12px;
            padding-left: 15px;

            .name {
              @include text-ellipsis();
              padding-bottom: 15px;
            }
          }
        }
      }
    }
  }
}
</style>