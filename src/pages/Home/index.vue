<template>
  <div>
    <!-- 三级全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList.data" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend/TodayRecommend";
import Rank from "@/pages/Home/Rank/Rank";
import Like from "@/pages/Home/Like/Like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand/Brand";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getfloorList");
    //获取用户信息在首页展示
    this.getUserIofo();
  },
  methods:{
    async getUserIofo(){
     try {
       await this.$store.dispatch("getUserInfo");
     }catch (e) {
       console.log(e.message)
     }
    }
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
      // 右边的函数 会执行一次
      // floorList: (state) => {
      //   // console.log(state);
      //   return state.home.floorList;
      // },
      // *************
    }),
  },
};
</script>

<style>
</style>