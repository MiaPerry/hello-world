<template>
  <div class="order_deatils_div" style="padding-bottom: 45px;border-radius: 0">
    <!--<div class="needPay bgWhite" v-if="!studentData.name">添加学员</div>-->
    <!--人员列表-->
    <div class="odc" style="border-radius: 0;">
      <ul class="order_student_div">
        <li v-if="studentData.name" @click="clickStudent(item)" style="color:#ffffff;text-align: left;font-size: 0.3rem;">
          <div style="width: 100%;text-align:center;color: #000000;">
            {{studentData.name}}
            <!-- <span style="color: #000000;"></span> -->
          </div>
        </li>
        <li v-else style="overflow: hidden" @click="addStudent">
          <span style="float: left;width: 1.2rem;margin-left: 3rem;height: 0.9rem;line-height: 0.9rem;font-size: 12px;">添加学员</span>
          <span
            style="float: left;width: 0.4rem;height: 0.9rem;line-height: 0.9rem;font-size: 22px;color: #3cbaff;">+</span>
        </li>
      </ul>
    </div>
    <div class="needPay bgWhite border">已选商品</div>
    <!--已选产品-->
    <div class="odc">
      <div class="cto">
        <ul>
          <li v-for="(item,index) in orderFrom.productGroups" class="order_content " @click="item.checked=!item.checked"
              :key="index">
            <div class="product_name_div">
              <span class="text_left_float" style="max-width:55%;padding-left:0.3rem;box-sizing:border-box">{{item.productVO.productName}}
                <span style="padding-left:0.2rem;box-sizing:border-box" v-if="item.productVO.numCount>1">*{{item.productVO.numCount}}</span>
              </span>

              <span class="text_rigth_float" v-if="item.signalReductionAmount">
                ￥{{item.allDiscountAmount - item.signalReductionAmount  || 0 | price}}
              </span>
              <span class="text_rigth_float" v-else>
                ￥{{item.allDiscountAmount || 0 | price}}
              </span>
            </div>
            <ul class="deti_pro_ul transition_all product_li" v-if="item.checked==true&&item.productVO.productClassVOS&&item.productVO.productClassVOS.length>0">
              <template v-if="item.productVO.productClassVOS">
                <li class="title_li">班型:</li>
                <li v-for="(item1,index1) in item.productVO.productClassVOS" class="content_li">
                  <div class="content_li_div">
                    {{item1.className}}
                  </div>
                  <span class="content_li_span">
                    ￥{{item1.discountPrice || 0 | price}}
                  </span>
                </li>
              </template>

              <template v-if="item.bookDiscountAmount">
                <li class="title_li">教材费:</li>
                <li class="content_li">

                  <div class="content_li_div">
                    教材费总计
                  </div>
                  <span class="content_li_span">
                    ￥{{item.bookDiscountAmount || 0 | price}}
                  </span>
                </li>
              </template>
              <template v-if="item.serviceDiscountAmount">
                <li class="title_li">服务费:</li>
                <li class="content_li">
                  <div class="content_li_div">
                    服务费总计
                  </div>
                  <span class="content_li_span">
                    ￥{{item.serviceDiscountAmount || 0 | price}}
                  </span>
                </li>
              </template>

              <template v-if="item.productVO.productPresentVOS">
                <li class="title_li">赠品:</li>
                <li v-for="(item1,index1) in item.productVO.productPresentVOS" class="content_li">
                  <div class="content_li_div">
                    {{item1.productName }}
                  </div>
                  <span class="content_li_span" v-if="item1.discountAmount">

                  </span>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--金额-->
    <div class="needPay bgWhite border">合计金额</div>
    <div class="odc">
      <div class="cto">
        <div class="order_content">
          <span class="text_left_float">总金额</span>
          <span class="text_rigth_float" style="color: #f66513">
            <b>￥{{orderFrom.saleAmount || 0 | price}}</b>
          </span>
        </div>
        <div class="order_content">
          <span class="text_left_float">实际支付金额</span>
          <span class="text_rigth_float" style="color: #f66513">
            <b>￥{{orderFrom.realPayAmount || 0 | price}}</b>
          </span>
        </div>
      </div>
    </div>
    <!--优惠-->
    <div class="odc">
      <div class="cto">
        <ul>
          <li class="order_content">
            <span class="text_left_float">优惠</span>
            <span class="text_rigth_float" style="color: #f66513">
              <b>-￥{{orderFrom.reduceAllAmount || 0 |price}}</b>
            </span>
          </li>
        </ul>
      </div>
      <!-- 定金抵扣 -->
      <div class="cto" v-if="earnestAmount>0">
        <ul>
          <li class="order_content">
            <span class="text_left_float">定金抵扣</span>
            <span class="text_rigth_float" style="color: #f66513">
              <b>-￥{{earnestAmount || 0 |price}}</b>
            </span>
          </li>
          <li>
            <div class="order_content color_text earnest_div">
              <checklist style="width:100%;border: 0;font-size: 8px;" label-position="right" :max="1" required
                         :options="depositList" v-model.trim="isEarnest"></checklist>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <!--业绩归属-->
    <div class="needPay bgWhite border">业绩归属</div>
    <div class="odc">
      <div class="cto">
        <ul class="attrib_ul">
          <li class="order_content" v-for="(item,index) in newPersion" :key="index" @click="clickPeople(item,index)">
            <img :src="item.photoUrl">
          </li>
          <li class="order_content" @click="clickAddPersion" style="line-height: 38px;">
            <b style="font-size: 22px;">+</b>
          </li>
        </ul>
      </div>
    </div>
    <!--付款方式-->
    <div class="needPay  border" style="background:white">付款方式</div>
    <div class="odc" v-if="productType!='6'">
      <div class="cto">
        <div class="order_content color_text">
          <checklist style="width:100%;border: 0;" label-position="right" :max="1" required :options="paymentMethodList"
                     v-model.trim="paymentMethod"></checklist>
        </div>
      </div>
    </div>
    <!--备注-->
    <div class="needPay bgWhite border" style="border-bottom:none">备注</div>
    <textarea name="" id="" cols="30" rows="10" v-model.trim="remark"></textarea>
    <!--添加学员-->
    <popup v-model.trim="studentVali" @on-hide="closeStudent" hide-on-blur height="80%" width="100%" position="right" v-if="studentVali==true"
           style="background-color:#f9f9f9;overflow: hidden">
      <StudentVue :studentFromTransmit="studentFromTransmit"  ref="studentFromTransmit"></StudentVue>
    </popup>
    <!--添加员工-->
    <!--<popup v-model.trim="studentVali" hide-on-blur  height="100%" position="top" style="background-color:#f9f9f9; ">-->
    <popup v-model.trim="attribVali" height="100%" position="right">
      <div style="width:100%; overflow: hidden;">
        <div style="width: 100%;overflow: hidden;height: 44px;    z-index: 502;position: relative;">
          <search v-model.trim="searchAttribName" position="absolute" auto-scroll-to-top top="0px" readonly ref="search"
                  :cancel-text="searchAttribName!=''?'搜索':'取消'" @on-submit="searchAttrib"
                  @on-cancel="cancelPeople(searchAttribName)" @on-clear="searchAttrib()" placeholder="请输入员工姓名"></search>
        </div>

        <div class="odc" style="padding: 0;margin:  3px; width: auto;padding: 0 3px;" v-if="searchPeopleList.length>0">
          <div class="order_title" style="text-align: left;height: 20px;line-height: 20px;">搜索员工</div>
          <ul class="people_ul" style="height:180px;overflow-y: auto">
            <li v-for="(item,index) in searchPeopleList" :key="index">
              <img :src="item.photoUrl" class="text_left_float" style="width: 40px;height: 40px;padding-left:0 ">
              <div class="text_left_float " style="padding-left: 10px;width: 75%;">
                <div class="search_people_name phone_product_content">{{item.fUserName}}</div>
                <div class="search_people_name phone_product_content">{{item.forgLongName}}</div>
              </div>
              <div class="text_rigth_float people_ul_add" style="margin:8px 0">
                <svg class="icon-sm" aria-hidden="true" @click="addPeople(item)">
                  <use xlink:href="#icon-tianjiarenyuan"></use>
                </svg>
              </div>
            </li>
          </ul>
        </div>

        <div id="odc" class="odc" style="padding: 0;margin:  3px; width: auto;padding: 0 3px;"
             v-if="peopleList.length>0">
          <div class="order_title" style="text-align: left;line-height: 0.5rem;font-size:0.2rem">已加入人员</div>
          <swipeout class="vux-1px-tb">
            <swipeout-item transition-mode="follow" v-for="(item,index) in peopleList" :key="index">
              <div slot="right-menu" v-if="!item.own">
                <swipeout-button type="warn" @click.native="delPeople(item,index)">删除</swipeout-button>
              </div>
              <div slot="content" class="people_select_div">
                <div class="text_left_float" style="padding-left:0;margin-right:0.1rem">
                  <img :src="item.photoUrl" style="width: 0.8rem;height: 0.8rem;padding-left:0 ">
                </div>

                <div class="text_left_float " style="padding-left: 10px;width:60%;">
                  <div class="search_people_name phone_product_content">{{item.fUserName}}</div>
                  <div class="search_people_name phone_product_content">{{item.forgLongName}}</div>
                </div>
                <div class="text_rigth_float" style="width: 25%;padding-right: 0">
                  <x-input v-model.trim="item.rate" placeholder="0" text-align="right" placeholder-align="right"
                           :max="3" style="font-size:0.2rem;" mask="999" :show-clear="false" maxlength="2">
                    <span slot="right">%</span>
                  </x-input>
                </div>
              </div>
            </swipeout-item>
          </swipeout>

        </div>

        <tabbar :class="{dn:dn==true}">
          <tabbar-item @click.native="returnPersion">
            <span slot="label" style="color: #999999">返回</span>
          </tabbar-item>
          <tabbar-item @click.native="peopleSubmit">
            <span slot="label" style="color: #999999">保存</span>
          </tabbar-item>
        </tabbar>
      </div>
    </popup>
    <!--底部-->
    <div class="footer_div">
      <div class="zongji" style="overflow: hidden;white-space:nowrap;font-size:0.3rem;
    font-weight: bold;"> 总计:
        <span style="font-size:0.3rem;color: #f66513;" v-if="isEarnest=='1'">￥{{orderFrom.realPayAmount-earnestAmount || 0 | price}}</span>
        <span style="font-size:0.3rem;color: #f66513;" v-else>￥{{orderFrom.realPayAmount || 0 | price}}</span>
      </div>
      <div class="submit_div" @click="orderSubmit" v-if="falg1==true&&falg2==true"> 提交订单</div>
      <div class="submit_div" style="background: #888888;" @click="errorNetwork" v-else> 重试</div>
    </div>
  </div>
</template>
<script>
  import {
    Group,
    Scroller,
    Actionsheet,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Search,
    Selector,
    Popup,
    GroupTitle,
    Checklist,
    Divider,
    Checker,
    CheckerItem,
    TransferDomDirective as TransferDom,
    XDialog,
    Alert,
    Tabbar,
    TabbarItem,
    PopupRadio,
    XInput,
    Tab,
    TabItem,
    Confirm,
    XTextarea
  } from "vux";
  import StudentVue from "@/components/order/student.vue";

  export default {
    data() {
      return {
        newPersion: [],
        isEarnest: "1",
        earnestAmount: 0,
        gradeList: [],
        sourceList: [],
        depositList: [
          {key: "1", value: "使用"},
          {key: "0", value: "不使用"}
        ], //付款方式
        sexList: [
          {key: "0", inlineDesc: "男"},
          {key: "1", inlineDesc: "女"}
        ], //付款方式
        paymentMethodList: [
          {key: "0", inlineDesc: "全款"},
          {key: "1", inlineDesc: "分期"}
        ], //付款方式
        paymentMethod: ["0"], //付款方式
        dn: false,
        fullHeight: document.documentElement.clientHeight,
        searchAttribName: "", //查询业绩归属员工名字
        attribVali: false,
        studentVali: false,
        chageStudentShow: false, //选择当前学员 弹出对话框
        searchStudentName: "", //按照工号查询老学员名字
        searchStudentNameList: [], //按照工号查询老学员名字 查询出来的集合
        studentFromTransmit: {
          studentFrom: {},
          changeStudent: {},
          revert: true,
          submit: true,
        },

        falg1: false,
        falg2: false,
        productType: "0", //判断是否是定金
        remark: "", //备注
        orderFrom: {}, //页面基础数据
        studentData: {}, //页面头部学员集合
        searchPeopleList: [], //业绩归属搜索人员集合
        peopleList: [], //业绩归属 已加入人员列表
        realPayAmountNew: "",
      };
    },
    mounted() {
      console.log(this.$store.getters.getOrder);
      XuntongJSBridge.call("setWebViewTitle", {title: "订单确认"});
      const that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight;
        })();
      };
      this.selectFrom(); //没有订单Id查询
    },
    methods: {
      addStudent() {
        this.studentVali = true;
        this.$nextTick(() => {
          this.$refs.studentFromTransmit.selectList();
          this.$refs.studentFromTransmit.selectGradeList();
          this.$refs.studentFromTransmit.selectSourceList();
        });
      },
      // 刷新
      errorNetwork() {
        var self = this;
        this.$vux.confirm.show({
          title: "数据加载失败,请刷新重试",
          onCancel() {
            self.$router.push("/order");
          },
          onConfirm() {
            self.$router.go(0);
            //            /orderDetails
            //            window.location.reload();
          }
        });
      },
      //查询页面基本信息 没有订单Id
      selectFrom() {
        this.$vux.loading.show({
          text: "加载中"
        });
        this.axios
          .post(this.api.order.confirm.url, this.$store.getters.getOrder)
          .then(res => {
            var items = res.data.data;
            for (var i = 0; i < items.productGroups.length; i++) {
              items.productGroups[i].checked = false;
              this.productType =
                items.productGroups[i].productVO.productType;
            }
            this.falg1 = true;
            this.orderFrom = items;
            this.realPayAmountNew = this.orderFrom.realPayAmount;
            this.selectUser();
          });
      },
      //查询当前用户
      selectUser() {
        this.axios.post(this.api.home.info.url).then(res => {
          this.$vux.loading.hide();
          var item = res.data.data;
          this.newPersion.push({
            fPERSONNUMBER: item.workNo,
            fUserName: item.userName,
            fXtId: item.openId,
            photoUrl: item.photoUrl,
            forgLongName: item.department,
            rate: 100,
            own: 1
          });
          this.falg2 = true;
        });
      },
      //查询年级
      selectGradeList() {
        this.axios
          .post(this.api.dict.dictSearch.url, {
            blurSearch: {},
            order: {},
            page: 0,
            pageNum: 0,
            search: {dictCode: "GRADE"}
          })
          .then(res => {
            var items = res.data.data;
            for (var i = 0; i < items.length; i++) {
              this.gradeList.push({
                key: items[i].id,
                value: items[i].dictValue
              });
            }
          });
      },
      //查询代理推荐
      selectSourceList() {
        this.axios
          .post(this.api.dict.dictSearch.url, {
            blurSearch: {},
            order: {},
            page: 0,
            pageNum: 0,
            search: {dictCode: "STUDENTSSOURCE"}
          })
          .then(res => {
            var items = res.data.data;
            for (var i = 0; i < items.length; i++) {
              this.sourceList.push({
                key: items[i].id,
                value: items[i].dictValue
              });
            }
          });
      },
      cancelStudent(name) {
        if (this.searchStudentName != "") {
          this.searchStudentName = name;
          this.searchStudent();
        }
      },
      cancelPeople(name) {
        if (this.searchAttribName != "") {
          this.searchAttrib();
          this.searchAttribName = name;
          return false;
        }
      },
      //提交订单
      orderSubmit() {
        this.orderFrom.customerVOS = [];
        this.orderFrom.businessOwnerVOS = [];
        this.orderFrom.orderType = this.paymentMethod[0];
        for (var i = 0; i < this.newPersion.length; i++) {
          this.orderFrom.businessOwnerVOS.push({
            id: this.newPersion[i].fPERSONNUMBER,
            name: this.newPersion[i].fUserName,
            openId: this.newPersion[i].fXtId,
            photoUrl: this.newPersion[i].photoUrl,
            rate: this.newPersion[i].rate
          });
        }
        if (this.studentData.name == undefined) {
          this.$vux.alert.show({
            title: '请添加学员!'
          });
          return;
        } else {
          this.orderFrom.customerVOS.push({
            id: this.studentData.id,
            customerNo: this.studentData.account,
            mobile: this.studentData.mobile,
            name: this.studentData.name,
            sex: this.studentData.sex,
            userId: this.studentData.userId
          });
        }
        this.orderFrom.remark = this.remark;
        //        this.orderFrom.earnestAmount = this.earnestAmount;
        var self = this;
        this.$vux.loading.show({
          text: "加载中"
        });
        this.orderFrom.isEarnest = this.isEarnest == 1 ? true : false;
        if (this.orderFrom.isEarnest == true) {
          this.orderFrom.earnestAmount = this.earnestAmount;
          this.orderFrom.realPayAmount =
            this.realPayAmountNew - this.earnestAmount < 0
              ? 0
              : this.realPayAmountNew - this.earnestAmount;
        }
        this.axios
          .post(this.api.order.submit.url, this.orderFrom)
          .then(res => {
            var item = res.data.data;
            if (item.type == true) {
              this.$vux.confirm.show({
                title: "订单提交成功,是否立即付款",
                onCancel() {
                  self.$router.push("/order");
                },
                onConfirm() {
                  self.$router.push("/payment/" + item.orderId);
                }
              });
            } else {
              this.$router.push("/order");
            }
          });
      },
      //搜索员工( 业绩归属)
      searchAttrib() {
        this.$vux.loading.show({
          text: "加载中"
        });
        this.axios
          .post(this.api.user.search.url, {
            searchType: 2,
            searchValue: this.searchAttribName.replace(
              /(^\s*)|(\s*$)/g,
              ""
            )
          })
          .then(res => {
            this.$vux.loading.hide();
            this.searchPeopleList = res.data.data;
            var items = [];
            if (res.data.data) {
              for (var i = 0; i < res.data.data.length; i++) {
                items.push(res.data.data[i]);
                items[i].rate = "";
              }
            }
            this.searchPeopleList = items;
          });
      },
      selectContainsEarnest(id) {
        this.axios
          .post(this.api.order.customerEarnest.url, {
            id: id,
            payAmount: this.orderFrom.payAmount
          })
          .then(res1 => {
            this.earnestAmount = res1.data.data.earnestAmount;
            this.depositList = [
              {
                key: "1",
                value:
                "使用支付:￥" +
                (this.orderFrom.realPayAmount -
                this.earnestAmount <=
                0
                  ? 0
                  : this.orderFrom.realPayAmount -
                  this.earnestAmount)
              },
              {
                key: "0",
                value:
                "不使用支付:￥" + this.orderFrom.realPayAmount
              }
            ];
            this.studentVali = false;
          });
      },

      closeStudent() {
        this.selectContainsEarnest(this.studentData.id);
      },
      //返回
      returnPersion() {
        this.attribVali = false;
        this.peopleList = [];
        this.searchAttribName = "";
        this.searchPeopleList = [];
      },
      //业务归属
      peopleSubmit() {
        var n = 0;
        for (var i = 0; i < this.peopleList.length; i++) {
          if (
            this.peopleList[i].rate == "" ||
            this.peopleList[i].rate == 0
          ) {
            this.$vux.alert.show({
              title: "综合值不能为0和空!"
            });
            return;
          }
          n += this.peopleList[i].rate * 1;
        }
        if (n != 100) {
          this.$vux.alert.show({
            title: "综合值应为100%,当前为" + n + "%,请重新分配!"
          });
          return;
        }
        this.newPersion = [];
        for (var i = 0; i < this.peopleList.length; i++) {
          this.newPersion.push(this.peopleList[i]);
        }
        this.searchAttribName = "";
        this.searchPeopleList = [];
        this.attribVali = false;
      },
      clickAddPersion() {
        this.peopleList = [];
        for (var i = 0; i < this.newPersion.length; i++) {
          this.peopleList.push(this.newPersion[i]);
        }
        this.attribVali = true;
      },
      //点击学员弹出 是否删除业绩归属人员弹出框
      delPeople(item, index) {
        this.peopleList.splice(index, 1);
      },
      clickPeople(item, index) {
        this.chageStudentShow = true;
        var self = this;
        if (item.rate == 0) {
          if (item.own) {
            this.$vux.toast.show({
              text: "当前登录角色禁止删除!",
              type: "warn"
            });

            return;
          }
          this.$vux.confirm.show({
            title: "是否删除!",
            onConfirm() {
              self.newPersion.splice(index, 1);
            }
          });
        } else {
          this.$vux.alert.show({
            title: item.fUserName + "分配比例为：" + item.rate + "%"
          });
        }
      },
      //点击学员弹出 是否删除学员弹出框
      clickStudent(item, index) {
        this.chageStudentShow = true;
        var self = this;
        this.$vux.confirm.show({
          title: "是否删除!",
          // 组件除show外的属性
          onCancel() {
          },
          onConfirm() {
            self.studentData = {};
          }
        });
      },
      //添加搜索到的业绩归属人员到 已添加列表
      addPeople(item) {
        var flag = false;
        for (var i = 0; i < this.peopleList.length; i++) {
          if (this.peopleList[i].fPERSONNUMBER == item.fPERSONNUMBER) {
            flag = true;
          }
        }
        if (flag == false) {
          this.peopleList.push(item);
        }
      },
    },
    components: {
      Group,
      Actionsheet,
      GroupTitle,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Search,
      Checker,
      CheckerItem,
      XDialog,
      Tabbar,
      TabbarItem,
      PopupRadio,
      XInput,
      Tab,
      TabItem,
      Selector,
      Alert,
      Confirm,
      Scroller,
      XTextarea,
      Checklist,
      Popup,
      Divider, StudentVue
    },
    watch: {
      fullHeight(val) {
        if (this.fullHeight <= 500) {
          this.dn = true;
        } else {
          this.dn = false;
        }
      },
      "studentFromTransmit.studentFrom": function (val) {
        this.studentData = this.studentFromTransmit.studentFrom;
        this.studentVali = false;
        this.closeStudent()
      },
      "studentFromTransmit.revert": function (val) {
        if (this.studentFromTransmit.revert == false) {
          this.studentFromTransmit.revert = true;
          this.studentVali = false;
        }
      }
    },
    directives: {
      TransferDom
    }
  };
</script>
<style type="text/scss">


  .earnest_div.color_text .weui-cell {
    width: 100%;
    float: none;
  }
  .order_deatils_div .demo1-item-selected {
    border: 1px solid #fa760b;
    color: white;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .comple_dialog .weui-mask {
    z-index: 5000;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    transform: translateY(10px);
    opacity: 0;
  }

  .color_text .vux-label-desc {
    color: black !important;
  }

  .color_text .weui-cell {
    width: 40%;
    float: left;
    padding: 0;
    box-sizing: border-box;
    margin-left: 0.15rem;
  }

  .color_text .weui-cells:before,
  .color_text .weui-cell:before,
  .color_text .weui-cells:after {
    border: 0;
    border-top: 0;
  }

  .color_text .weui-cells {
    line-height: 38px;
  }

  .color_text1 .weui-cell {
    padding: 0 15px;
  }

  .order_deatils_div .vux-selector.weui-cell_select-after {
    padding-left: 0;
  }

  .order_deatils_div .weui-label {
    text-align: left;
    padding-left: 0.1rem;
    box-sizing: border-box;
  }

  body .vux-label-desc {
    font-size: 0.22rem;
  }
</style>
<style lang="scss" scoped type="text/scss">
  .student_add_ul {
    li {
      height: 20px !important;
      line-height: 20px !important;
      border: 1px solid red;
      border-radius: 50px;
    }
  }

  .weui-cell {
    padding: 0;
    box-sizing: border-box;
  }

  .border {
    border-top: 0.16rem solid #fafafa;
  }

  .needPay {
    line-height: 0.88rem;
    font-size: 0.29rem;
    color: #333333;
    padding-left: 0.3rem;
    box-sizing: border-box;
    background: #f4f4f4;
  }

  .bgWhite {
    background: white;
    // border-bottom: 1px solid #e6e6e6;
  }

  .students_ui {
    li {
      margin-bottom: 0px !important;
    }
  }

  textarea {
    display: block;
    width: 90%;
    height: 1.5rem;
    margin: 0.3rem auto;
    border-radius: 10px;
    background: #fafafa;
    padding: 0.15rem;
    box-sizing: border-box;
    font-size: 0.28rem;
  }

  .footer_div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid #e6e6e6;
    div {
      text-align: center;
      font-size: 0.3rem;
      height: 0.9rem;
      line-height: 0.9rem;
    }
    .zongji {
      width: 50%;
      float: left;
    }
    .submit_div {
      /*background-image: linear-gradient(225deg, rgb(254, 86, 10) 3%, #f50 100%); */
      color: #ffffff;
      width: 2rem;
      background: #f50;
      float: right;
      box-sizing: border-box;
    }
  }

  .dn {
    display: none;
  }

  .order_deatils_div {
    height: 100%;
    overflow-y: auto;
    // background: #f9f9f9;
    font-size: 12px;
    .order_student_div {
      overflow: hidden;
      height: 0.9rem;
      overflow-y: auto;
      li {
        text-align: center;
        line-height: 0.9rem;
        background: #f4f4f4;
        color: white;
        font-size: 0.5rem;
        width: 100%;
        height: 0.9rem;
        cursor: pointer;
      }
    }
  }

  ul {
    width: 100%;
    overflow: hidden;
  }

  .stu_che {
    padding: 0 5px;
    margin: 10px 0;
    width: 100%;
  }

  .oli {
    height: 30px;
    line-height: 30px;
    transition: 2s;
  }

  .people_ul {
    li {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f1f1f1;
    }
  }

  .people_select_div {
    width: 100%;
    height: 0.8rem;
    margin-bottom: 0.4rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #f1f1f1;
  }

  .odc {
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    .cto {
      width: 100%;
      overflow: hidden;
    }
  }

  .order_title {
    color: #999999;
    border-bottom: 1px solid #f1f1f1;
  }

  .order_content {
    width: 100%;
    overflow: hidden;
    line-height: 30px;
  }

  .text_left_float {
    float: left;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }

  .text_rigth_float {
    float: right;
    padding-right: 0.3rem;
    box-sizing: border-box;
    color: #f66513;
    font-weight: bold;
  }

  .attrib_ul {
    margin-top: 10px;
    padding-left: 0.15rem;
    box-sizing: border-box;
    li {
      margin-bottom: 10px;
      width: 38px;
      height: 38px;
      border-radius: 50px;
      float: left;
      margin-right: 10px;
      width: 38px;
      border: 1px solid #ececec;
      text-align: center;
    }
  }

  .people_ul_add {
    position: relative;
    right: 0px;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
  }

  .checker_item {
    margin-right: 10px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    width: 100px;
    text-align: center;
  }

  .deti_pro_ul {
    width: 100%;
    overflow: hidden;
    padding-left: 10px;
    .title_li {
      color: #9999;
    }
    .content_li {
      padding: 0 10px;
      width: 100%;
      overflow: hidden;
      .content_li_div {
        float: left;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .content_li_span {
        float: right;
      }
    }
  }

  .product_li {
    max-height: 200px;
    overflow-y: auto;
  }

  .product_name_div {
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
    width: 100%;
    line-height: 0.8rem;
  }

  /**/
  /*.hd_div:not(:last-child) {*/
  /*border-bottom: 1px solid #f1f1f1;*/
  /*}*/
  span {
    font-size: 0.22rem;
    color: #666666;
    // font-weight: bold;
  }

  .img_div {
    width: 100%;
    overflow: hidden;
    height: 40px;
  }

  img {
    height: 100%;
  }

  .demo5-item {
    width: 80px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo5-item-selected {
    background: #ffffff;
    border-color: green;
  }

  .search_people_name {
    // height: 20px;
    line-height: 0.4rem;
    font-size: 0.26rem;
  }

  .pay_item {
    margin: 5px 3%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    width: 40%;
    float: left;
    text-align: center;
  }

  .mobile_img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    float: left;
    margin-top: 15px;
  }

  .telInfo {
    overflow: hidden;
    img {
      width: 0.24rem;
      height: 0.24rem;
      object-fit: cover;
      float: left;
      margin-top: 0.03rem;
    }
    span {
      float: left;
      font-size: 0.28rem;
      color: #555555;
      margin-left: 0.12rem;
    }
  }

  .stu_ul_li {
    border-top: 0.16rem solid #f4f4f4;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
  }

  .basicInfo {
    overflow: hidden;
    h3 {
      font-size: 0.32rem;
      color: #333333;
      float: left;
    }
    div {
      float: left;
      width: 0.6rem;
      height: 0.26rem;
      line-height: 0.26rem;
      margin-left: 0.25rem;
      font-size: 0.2rem;
      color: white;
      background: url("../../styles/img/male.png") no-repeat 0.25rem 0.035rem #3cbaff;
      background-size: 30%;
      margin-top: 0.19rem;
      padding-left: 0.1rem;
      border-radius: 10px;
    }

    .female {
      background: url("../../styles/img/female.png") no-repeat 0.25rem 0.018rem #fc5860;
      background-size: 0.6rem 0.26rem;
      background-size: 18%;
    }
  }

  .numInfo {
    overflow: hidden;
    font-size: 0.28rem;
    color: #555555;
    line-height: 0.6rem;
    .number {
      float: left;
    }
    .idCard {
      float: left;
      margin-left: 0.4rem;
    }
    .onlyOne {
      margin-left: 0rem;
    }
  }
</style>

