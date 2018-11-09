<template>
  <div class="home">
    <!-- <button @click="$router.push('/phone.html/class')">测试</button> -->
    <header>
      <img class="personalImg" :src="data.photoUrl" alt="">
      <div class="personalDetail">
        <div>
          <span class="name">{{data.userName}}</span>
          <span class="sign" v-if="data.getRole">{{data.getRole}}</span>
        </div>
        <p class="address">{{data.campusName}} {{data.shopName}}</p>
      </div>
    </header>
    <div style="height: 81%;margin-top:2rem;">
      <div style="overflow-x:hidden;overflow-y:scroll;height: 100%;">
        <swiper dots-class="custom-bottom" :show-dots="false" id="swiper" :height=swiperHeight>
          <swiper-item>
            <div>
              <flexbox>
                <flexbox-item class="flexItem" v-for="(item,index) in icon1.icon1Top" :key="index">
                  <router-link :to="{ path: item.href}">
                    <img :src="item.url" alt="模块">
                  </router-link>

                </flexbox-item>
              </flexbox>
              <flexbox>
                <flexbox-item class="flexItem" v-for="(item,index) in icon1.icon1Bottom" :key="index">
                  <router-link :to="{ path: item.href}">
                    <img :src="item.url" alt="模块">
                  </router-link>
                </flexbox-item>
              </flexbox>
            </div>
          </swiper-item>
        </swiper>
        <a class="routerLink" href="http://college.wendu.com/m?from=groupmessage&isappinstalled=0">院校库</a>
        <footer>世纪文都教育科技集团股份有限公司</footer>
    </div>
    </div>
  </div>
</template>

<script>
  import {
    Swiper,
    GroupTitle,
    SwiperItem,
    XButton,
    Divider,
    XHeader,
    Flexbox,
    FlexboxItem
  } from "vux";

  let icon1 = {
    icon1Top: [
      {
        url: require("@/styles/img/home/home-course.png"),
        href: "/product"
      },
      {
        url: require("@/styles/img/home/home-student.png"),
        href: "/student"
      },
      {
        url: require("@/styles/img/home/home-order.png"),
        href: "/order"
      }
    ],
    icon1Bottom: [
      {
        url: require("@/styles/img/home/hoem-deposit.png"),
        href: "/money"
      },
      {
        url: require("@/styles/img/home/home-book.png"),
        href: "/product"
      },
      {
        url: require("@/styles/img/home/home-cost.png"),
        href: "/product"
      }
    ]
  };
  export default {
    data() {
      return {
        icon1: icon1,
        swiperHeight: "",
        data: [],
        searchItems: {},
      };
    },
    mounted() {
      XuntongJSBridge.call('setWebViewTitle', {'title': '首页'});
      this.getInfo();
      // 动态设置背景图的高度为浏览器可视区域高度
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      let oClientWidth = document.documentElement.clientWidth;
      // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
      window.onresize = function temp() {
        oClientWidth = document.documentElement.clientWidth;
      };
      //反人类iphonese
      if (oClientWidth < 321) {
        this.swiperHeight = "260px";
      }
      //手机iphone6/7/8(小屏)
      if (oClientWidth < 376 && oClientWidth > 320) {
        this.swiperHeight = "300px";
      } //手机iphone6p/7p/8p(大屏)
      if (oClientWidth > 376 && oClientWidth < 600) {
        this.swiperHeight = "320px";
      }
      if (oClientWidth > 599 && oClientWidth < 760) {
        this.swiperHeight = "460px";
      }
      if (oClientWidth > 760 && oClientWidth < 1024) {
        //pad
        this.swiperHeight = "600px";
      } else if (oClientWidth > 1023 && oClientWidth < 1400) {
        //padPro
        this.swiperHeight = "800px";
      }
      // this.searchCategoryList();
    },
    methods: {
      searchCategoryList() {
        this.axios
          .post(this.api.product.listSelection.url, {})
          .then(res => {
            this.searchItems = res.data.data;
            this.icon1.icon1Bottom[1].href= "/product/"+this.searchItems.goodsSelectionVOList[0].id;
            this.icon1.icon1Bottom[2].href= "/product/"+this.searchItems.serviceSelectionVOList[1].id;
          });
      },
      getInfo() {
        this.axios.post(this.api.home.info.url).then(res => {
          this.data = res.data.data;
          let oMsg = {};
          oMsg.campusId = res.data.data.campusId;
          oMsg.shopId = res.data.data.shopId;
          this.$store.commit("storeHomeMsg", oMsg);
        });
      }
    },

    components: {
      Swiper,
      SwiperItem,
      GroupTitle,
      XButton,
      Divider,
      XHeader,
      Flexbox,
      FlexboxItem
    }
  };
</script>

<style scoped>
  /* 头部 */
  header {
    width: 100%;
    /* height: 19%; */
    overflow: hidden;
    background: url("../../styles/img/home/home-bg.png");
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .personalImg {
    float: left;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    margin: 0.35rem 0.3rem;
  }

  .personalDetail {
    float: left;
    margin-top: 0.5rem;
    color: white;
  }

  .name {
    font-weight: bold;
    font-size: 0.32rem;
  }

  .sign {
    /* display: inline-block; */
    width: 0.7rem;
    height: 0.26rem;
    line-height: 0.29rem;
    text-align: center;
    font-size: 0.18rem;
    color: white;
    border: 1px solid white !important;
    border-radius: 4px;
  }

  .address {
    font-size: 0.24rem;
    line-height: 0.6rem;
  }

  .black {
    background-color: #000;
  }

  .title {
    line-height: 1rem;
    text-align: center;
    color: #fff;
  }

  .vux-slider {
    margin-top: 0.5rem;
  }

  .vux-slider {
    padding: 0 0.4rem;
    box-sizing: border-box;
  }

  .flexItem,
  .flexItem img,
  .flexItem a {
    display: block;
    width: 1.9rem;
    height: 2.1rem;
  }

  .flexItem a {
    margin: 0 auto;
  }

  .flexItem img {
    object-fit: cover;
  }

  .vux-flex-row {
    margin-top: 0.6rem;
  }

  .vux-flex-row > div:nth-of-type(3) {
    margin-right: 0;
  }

  .routerLink {
    display: block;
    width: 6.7rem;
    height: 1.4rem;
    margin: 0.2rem auto;
    color: #47aee8;
    background: url("../../styles/img/home/home-view.png");
    text-align: center;
    line-height: 1.4rem;
    font-size: 0.5rem;
  }

  .vux-flex-row > div:nth-last-of-type(3) {
    margin-right: 0;
  }

  footer {
    width: 100%;
    height: 1.27rem;
    font-size: 0.24rem;
    color: #a8a8a8;
    text-align: center;
    line-height: 1.27rem;
    margin-bottom: 0;
  }

  .vux-flexbox .vux-flexbox-item {
    justify-content: space-between;
  }

  .home {
    /* min-width: 80%; */
    height: 100%;
    overflow: hidden;
  }
</style>
