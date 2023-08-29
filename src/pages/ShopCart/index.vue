<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
                   :Checked="cart.isChecked===1"
                   @change="updateChaecked(cart,$event)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text"
                   :value="cart.skuNum"
                   @change="handler('change',$event.target.value*1,cart)"
                   minnum="1"
                   class="itxt">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <!--        <ul class="cart-list">
                  <li class="cart-list-con1">
                    <input type="checkbox" name="chk_list" id="" value="">
                  </li>
                  <li class="cart-list-con2">
                    <img src="./images/goods2.png">
                    <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
                  </li>
        &lt;!&ndash;          <li class="cart-list-con3">&ndash;&gt;
        &lt;!&ndash;            <div class="item-txt">黑色版本</div>&ndash;&gt;
        &lt;!&ndash;          </li>&ndash;&gt;
                  <li class="cart-list-con4">
                    <span class="price">5622.00</span>
                  </li>
                  <li class="cart-list-con5">
                    <a href="javascript:void(0)" class="mins">-</a>
                    <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
                    <a href="javascript:void(0)" class="plus">+</a>
                  </li>
                  <li class="cart-list-con6">
                    <span class="sum">5622</span>
                  </li>
                  <li class="cart-list-con7">
                    <a href="#none" class="sindelet">删除</a>
                    <br>
                    <a href="#none">移到收藏</a>
                  </li>
                </ul>

                <ul class="cart-list">
                  <li class="cart-list-con1">
                    <input type="checkbox" name="chk_list" id="" value="">
                  </li>
                  <li class="cart-list-con2">
                    <img src="./images/goods3.png">
                    <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
                  </li>
        &lt;!&ndash;          <li class="cart-list-con3">&ndash;&gt;
        &lt;!&ndash;            <div class="item-txt">墨绿色</div>&ndash;&gt;
        &lt;!&ndash;          </li>&ndash;&gt;
                  <li class="cart-list-con4">
                    <span class="price">11399.00</span>
                  </li>
                  <li class="cart-list-con5">
                    <a href="javascript:void(0)" class="mins">-</a>
                    <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
                    <a href="javascript:void(0)" class="plus">+</a>
                  </li>
                  <li class="cart-list-con6">
                    <span class="sum">11399</span>
                  </li>
                  <li class="cart-list-con7">
                    <a href="#none" class="sindelet">删除</a>
                    <br>
                    <a href="#none">移到收藏</a>
                  </li>
                </ul>-->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length > 0" @change="updateAllCheckedCart">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import throttle from "lodash/throttle";

export default {
  name: 'ShopCart',
  mounted() {
    this.getData();
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch('getCartList');
    },
    // 修改产品个数  节流函数 throttle
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case "add":
          disNum = 1
          break;
        case "minus":
          /*if (cart.skuNum >1){
          disNum = -1
          }else{
          disNum = 0;
          }*/
          // 如果disnum 大于1 就为-1  否则为 0
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
          /*输入 非数字 或者小鱼1的限制*/
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      //派发: action
      try {
        await this.$store.dispatch('addOrUpdateShpCart', {
          skuId: cart.skuId, skuNum: disNum
        })
        this.getData();
      } catch (error) {
        console.log(error)
      }
    }, 1000),
    // 删除一个商品的操作
    deleteCartById: throttle(async function (cart) {
      try {
        await this.$store.dispatch('deleteCartListBySkuId', cart.skuId);
        this.getData();
      } catch (error) {
        console.log(error)
      }
    }, 1000),
    // 修改产品勾选状态
    updateChaecked(cart, event) {
      // console.log(event.target.checked)
      /*下面使用 isChecked 这个布尔值 变量 键值一样 写一个就行*/
      try {
        let isChecked = event.target.checked ? 1 : 0;
        this.$store.dispatch('updateCheckedById', {skuId: cart.skuId, isChecked});
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
    //删除全部选中的产品
    //这个回调函数咱门没办法手机到一些有用数据
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart');
        this.getData()
      } catch (e) {
        alert(e.message)
      }
    },
    // 修改全部选中的产品状态
    async updateAllCheckedCart(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0"
        // console.log(checked)
        // 派发 action
        await this.$store.dispatch("updateAllCartChecked", isChecked)
        this.getData()
      } catch (e) {
        console.log(e)
        // alert(e.message)
      }
    },


  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.cartPrice;
        // console.log(sum)
      });
      return sum
    },
    isAllCheck() {
      //遍历数组里面原理，只要全部元素isChecked属性都为1===>真 true
      //只要有一个不是1======>假false
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        /*          .cart-list-con3 {
                    width: 20.8333%;

                    .item-txt {
                      text-align: center;
                    }
                  }*/

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

