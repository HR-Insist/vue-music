<template>
  <div class="layout">
    <Header></Header>
    <Menu></Menu>
    <Audio></Audio>
  </div>
</template>

<script>
import Header from "./Header";
import Menu from "./Menu";
import Audio from "./Audio";

export default {
  name: "Layout",
  components: {
    Header,
    Menu,
    Audio,
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
}
</style>