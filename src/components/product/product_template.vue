<template>
  <div class="produc_bottom_tabbar_div" style="height: 100%;">
    <div class="prodct_content_div" style="overflow-y: auto;height: 100%;">
      <flexbox class="title">
        <div class="phone_product_content phone_product_height"
             style="width: 90%;padding-left:3px;box-sizing:border-box;">
          <span style="font-size: 0.34rem;" v-if="productFrom.costType&&productFrom.costType==true">[协议]
          </span>{{productFrom.name}}
        </div>
      </flexbox>
      <flexbox class="title" v-if="productFrom.courseType&&productFrom.courseType=='FORMAL'&&productFrom.isAudition==1">
        <div class="phone_product_content phone_product_height" style="width: 80%;    display: inline-table;">
          <checker v-model.trim="isFree" radio-required default-item-class="demo1-item"
                   selected-item-class="demo1-item-selected">
            <checker-item value="1" style="height: 30px;line-height: 30px;padding: 0 20px;">正式课</checker-item>
            <checker-item value="0" style="height: 30px;line-height: 30px;padding: 0 20px;">0元试听</checker-item>
          </checker>
        </div>
      </flexbox>
      <flexbox>
        <div class="phone_product_height title">
          <span style="padding-left:0.15rem;box-sizing:border-box;font-size: 0.34rem;color:#fa760b"
                v-if="productFrom.signDiscountPrice==productFrom.discountPrice">￥{{productFrom.discountPrice}}</span>
          <ul v-else style=" width: 100%;overflow: hidden;">
            <li style="float: left;margin-right: 20px;">
              <span style="color: #f56016;font-size: 0.34rem;padding-left: 3px;box-sizing:border-box;">优惠价:￥{{productFrom.signDiscountPrice }}</span>
            </li>
            <li style="float: left">
              <span style="color: #999;text-decoration:line-through;font-size: 0.22rem;color: rgb(230, 230, 230);">原价:
                <b>￥{{productFrom.discountPrice}} </b>
              </span>
            </li>
          </ul>
        </div>
      </flexbox>
      <flexbox>
        <slot name="content"></slot>
      </flexbox>
      <flexbox v-if="isFree==1">
        <slot name="bottom"></slot>
        <!--赠品/教材-->
      </flexbox>

      <flexbox>
        <slot name="round"></slot>
        <!--加减-->
      </flexbox>
      <flexbox v-if="isFree==1">
        <div style="width: 100%;" v-if="productFrom.productType==1">
          <ul class="class_ul" @click="selectClass(1)">
            <li class="class_ul_first_li">
              <span class=" class_span">选择预设班级</span>
            </li>
            <li class="class_ul_right_li" v-if="productFrom.dialogType!=6">
              <span>课时数:{{productFrom.setCourseTimeSum}}</span>
              <svg aria-hidden="true" class="icon icon-sm" @click.stop="updateTime(productFrom)">
                <use data-v-634930a2="" xlink:href="#icon-ICONbiaozhun_fuzhi-"></use>
              </svg>
            </li>
          </ul>

          <!--<transition-group name="fade1" mode="out-in">-->
          <div class="transition_div" :class="{displayNone:defaultIndex>0}" :key="new Date().getTime()">
            <checker v-model.trim="productFrom.predictId" radio-required default-item-class="demo2-item"
                     selected-item-class="demo2-item-selected" @on-change="">
              <checker-item :value="item.id" v-for="(item, index) in productFrom.predictVOList" :key="index"
                            style="font-size: 14px;overflow:hidden; white-space: nowrap;text-overflow: ellipsis; ">
                {{item.name}}
              </checker-item>
            </checker>
          </div>
          <!--</transition-group>-->
        </div>
        <div style="width: 100%;" v-else-if="productFrom.productType==2">
          <div style="margin-right: 20px;" @click="classDisplayClick" v-if="productFrom.groupVOList.length>0">
            <span class="class_span">选择预设班级</span>
          </div>

          <div v-for="(item, index) in productFrom.groupVOList" v-if="classDisplay==false">
            <!--classDisplay-->
            <div v-if="item.value">
              <div v-for="(item1, index1) in item.classVOList" v-if="productFrom.formCategory.key==item.key">
                <ul class="class_ul" @click="selectClass(index1)">
                  <li class="class_ul_first_li">班型:{{item1.name}}</li>
                  <li class="class_ul_right_li">
                    <span>课时数:{{item1.setCourseTimeSum}}</span>
                    <svg aria-hidden="true" class="icon icon-sm" @click.stop="updateTime(item1)">
                      <use data-v-634930a2="" xlink:href="#icon-ICONbiaozhun_fuzhi-"></use>
                    </svg>
                  </li>
                </ul>
                <!--<transition-group name="fade1" mode="out-in">-->
                <div class="transition_div" :class="{displayNone:index1!=defaultIndex}" :key="new Date().getTime()">
                  <checker v-model.trim="item1.predictId" radio-required default-item-class="demo2-item"
                           selected-item-class="demo2-item-selected">
                    <checker-item :value="item2.id" v-for="(item2, index2) in item1.predictVOList" :key="index2"
                                  style="font-size: 14px;overflow:hidden; white-space: nowrap;text-overflow: ellipsis; ">
                      {{item2.name}}
                    </checker-item>
                  </checker>
                </div>
                <!--</transition-group>-->
              </div>
            </div>

            <div v-else>
              <div v-for="(item1, index1) in item.classVOList">
                <ul class="class_ul" @click="selectClass(index1)">
                  <li class="class_ul_first_li">班型:{{item1.name}}</li>
                  <li class="class_ul_right_li">
                    <span>课时数:{{item1.setCourseTimeSum}}</span>
                    <svg aria-hidden="true" class="icon icon-sm" @click.stop="updateTime(item1)">
                      <use data-v-634930a2="" xlink:href="#icon-ICONbiaozhun_fuzhi-"></use>
                    </svg>
                  </li>
                </ul>
                <!--<transition-group name="fade1" mode="out-in">-->
                <div class="transition_div" :class="{displayNone:index1!=defaultIndex}" :key="new Date().getTime()">
                  <checker v-model.trim="item1.predictId" radio-required default-item-class="demo2-item"
                           selected-item-class="demo2-item-selected">
                    <checker-item :value="item2.id" v-for="(item2, index2) in item1.predictVOList" :key="index2"
                                  style="font-size: 14px;">
                      {{item2.name}}
                    </checker-item>
                  </checker>
                </div>
                <!--</transition-group>-->
              </div>
            </div>

          </div>
        </div>
      </flexbox>
      <flexbox v-if="isFree==1">
        <slot name="total"></slot>
        <!--合计-->
      </flexbox>
      <flexbox v-else>
        <div class="total_div">合计：
          <span>0</span>
        </div>
      </flexbox>
    </div>
    <tabbar v-if="productFrom.formRoundValue>0">
      <tabbar-item @on-item-click="addCart">
        <div slot="label" style="height: 60px;line-height: 55px;">
          <div class="tabbar_div_slot" style="background-color:#30a6ff ;color: #ffffff">加入购物车</div>
        </div>
      </tabbar-item>
      <tabbar-item @on-item-click="addBui">
        <div slot="label" style="height: 60px;line-height: 55px;">
          <div class="tabbar_div_slot" style="background-color:#fa760b ;color: #ffffff">立即购买</div>
        </div>
      </tabbar-item>
    </tabbar>

    <tabbar v-else>
      <tabbar-item @on-item-click="errorClick">
        <div slot="label" style="height: 60px;line-height: 55px;">
          <div class="tabbar_div_slot" style="background-color:#cccccc ;color: #ffffff">加入购物车</div>
        </div>
      </tabbar-item>
      <tabbar-item @on-item-click="errorClick">
        <div slot="label" style="height: 60px;line-height: 55px;">
          <div class="tabbar_div_slot" style="background-color:#888888 ;color: #ffffff">立即购买</div>
        </div>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {
    Flexbox,
    FlexboxItem,
    Tabbar,
    TabbarItem,
    Alert,
    Checker,
    CheckerItem,
    Confirm
  } from "vux";
  import Bus from "@/util/bus.js";

  export default {
    props: ["productFrom"],
    data() {
      return {
        classDisplay: true,
        displayList: [],
        defaultIndex: -1,
        isFree: "1"
      };
    },
    mounted() {
    },
    methods: {
      classDisplayClick() {
        this.productFrom.classDisplay = !this.productFrom.classDisplay;
        this.classDisplay = this.productFrom.classDisplay;
      },
      updateTime(item) {
        const _this = this;
        this.$vux.confirm.prompt("请输入课时数", {
          title: "修改课时数",
          onShow() {
            _this.$vux.confirm.setInputValue(item.setCourseTimeSum);
          },
          onHide() {
          },
          onCancel() {
          },
          onConfirm(msg) {
            var str = /^[0-9]*$/;
            if (!str.test(msg)) {
              _this.$vux.toast.show({
                text: "请输入正确的课时数",
                type: "warn"
              });
              item.setCourseTimeSum = item.courseTimeSum;
              return;
            }
            if (msg < 1 || msg == "") {
              _this.$vux.toast.show({
                text: "课时数不能小于1",
                type: "warn"
              });
              item.setCourseTimeSum = item.courseTimeSum;
              return;
            }
            if (msg > item.courseTimeSum) {
              _this.$vux.toast.show({
                text: "课时数不能大于原课时数",
                type: "warn"
              });
              item.setCourseTimeSum = item.courseTimeSum;
              return;
            }
            item.setCourseTimeSum = msg;
          }
        });
      },
      selectClass(index) {
        if (index == this.defaultIndex) {
          this.defaultIndex = -1;
        } else {
          this.defaultIndex = index;
        }
      },
      errorClick() {
      },
      changeIsFree(val) {
        this.productFrom.isFree = val;
      },
      addCart() {
        this.productFrom.productType = this.productFrom.productType;
        var productServiceVOS = [];
        if (
          this.productFrom.formHotel &&
          this.productFrom.formHotel.length > 0
        ) {
          for (var i = 0; i < this.productFrom.formHotel.length; i++) {
            productServiceVOS.push({
              serviceId: this.productFrom.formHotel[i]
            });
          }
        }
        var param = {};
        if (this.productFrom.dictCode == "HOTELCOST") {
          if (this.productFrom.endTime == "") {
            this.$vux.alert.show({
              content: "请选择开始时间!"
            });
            return;
          }
          if (
            this.productFrom.formRoundValue == "" ||
            this.productFrom.formRoundValue == 0
          ) {
            this.$vux.alert.show({
              content: "请输入住宿天数!"
            });
            return;
          }
          param = {
            goodsId: this.productFrom.id, //选择产品的id
            numCount: this.productFrom.formRoundValue + "", //数量
            packageGroupId: this.productFrom.formCategory
              ? this.productFrom.formCategory.key
              : "", //组合的id要是没有就不传
            productType: this.productFrom.productType, //产品的类型
            productServiceVOS: productServiceVOS,
            startTime:
            new Date(this.productFrom.startTime).getTime() / 1000,
            endTime: this.productFrom.endTime
          };
        } else {
          param = {
            goodsId: this.productFrom.id, //选择产品的id
            numCount: this.productFrom.formRoundValue + "", //数量
            packageGroupId: this.productFrom.formCategory
              ? this.productFrom.formCategory.key
              : "", //组合的id要是没有就不传
            productType: this.productFrom.productType, //产品的类型
            productServiceVOS: productServiceVOS
          };
        }
        var productClassVOS = [];
        if (this.productFrom.productType == 1) {
          productClassVOS.push({
            classId: this.productFrom.id,
            predictId: this.productFrom.predictId
          });
          if (this.productFrom.dialogType != 6) {
            productClassVOS[0].realCourseTimeSum = this.productFrom.setCourseTimeSum;
          } else {
            productClassVOS[0].realCourseTimeSum = this.productFrom.formRoundValue;
          }
        }
        if (this.productFrom.productType == 2) {
          for (var i = 0; i < this.productFrom.groupVOList.length; i++) {
            var item = this.productFrom.groupVOList[i];
//            if (item.key == this.productFrom.formCategory.key) {
            if (item.key ==  param.packageGroupId) {
              for (var j = 0; j < item.classVOList.length; j++) {
                var item1 = item.classVOList[j];
                productClassVOS.push({
                  classId: item1.id,
                  predictId: item1.predictId,
                  realCourseTimeSum: item1.setCourseTimeSum
                });
              }
            }
          }
        }





        param.productClassVOS = productClassVOS;

        if (this.productFrom.isFree) {
          param.isFree = this.isFree;
        }
        if (this.productFrom.oneByonenumCount) {
          param.oneByonenumCount = this.productFrom.oneByonenumCount;
        }
        this.axios.post(this.api.cart.save.url, param).then(res => {
          this.$vux.toast.show({
            text: "添加成功!",
            type: "success"
          });
          Bus.$emit("msg", false);
        });
      },
      addBui() {
        this.productFrom.productType = this.productFrom.productType;
        var productServiceVOS = [];
        sessionStorage.setItem("flge", 1);
        if (
          this.productFrom.formHotel &&
          this.productFrom.formHotel.length > 0
        ) {
          for (var i = 0; i < this.productFrom.formHotel.length; i++) {
            productServiceVOS.push({
              serviceId: this.productFrom.formHotel[i]
            });
          }
        }
        var orderFrom = {};
        if (this.productFrom.dictCode == "HOTELCOST") {
          if (this.productFrom.endTime == "") {
            this.$vux.alert.show({
              content: "请选择开始时间!"
            });
            return;
          }
          if (
            this.productFrom.formRoundValue == "" ||
            this.productFrom.formRoundValue == 0
          ) {
            this.$vux.alert.show({
              content: "请输入住宿天数!"
            });
            return;
          }

          orderFrom = {
            id: this.productFrom.id,
            numCount: this.productFrom.formRoundValue + "",
            packageGroupId: this.productFrom.formCategory
              ? this.productFrom.formCategory.key
              : "",
            productType: this.productFrom.productType,
            productServiceVOS: productServiceVOS,
            startTime:
            new Date(this.productFrom.startTime).getTime() / 1000,
            endTime: this.productFrom.endTime
          };
        } else {
          orderFrom = {
            id: this.productFrom.id,
            numCount: this.productFrom.formRoundValue + "",
            packageGroupId: this.productFrom.formCategory
              ? this.productFrom.formCategory.key
              : "",
            productType: this.productFrom.productType,
            productServiceVOS: productServiceVOS
          };
        }
        var productClassVOS = [];
        if (this.productFrom.productType == 1) {
          if (this.productFrom.dialogType != 6) {
            productClassVOS.push({
              classId: this.productFrom.id,
              predictId: this.productFrom.predictId,
              realCourseTimeSum: this.productFrom.setCourseTimeSum
            });
          } else {
            productClassVOS.push({
              classId: this.productFrom.id,
              predictId: this.productFrom.predictId,
              realCourseTimeSum: this.productFrom.formRoundValue
            });
          }
        }

        if (this.productFrom.productType == 2) {
           for (var i = 0; i < this.productFrom.groupVOList.length; i++) {
            var item = this.productFrom.groupVOList[i];
//            if (item.key == this.productFrom.formCategory.key) {
            if (item.key == orderFrom.packageGroupId) {
              for (var j = 0; j < item.classVOList.length; j++) {
                var item1 = item.classVOList[j];
                productClassVOS.push({
                  classId: item1.id,
                  predictId: item1.predictId,
                  realCourseTimeSum: item1.setCourseTimeSum
                });
              }
            }
          }
        }
        if (this.productFrom.oneByonenumCount) {
          orderFrom.oneByonenumCount = this.productFrom.oneByonenumCount;
        }
        orderFrom.productClassVOS = productClassVOS;
        if (this.productFrom.isFree) {
          orderFrom.isFree = this.isFree;
        }
        this.$store.commit("setOrder", [orderFrom]);
        this.$router.push("/orderDetails");
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem,
      Alert,
      Checker,
      CheckerItem,
      Confirm
    },
    watch: {
      "productFrom.classDisplay": function () {
      }
    }
  };
</script>
<style type="text/scss" lang="scss">
  .produc_bottom_tabbar_div {
    .vux-tabbar-simple,
    .weui-tabbar__label {
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  .icon-sm {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.2em;
  }

  .class_span {
    font-size: 0.34rem;
    padding-left: 3px;
    box-sizing: border-box;
    font-size: 16px;
    margin-bottom: 3px;
  }

  .transition_div {
    width: 100%;
    overflow: hidden;
    padding-left: 3px;
  }

  .class_ul {
    margin-right: 20px;
    width: 100%;
    overflow: hidden;
    padding-left: 6px;
    float: left;
    font-size: 14px;
    li {
      line-height: 30px;
    }
    .class_ul_first_li {
      width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 6px;
      float: left;
      font-size: 14px;
    }
    .class_ul_right_li {
      width: 50%;
      float: right;
      text-align: right;
      padding-right: 5px;
    }
  }

  .fade1-enter-active,
  .fade1-leave-active {
    height: auto;
    transition: height 0s, opacity 0.5s;
  }

  .fade1-enter,
  .fade1-leave-active {
    opacity: 0;
    height: 0;
  }

  .displayNone {
    display: none;
  }

  .demo2-item {
    border: 1px solid #ececec;
    padding: 3px 10px;
    margin-top: 3px;
    text-align: center;
    width: 48%;
    margin-right: 1%;
  }

  .demo2-item-selected {
    border: 1px solid #fa760b;
    /*background: #fa760b;*/
  }

  .title {
    // border-bottom: 1px solid #eee;
    width: 100%;
  }

  .phone_product_content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .phone_product_height {
    color: #000000;
    height: 40px;
    line-height: 40px;
    font-size: 0.34rem;
  }

  .product_button_submit {
    bottom: 0.3rem;
    position: absolute;
    right: 0.3rem;
    background: #ffffff;
  }

  .demo1-item {
    color: #fa760b;
    // border: 1px solid #797979;
    background: #ffffff;
  }

  .demo1-item-selected {
    background: #57adec;
    color: #ffffff;
  }

  .eventBtn {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .eventBtn a {
    flex-grow: 1;
    height: 0.98rem;
    line-height: 0.98rem;
    font-size: 0.32rem;
    color: white;
    text-align: center;
  }

  .eventBtn a:nth-of-type(1) {
    background: #30a6ff;
  }

  .eventBtn a:nth-of-type(2) {
    background: #fa760b;
  }
</style>
