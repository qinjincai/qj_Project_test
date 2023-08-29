<template>
  <div>
    <Header></Header>
    <!-- 路由组件的入口 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  mounted() {
    // / /通知Vuex发请求 只发一次请求。性能优化， 获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
