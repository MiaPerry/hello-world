<template>
  <div class="product_div" style="   background: #f1f1f1;">
    <!--页头部分-->
    <div class="product_title" style="z-index:502;">
      <div class="search_title_div" v-if="popupModel.show==false">
        <svg class="icon-sm title_icon     " aria-hidden="true" v-if="leftArrow==true"
             @click="leftArrow=false;showDialogName=false">
          <use xlink:href="#icon-zuojiantouxiangzuoxianxing"></use>
        </svg>
        <input class="searchStudent" type="text" v-model="searchName" @on-submit="searchStudent(0)"
               @keyup.enter="cancelProduct(0)" placeholder="产品/商品/服务">
      </div>
      <div class="product_contet_search" v-if="showDialogName==false">
        <flexbox>
          <flexbox-item v-for="(item,index) in searchTitle" :key="index">
            <div class="flex-demo phone_product_content" @click="conditionDiv(item);showDialogName=false">
              {{item.name}}
              <svg class="icon-sm" aria-hidden="true">
                <use xlink:href="#icon-xiala" v-if="item.clickFlag"></use>
                <use xlink:href="#icon-xiala1" v-else></use>
              </svg>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <!--<scroller lock-x height="100%" @on-scroll="onScrollBottom" ref="scrollerBottom">-->
    <scroller height="100%" lock-x style="background: #ffffff;padding-bottom:1.06rem;"
              @on-scroll="onScrollBottom" ref="scrollerBottom">
      <!--内容部分-->
      <div class="product_content">
        <table class="content_table">
          <div class="boxNone"></div>
          <tbody v-for="(item,index)  in  productlist" :key="index"
                 style="padding:0.1rem; border-bottom: 1px solid #e6e6e6;width: 100%;overflow: hidden"
                 @click="showDialogClass=false;$router.push('/details/'+item.id)">
          <tr class="tr_text" style="overflow:hidden">
            <td>
              <div class="tr_title">
                <span v-if="item.costType==true">[协议]</span> {{item.name}}
              </div>
            </td>
            <td @click.stop="selectProduct(item)" rowspan="5">
              <svg class="icon-sm svg_cart" aria-hidden="true" style="color: #ffffff">
                <use xlink:href="#icon-gouwuche1"></use>
              </svg>
            </td>
          </tr>
          <tr class="tr_discount">
            <td colspan="2">
              <ul>
                <template v-if="item.signVO&&item.signVO.costType==0">
                  <li>
                    <span>立减￥{{item.signVO.discountPrice}}</span>
                  </li>
                  <li
                    v-if="item.signVO.choosePriceSetting==1&&item.signVO.setDiscountPrice&&item.signVO.setDiscountPrice!=0">
                    <span>立减￥{{item.signVO.setDiscountPrice}}</span>
                  </li>
                </template>
                <template v-if="item.signVO&&item.signVO.costType==1">
                  <li v-if="item.signVO.choosePriceSetting==0&&item.signVO.discountPrice&&item.signVO.discountPrice!=0">
                    <span>折扣￥{{item.signVO.discountPrice}}折</span>
                  </li>
                  <li
                    v-if="item.signVO&&item.signVO.choosePriceSetting==1&&item.signVO.setDiscountPrice&&item.signVO.setDiscountPrice!=0">
                    <span>折扣￥{{item.signVO.setDiscountPrice}}折</span>
                  </li>
                </template>
                <template v-if="item.signVO&&item.signVO.costType==2">
                  <li v-if="item.signVO.choosePriceSetting==0&&item.signVO.discountPrice&&item.signVO.discountPrice!=0">
                    <span>促销价{{item.signVO.discountPrice}}</span>
                  </li>
                  <li
                    v-if="item.signVO.choosePriceSetting==1&&item.signVO.setDiscountPrice&&item.signVO.setDiscountPrice!=0">
                    <span>促销价{{item.signVO.setDiscountPrice}}</span>
                  </li>
                </template>
                <template v-if="item.reductionVO">
                  <li>
                    {{item.reductionVO.label}}
                  </li>
                </template>
                <template v-if="item.isPresent==1">
                  <li>
                    赠
                  </li>
                </template>
                <template v-if="item.sellGroupVO">
                  <li>
                    {{item.sellGroupVO.label}}
                  </li>
                </template>
              </ul>
            </td>
          </tr>
          <!--<tr class="tr_discount" >-->
          <!--<td >-->
          <!--<ul>-->
          <!---->
          <!--<li >-->
          <!---->
          <!--</li>-->
          <!--</ul>-->
          <!--</td>-->
          <!--</tr>-->
          <tr class="tr_cart">
            <td>
                <span
                  style="color: #f56016;margin-left:0.15rem;line-height:0.5rem;font-weight:bold;font-size:0.28rem;float:left">
                  ￥{{item.signDiscountPrice || 0 | price}}
                </span>
              <span
                style="color: #e6e6e6;text-decoration:line-through;line-height:0.5rem;margin-left:0.15rem;font-size:0.22rem;float:left;margin-top:0.02rem;">
                  ￥{{item.discountPrice || 0 | price}}
                </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <load-more tip="loading" v-if="productlist.length>6&&bottomLine==false"></load-more>
      <divider v-else>已经到底了</divider>
    </scroller>
    <div v-transfer-dom>
      <popup v-model="showDialogName" position="top"
             style="margin-top:44px;background: #ffffff;height: 100%;z-index:501; " @on-hide="hide">
        <div style="margin-top: 50%;text-align: center;position: relative;top:10px">
          搜索历史模块正在开发中!!!
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDialogClass" hide-on-blur @on-hide="category=-1" :popup-style="{zIndex: 600}"
             :show-mask="false" style="overflow:hidden;background-color:#ffffff;height: 70%;">
        <div class="dialog_div" style="height: 100%;overflow:hidden;padding-bottom:60px;">
          <RainbowVue ref="rainbow" :productFrom="productFrom" v-if="category==1"
                      :key="new Date().getTime()"></RainbowVue>
          <OneToOneVue ref="ontoon" :productFrom="productFrom" v-else-if="category==6"
          ></OneToOneVue>
          <NetClassVue ref="netclass" :productFrom="productFrom" v-else-if="category==3"
          ></NetClassVue>
          <ServiceVue ref="service" :productFrom="productFrom" v-else-if="category==4"
          ></ServiceVue>
          <BookVue ref="book" :productFrom="productFrom" v-else-if="category==5"></BookVue>
          <BasicVue ref="basice" :productFrom="productFrom" v-else :key="new Date().getTime()"></BasicVue>
        </div>

      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupModel.show" position="top"
             style="margin-top:0.58rem;background: #ffffff;padding:10px;box-sizing:border-box;height:6rem;"
             @on-hide="hide">
        <div v-if="popupModel.code==1">
          <div style="width: 100%;overflow: hidden">
            <ul class="popup_ul" style="width: 100%;overflow: hidden">
              <li style="margin-top:0.1rem"
                  @click="searchProductCategoryId='';searchDictId='';searchTitle.product.name='产品';init()">全部
              </li>
            </ul>
            <h3 class="popup_ul_title" style="margin-top:0rem">产品分类</h3>
            <ul class="popup_ul">
              <li v-for="(item,index) in searchItems.productSelectionVOList" :key="index"
                  @click="searchProductCategoryId=item.id;searchDictId='';searchTitle.product.name=item.name;init()">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div style="width: 100%;overflow: hidden">
            <h3 class="popup_ul_title">商品</h3>
            <ul class="popup_ul">
              <li v-for="(item,index) in searchItems.goodsSelectionVOList" :key="index"
                  @click="searchDictId=item.id;searchProductCategoryId='';searchTitle.product.name=item.name;init()">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div style="width: 100%;overflow: hidden">
            <h3 class="popup_ul_title">服务费</h3>
            <ul class="popup_ul">
              <li v-for="(item,index) in searchItems.serviceSelectionVOList" :key="index"
                  @click="searchDictId=item.id;searchProductCategoryId='';searchTitle.product.name=item.name;init()">
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <!--优惠活动-->
        <div v-if="popupModel.code==2">
          <ul class="popup_ul_2" style="width: 100%;overflow: hidden">
            <li
              @click="searchTitle.active.name='活动';discountSearch.code='';discountSearch.key='';init();">
              全部
            </li>
          </ul>
          <div style="width: 100%;overflow: hidden" v-for="(item,index) in discountList"
               v-if="item.lableVOList&&item.lableVOList.length>0">
            <h3 class="popup_ul_title">{{item.title}}</h3>
            <ul class="popup_ul_2">

              <li v-for="(item1,index1) in item.lableVOList"
                  @click="searchTitle.active.name=item1.value;changeSiscount(item,item1)" :key="index1">
                {{item1.value}}
              </li>
            </ul>
          </div>
        </div>
        <div v-if="popupModel.code==3">
          <ul class="popup_ul">
            <li
              @click="searchYear='';searchTitle.year.name='年份';init()">
              全部
            </li>
            <li v-for="(item,index) in years" :key="index"
                @click="searchYear=item;searchTitle.year.name=item;init()">
              {{item}}
            </li>
          </ul>
        </div>
      </popup>
    </div>

    <tabbar v-model="active" :class="{dn:dn==true}" style="background: #ffffff;">
      <tabbar-item link="/">
        <svg slot="icon" class="icon-sm  tabbar_svg" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item link="/product">
        <svg slot="icon" class="icon-sm  tabbar_svg" aria-hidden="true">
          <use xlink:href="#icon-xuanke"></use>
        </svg>
        <span slot="label">选课</span>
      </tabbar-item>
      <tabbar-item link="/cart">
        <svg slot="icon" class="icon-sm  tabbar_svg" aria-hidden="true">
          <use xlink:href="#icon-gouwuche4"></use>
        </svg>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/order">
        <svg slot="icon" class="icon-sm  tabbar_svg" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
        <span slot="label">订单</span>
      </tabbar-item>
    </tabbar>
    <div style="position: absolute;top: 0;bottom: 0;left: 0;right:0;z-index: 503;overflow: hidden;
    background: rgba(0, 0, 0, 0.5);opacity:1" v-if="showDialogClass" @click="showDialogClass=false">
    </div>
  </div>
</template>
<script>
  import {
    Popup,
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XInput,
    XDialog,
    TransferDomDirective as TransferDom,
    XButton,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Search,
    LoadMore,
    Scroller,
    Divider
  } from "vux";
  import BasicVue from "@/components/product/basic.vue";
  import NetClassVue from "@/components/product/netClass.vue";
  import OneToOneVue from "@/components/product/oneToOne.vue";
  import RainbowVue from "@/components/product/rainbow.vue";
  import BookVue from "@/components/product/book.vue";
  import ServiceVue from "@/components/product/service.vue";
  import Bus from "@/util/bus.js";

  export default {
    data() {
      return {
        leftArrow: false,
        onFetching: false,
        // upobj: {
        //   content: "请上拉刷新数据",
        //   pullUpHeight: 60,
        //   height: 40,
        //   // autoRefresh: false,
        //   downContent: "请上拉刷新数据",
        //   upContent: "请上拉刷新数据",
        //   loadingContent: "加载中...",
        //   clsPrefix: "xs-plugin-pullup-"
        // },
        errorImage: 'this.src="' + require("../../styles/img/wd.png") + '"',
        imgesSrc(item) {
          if ("" != item.id) {
            return (
              process.env.UPLOAD +
              this.api.iSee.url +
              item.id +
              "?token=" +
              item.token
            );
          }
        },
        dn: false,
        fullHeight: document.documentElement.clientHeight,
        active: 1,
        years: [],
        searchName: "",
        searchYear: "",
        searchProductCategoryId: "", //产品
        searchDictId: "", //  服务和商品
        searchCategoryId: "", //
        discountSearch: {
          code: "",
          key: "",
        },
        showDialogName: false,
        bottomLine: false,
        showDialogClass: false,
        category: -1, //判断弹窗类型
        searchItems: {},
        popupModel: {
          show: false,
          code: 0
        },
        searchTitle: {
          product: {name: "产品", code: 1, clickFlag: false},
          active: {name: "活动", code: 2, clickFlag: false},
          year: {name: "年份", code: 3, clickFlag: false}
        },
        productlist: [],
        productFrom: {
          bookPrice: [], //教材费默认选中
          formBookPrice: [], //教材费
          formHotel: [], //住宿费
          serveVOList: [],
          presentVOList: [],
          fromGiftList: [], //赠品默认选中
          formRoundValue: 1
        },
        currentPage: 1,
        currentCount: 10,
        discountList: [],//优惠列表

      };
    },
    mounted() {
      XuntongJSBridge.call("setWebViewTitle", {title: "产品列表"});
      let self = this;
      Bus.$on("msg", e => {
        this.showDialogClass = e;
      });
      for (
        var i = new Date().getFullYear() + 3;
        i > new Date().getFullYear() - 1;
        i--
      ) {
        this.years.push(i);
      }
      this.searchCategoryList();
      this.selectDiscount();
      const that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight;
        })();
      };
    },
    methods: {
      changeSiscount(item, item1) {
        this.discountSearch.code = item.code;
        this.discountSearch.key = item1.key;
        this.init()
      },
      /**
       * 查询优惠
       */
      selectDiscount() {
        this.axios.post(this.api.product.discountList.url)
          .then((res) => {
            this.discountList = res.data.data;
          })


      },
      cancelProduct() {
        this.showDialogName = false;
        this.currentPage = 1;
        this.productlist = [];
        this.selectList();
      },
      blueSearchName() {
        this.searchName = this.searchName;
      },
      init() {
        this.currentPage = 1;
        this.productlist = [];
        this.popupModel.show = false;
        this.selectList();
      },
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          if (this.bottomLine == false) {

            setTimeout(() => {
              this.currentPage++;
              this.selectList();
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset();
              })
              this.onFetching = false
            }, 2000)
          }
        }
      },
      /**
       * chaxun
       */
      searchCategoryList() {
        this.axios
          .post(this.api.product.listSelection.url, {})
          .then(res => {
            this.searchItems = res.data.data;
            if (this.$route.params.id) {
              this.searchProductCategoryId = this.$route.params.id;
              for (
                var i = 0;
                i < this.searchItems.goodsSelectionVOList.length;
                i++
              ) {
                if (
                  this.searchProductCategoryId ==
                  this.searchItems.goodsSelectionVOList[i].id
                ) {
                  this.searchTitle.product.name = this.searchItems.goodsSelectionVOList[
                    i
                    ].name;
                }
              }
              for (
                var i = 0;
                i < this.searchItems.serviceSelectionVOList.length;
                i++
              ) {
                if (
                  this.searchProductCategoryId ==
                  this.searchItems.serviceSelectionVOList[i].id
                ) {
                  this.searchTitle.product.name = this.searchItems.serviceSelectionVOList[
                    i
                    ].name;
                }
              }
            }
            this.selectList();
          });
      },
      selectList() {
        if (this.productlist.length % 10 == 0) {
          this.$vux.loading.show({
            text: "加载中"
          });
          this.axios
            .post(this.api.product.list.url, {
              blurSearch: {},
              order: {},
              page: this.currentPage,
              pageNum: this.currentCount,
              search: {
                name: this.searchName,
                year: this.searchYear,
                productCategoryId: this.searchProductCategoryId,
                dictId: this.searchDictId,
                categoryId: this.searchCategoryId,
                searchDiscount: this.discountSearch
              }
            })
            .then(res => {
              this.$vux.loading.hide();
              var items = res.data.data;
              if (items.length < 10) {
                this.bottomLine = true;
              } else {
                this.bottomLine = false;
              }
              for (var i = 0; i < items.length; i++) {
                items[i].costType=false;
                if(items[i].serviceCostJson&&items[i].serviceCostJson != "" && items[i].serviceCostJson != null){
                  items[i].serviceCostJson=JSON.parse(items[i].serviceCostJson);
                }
                for(var j=0;j<items[i].serviceCostJson.length;j++){
                    if(items[i].serviceCostJson[j].type=='1'){
                      items[i].costType=true;
                    }
                }
                this.productlist.push(items[i]);
              }
            })
            .catch(function (error) {
              this.$vux.loading.hide();
            });
        }
      },
      hide() {
        this.searchTitle.product.clickFlag = false;
        this.searchTitle.active.clickFlag = false;
        this.searchTitle.year.clickFlag = false;
      },
      conditionDiv(item) {
        //点击弹出条件层
        this.popupModel.show = !item.clickFlag;
        this.popupModel.code = item.code;
        this.searchTitle.product.clickFlag = false;
        this.searchTitle.active.clickFlag = false;
        this.searchTitle.year.clickFlag = false;
        item.clickFlag = true;
      },
      selectProduct(item) {
        this.axios
          .post(this.api.product.choose.url, {
            id: item.id,
            productType: item.productType
          })
          .then(res => {
            var items = res.data.data;
            if (items.classVO) {
              items.classVO.costType=false;
              if(items.classVO.serviceCostJson&&items.classVO.serviceCostJson != "" && items.classVO.serviceCostJson != null){
                items.classVO.serviceCostJson=JSON.parse(items.classVO.serviceCostJson);
                for(var j=0;j<items.classVO.serviceCostJson.length;j++){
                if(items.classVO.serviceCostJson[j].type=='1'){
                   items.classVO.costType=true;
                  }
                }
              }
            }
            if(items.packageVO){
              items.packageVO.costType=false;
              if(items.packageVO.serviceCostJson&&items.packageVO.serviceCostJson != "" && items.packageVO.serviceCostJson != null){
                items.packageVO.serviceCostJson=JSON.parse(items.packageVO.serviceCostJson);
                for(var j=0;j<items.packageVO.serviceCostJson.length;j++){
                  if(items.packageVO.serviceCostJson[j].type=='1'){
                    items.packageVO.costType=true;
                  }
                }
              }
            }

            switch (items.dialogType * 1) {
              case 0:
                //基本
                if (items.classVO) {
                  this.productFrom = items.classVO;
                } else {
                  this.productFrom = items.packageVO;
                  this.productFrom.presentVOList = items.packageVO.presentVOList; //赠品
                }
                var hotList = [];
                if (this.productFrom.serveVOList) {
                  for (
                    var i = 0;
                    i < this.productFrom.serveVOList.length;
                    i++
                  ) {
                    hotList.push(
                      this.productFrom.serveVOList[i].key
                    );
                  }
                }
                this.productFrom.formHotel = hotList;
                this.publicFrom(item);
                this.productFrom.formRoundValue = 1;
                break;
              case 1:
                //彩虹卡

                this.productFrom = items.packageVO;
                this.productFrom.signDiscountPrice = item.signDiscountPrice
                  ? item.signDiscountPrice
                  : 0; //优惠价
                this.productFrom.discountPrice = item.discountPrice
                  ? item.discountPrice
                  : 0; //原价
                this.productFrom.productType = item.productType; //原价
                this.productFrom.formCategory = {}; //当前选择的组合
                this.productFrom.presentVOList = items.packageVO.presentVOList; //赠品
                this.productFrom.fromGiftList = [];
                if (this.productFrom.presentVOList && this.productFrom.presentVOList.length > 0) {
                  for (var i = 0; i < this.productFrom.presentVOList.length; i++) {
                    this.productFrom.fromGiftList.push(this.productFrom.presentVOList[i].key)
                  }
                }
                this.productFrom.formRoundValue = 1;
                this.productFrom.isFree = '1';
                this.productFrom.classDisplay = true;
                break;
              case 2:
                //一对一
                this.productFrom = items.packageVO;
                this.productFrom.formRoundValue = 1;
                this.publicFrom(item);
                break;
              case 6:
                //班型一对一
                this.productFrom = items.classVO;
//                this.productFrom.formRoundValue = this.productFrom.courseTimeSum;
                this.productFrom.formRoundValue = this.productFrom.setCourseTimeSum;
                this.productFrom.oneByonenumCount = 1;
                this.productFrom.dialogType = items.dialogType;
                this.publicFrom(item);
                break;
              case 3:
                //网课

//                this.productFrom = items.packageVO;
//                this.productFrom.formRoundValue = 1;
//                this.publicFrom(item);
//                break;
              case 4:
                //服务
                this.productFrom = items.serveVO;
                this.productFrom.formRoundValue = 1;
                this.publicFrom(item);
                break;
              case 5:
                //图书
                this.productFrom = items.bookVO || items.otherVO;
                this.productFrom.formRoundValue = 1;
                this.publicFrom(item);
                break;
            }
            this.productFrom.formCategory = this.productFrom.groupVOList? this.productFrom.groupVOList[0]:""; //当前选择的组合
            this.category = items.dialogType * 1;
            this.showDialogClass = true;
          });
      },
      publicFrom(item) {
        this.productFrom.classDisplay = true;
        this.productFrom.productType = item.productType;
        this.productFrom.isFree = '1'
        this.productFrom.signDiscountPrice = item.signDiscountPrice
          ? item.signDiscountPrice
          : 0; //优惠价
        this.productFrom.discountPrice = item.discountPrice
          ? item.discountPrice
          : 0; //原价
        this.productFrom.fromGiftList = [];
        this.productFrom.countPrice = 0;
        this.productFrom.originalBookPrice = 0;
        if (this.productFrom.bookPrice) {
          this.productFrom.originalBookPrice = this.productFrom.bookPrice;
          this.productFrom.bookPrice = [
            {
              key: this.productFrom.bookPrice,
              value: "教材费",
              inlineDesc: "￥" + this.productFrom.bookPrice
            }
          ];
          this.productFrom.formBookPrice = [this.productFrom.bookPrice[0].key]; //存放教材费
        } else {
          this.productFrom.bookPrice = [];
          this.productFrom.formBookPrice = [];
        }
        if (this.productFrom.presentVOList) {
          for (var i = 0; i < this.productFrom.presentVOList.length; i++) {
            this.productFrom.fromGiftList.push(
              this.productFrom.presentVOList[i].key
            );
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XInput,
      XDialog,
      XButton,
      Flexbox,
      FlexboxItem,
      BasicVue,
      Popup,
      Grid,
      GridItem,
      NetClassVue,
      OneToOneVue,
      RainbowVue,
      BookVue,
      ServiceVue,
      Search,
      LoadMore,
      Scroller,
      Divider,
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    watch: {

      fullHeight(val) {
        if (this.fullHeight <= 500) {
          this.dn = true;
        } else {
          this.dn = false;
        }
      }
    }
  };
</script>
<style lang="scss" type="text/scss">

  .product_div > * {
    font-size: 14px !important;
    .weui-cells {
      font-size: 14px !important;
    }

    .vux-number-selector,
    .vux-number-selector,
    .vux-number-input {
      height: 80px;
      line-height: 80px;
      font-size: 12px;
    }

    .vux-number-input {
      color: #888;
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  .weui-input {
    font-size: 0.28rem;
    color: #666666;
  }

  /*table {border-collapse: collapse;}*/
  /*table,table tr th, table tr td { border:1px solid #0094ff; }*/
  .product_content {
    // padding-left:0.15rem;
    /*padding-top: 1.53rem;*/
    text-align: left;
    width: 100%;
    height: 100%;
    .content_table {
      width: 100%;
      height: auto;
      tbody {
        width: 100%;
      }
      td {
        border-collapse: collapse;
        // padding-top:0.1rem;
        color: #333333;
        font-weight: normal;
        font-size: 0.28rem;
        line-height: 0.44rem;
      }
      .tr_text {
        .tr_title {
          width: 6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 0.6rem;
          padding-left: 0.15rem;
          margin-top: 0.1rem;
        }
      }
      .tr_cart {
        height: 20px;
      }
      .tr_discount {
        height: 20px;
        ul {
          margin-top: 0.08rem;
          margin-bottom: 0.08rem;
          overflow: hidden;
          li {
            text-align: center;
            float: left;
            float: left;
            // height: 20px;
            line-height: 0.4rem;
            padding: 0 0.1rem;
            box-sizing: border-box;
            border: 1px solid #cacaca;
            overflow: hidden;
            font-style: normal;
            font-size: 12px;
            /*font-family: '微软雅黑', -apple-system-font, Helvetica Neue, sans-serif !important;*/
            border-radius: 3px;
            color: #666666;
            margin-left: 0.2rem;
            // margin-right:0.1rem;
          }
        }
      }
    }
  }

  .tabbar_svg {
    font-size: 12px;
  }

  .gouwuche_svg {
    width: 1.5em;
    height: 1.5em;
  }

  .svg_cart {
    width: 1.5em;
    height: 1.5em;
    margin-right: 5px;
    border: 2px solid #f50;
    border-radius: 30px;
    float: right;
    background: #f50;
    text-align: center;
    margin-top: 8px;
    margin-right: 17px;
  }

  .search_title_right {
    margin-top: 0.18rem;
    margin-right: 0.16rem;
    border-radius: 40px;
    float: right;
    line-height: 0.55rem;
    height: 0.55rem;
    width: 50px;
    background-image: linear-gradient(to right, #ff9000 0, #ff5000 100%);
    color: #ffffff;
    font-weight: 600;
  }

  .search_title_input {
    width: 80%;
    margin-left: 0.12rem;
    margin-top: 0.16rem;
    background: #efeff4;
    height: 0.6rem;
    line-height: 0.6rem;
    border: 1px solid #f1f1f1;
    border-radius: 20px;
    float: left;
  }

  .title_icon {
    margin-top: 0.14rem;
    margin-left: 0.1rem;
    width: 1.3em;
    height: 1.3em;
    float: left;
    line-height: 30px;
    height: 30px;
    color: #8888;
  }

  .active {
    width: 75% !important;
  }

  .dn {
    display: none;
  }

  .product_div {
    height: 100%;
    width: 100%;
    text-align: center;
    background: url("../../styles/img/wd.png");
    background-size: 100%;
    .product_title {
      border-bottom: 1px solid #e7e3e7;
      z-index: 501;
      overflow: hidden;
      position: fixed;
      background: #ffffff;
      top: 0;
      left: 0;
      right: 0;
      .product_contet_search {
        width: 100%;
        height: 0.58rem;
        line-height: 0.58rem;
        font-weight: 600;
        .vux-flexbox {
          text-align: center;
        }
        .flex-demo {
          text-align: center;
          font-size: 0.3rem;
          color: #555555;
          font-weight: normal;
          .icon-sm {
            width: 1em;
            height: 1em;
            vertical-align: -0.18em;
            fill: currentColor;
            overflow: hidden;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }

  .popup_ul_title {
    color: #333333;
    font-size: 0.3rem;
    line-height: 0.4rem;
  }

  .popup_ul {
    width: 100%;
    font-size: 14px;
    // li:hover {
    //     background: #1c7eff;
    //     color:white;
    // }
    li {
      /*overflow: hidden;*/
      /*white-space: nowrap;*/
      /*text-overflow: ellipsis;*/
      border: 1px solid #eee;
      float: left;
      cursor: pointer;
      margin: 0.1rem;
      padding: 0 0.27rem;
      font-size: 0.26rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      background: #f7f7f7;
      color: #666666;
      border-radius: 4px;
    }
  }

  .popup_ul_2 {
    width: 100%;
    padding: 5px;
    font-size: 14px;

    li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border: 1px solid #eee;
      float: left;
      cursor: pointer;
      margin: 0.1rem;
      padding: 0 0.27rem;
      font-size: 0.26rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      background: #f7f7f7;
      color: #666666;
      border-radius: 4px;
    }
  }

  .weui-vcode {
    border: 1px solid #ffffff;
    background: #f4f4f4;
    line-height: 35px;
    height: 35px;
    float: left;
    width: 80%;
    border-radius: 20px;
  }

  .dialog_title {
    overflow: hidden;
    padding: 5px;
    .title_button {
      float: right;
      width: 20%;
      line-height: 40px;
      border: 0;
    }
    .input_class {
      height: 25px;
      line-height: 25px;
    }
    .dialog_div {
      height: 100%;
      overflow-y: auto;
    }
  }

  .b {
    font-weight: 700;
    color: #999;
  }

  .search_title_div {
    width: 100%;
    overflow: hidden;
    height: 0.95rem;
    position: relative;
    // border-bottom:1px solid red;
    overflow: hidden;
  }

  body
  .weui-cells_checkbox
  .weui-check:checked
  + .vux-checklist-icon-checked:before {
    color: #30a6ff;
  }

  .searchStudent {
    display: block;
    width: 6.9rem;
    height: 0.68rem;
    font-size: 0.28rem;
    text-align: center;
    margin: 0.15rem auto 0;
    background: #f4f4f4;
    border-radius: 15px;
    color: #666666;
  }

  .boxNone {
    width: 100%;
    height: 1.53rem;
  }

  // @media screen and (min-width: 720px) and (max-width: 749px) {

  // }
</style>
