<template>
  <div id="app">
    <layout></layout>
    <Lyric />
    <PlayList />
  </div>
</template>

<script>
import Layout from "./components/layout/Index";
import Lyric from "./components/Lyric";
import PlayList from "./components/PlayList";
export default {
  name: "App",
  components: {
    Layout,
    Lyric,
    PlayList,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
</style>
