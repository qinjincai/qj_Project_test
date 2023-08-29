<template>
  <div class="pagination">
    <!-- <h1>{{ starNumAndEndNum }}----当前页码{{ pageNo }}</h1> -->

    <button :disabled="pageNo==1" @click="$emit('getpagenum',pageNo -1)">上一页</button>
    <!-- 上 -->
    <button  :class="{active:pageNo==1}" v-if="starNumAndEndNum.start > 1" @click="$emit('getpagenum',1)">1</button>
    <button v-if="starNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <button v-for="(page, index) in starNumAndEndNum.end" :key="index" v-if="page>=starNumAndEndNum.start" 
      :class="{active:pageNo==page}"
      @click="$emit('getpagenum',page)">{{ page }}</button>

    <!-- 下 -->
    <button v-if="starNumAndEndNum.end < totaPage - 1">···</button>
    <!-- 点击第几页就传第几 -->
    <button :class="{active:pageNo==totaPage}" v-if="starNumAndEndNum.end < totaPage"  
    @click="$emit('getpagenum',totaPage)">{{ totaPage }}</button>

    <button  :disabled="pageNo==totaPage" @click="$emit('getpagenum',pageNo +1)" >下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  // 父组件传过来的数据
  props: ["pageNo", "pageSize", "total", "comntinues","getpagenum"],

  computed: {
    // 一共多少页
    totaPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字
    starNumAndEndNum() {
      const { comntinues, pageNo, totaPage } = this;
      let start = 0;
      let end = 0;
      //连续页码数字5 [就是至少五页]，如果出现不正常的现象[就是不够五页]
      //不正常现象[总页数没有连续页码多]
      if (comntinues > totaPage) {
        start = 1;
        end = totaPage;
      } else {
        //正常现象[连续页码5，但是你的总页数一定是大于5的]
        start = pageNo - parseInt(comntinues / 2);
        end = pageNo + parseInt(comntinues / 2);
        // 不正常
        if (start < 1) {
          start = 1;
          end = comntinues;
          // 异常处理
        }
        if (end > totaPage) {
          end = comntinues;
          start = totaPage - comntinues + 1;
        }
      }
      // console.log(start, end);
      return {start, end};
    },
  },
  methods:{

  }
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #f00;
      color: #fff;
    }
  }
}

</style>