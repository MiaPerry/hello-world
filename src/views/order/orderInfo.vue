<template>
  <div class="order_deatils_div" style="padding-bottom: 45px">
    <!--人员列表-->
    <ul class="stu_ul" style="width: 100%;overflow:hidden">
      <li v-if="orderFrom.customerVO"  class="stu_ul_li" style="overflow: hidden;position:relative">
        <div class="basicInfo">
          <h3>{{orderFrom.customerVO.name}}</h3>
          <div :class="{female: orderFrom.customerVO.sex == 1 }"></div>
        </div>
        <div class="telInfo" v-if="orderFrom.customerVO.mobile">
          <img src="../../styles/img/tel.png" alt="电话">
          <span>{{orderFrom.customerVO.mobile}}</span>
        </div>
        <div class="numInfo">
          <span class="number" v-if="orderFrom.customerVO.code!=''&&orderFrom.customerVO.code!=null">学号：{{orderFrom.customerVO.code}}</span>
          <span class="idCard" :class="{onlyOne: orderFrom.customerVO.code}" v-if="orderFrom.customerVO.idCard">身份证后四位：{{orderFrom.customerVO.idCard}}</span>
        </div>
        <!-- <svg @click="onItemClick(0, item.userId)" style="position:absolute;right:0.2rem;top:0.3rem;width:0.3rem;height:0.3rem;" data-v-634930a2="" aria-hidden="true" class="icon icon-sm">
                                <use data-v-634930a2="" xlink:href="#icon-ICONbiaozhun_fuzhi-"></use>
                            </svg> -->
      </li>
    </ul>
    <div class="needPay bgWhite border">已选商品</div>
    <div class="odc">
      <div class="cto">
        <ul>
          <li v-for="(item,index) in orderFrom.orderDetailVOS" class="order_content " @click="item.checked=!item.checked" :key="index">
            <div class="product_name_div">
              <span class="text_left_float">{{item.productName}}</span>
              <span class="text_rigth_float" v-if="item.signalReductionAmount">
                <strong>￥{{item.allDiscountAmount - item.signalReductionAmount || 0 |price}}</strong>
              </span>
              <span class="text_rigth_float" v-else>
                <strong>￥{{item.allDiscountAmount || 0 |price}}</strong>
              </span>
            </div>
            <ul class="deti_pro_ul transition_all product_li" v-if="item.checked==true">
              <template v-if="item.productClassVOS.length>0">
                <li class="title_li">班型:</li>
                <li v-for="(item1,index1) in item.productClassVOS" class="content_li" style="padding-right: 5px;">
                  <div class="content_li_div">
                    {{item1.className}}
                  </div>
                  <span class="content_li_span">
                    ￥{{item1.discountPrice || 0 |price}}
                  </span>
                </li>
              </template>
              <template v-if="item.orderPresentVOS&&item.orderPresentVOS.length>0">
                <li class="title_li">赠品:</li>
                <li v-for="(item1,index1) in item.orderPresentVOS" class="content_li">
                  <div class="content_li_div">
                    {{item1.productName }}
                  </div>
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
          <span class="text_rigth_float">
            <b>￥{{orderFrom.payAmount || 0 |price}}</b>
          </span>
        </div>
        <div class="order_content">
          <span class="text_left_float">实际支付金额</span>
          <span class="text_rigth_float">
            <b>￥{{orderFrom.realPayAmount || 0 |price}}</b>
          </span>
        </div>
        <!--v-if="!orderFrom.completeAmount==0"-->
        <div class="order_content">
          <span class="text_left_float">已支付金额</span>
          <span class="text_rigth_float">
            <b>￥{{orderFrom.completeAmount || 0 |price}}</b>
          </span>
        </div>
        <!--v-if="!orderFrom.needPayAmount==0"-->
        <div class="order_content">
          <span class="text_left_float">待支付金额</span>
          <span class="text_rigth_float">
            <b>￥{{orderFrom.needPayAmount || 0 |price}}</b>
          </span>
        </div>
        <div class="order_content" v-if="orderFrom.orderStatus==3">
          <span class="text_left_float"><b style="color:#f66513 ">￥{{orderFrom.otherAmount || 0 |price}}</b></span>
          <span class="text_rigth_float">
            <span style="color: green">(审核中)</span>
          </span>
        </div>
      </div>
    </div>
    <div class="odc">
      <div class="cto">
        <ul>
          <li class="order_content" v-if="orderFrom.allReduceAmount">
            <span class="text_left_float">优惠</span>
            <span class="text_rigth_float" style="color: red">
              <b>￥{{orderFrom.allReduceAmount || 0 |price}}</b>
            </span>
          </li>
          <li class="order_content" v-if="orderFrom.approveStatus!='3'">
            <span class="text_left_float">其他优惠</span>
            <span class="text_rigth_float" style="color: red" v-if="orderFrom.approveStatus=='1'">
              <b>￥{{orderFrom.otherReduceAmount || 0 |price}}
                <span style="color: green">(申请中)</span>
              </b>
            </span>
            <span class="text_rigth_float" style="color: red" v-if="orderFrom.approveStatus=='2'">
              <b>￥{{orderFrom.otherReduceAmount || 0 |price}}</b>
            </span>
          </li>
        </ul>
      </div>
      <div class="cto" v-if="orderFrom.earnestAmount&&orderFrom.earnestAmount>0" >
        <div class="order_title">定金抵扣</div>
        <div class="order_content">
          <span class="text_left_float">定金抵扣</span>
          <span class="text_rigth_float" style="color: red">
            <b>-￥{{orderFrom.earnestAmount || 0 |price}}</b>
          </span>
        </div>
      </div>
    </div>
    <!--业绩归属-->
    <div class="needPay bgWhite border">业绩归属</div>
    <div class="odc">
      <div class="cto">
        <ul class="attrib_ul">
          <li class="order_content" v-for="(item,index) in orderFrom.businessOwnerVOS " :key="index">
            <img :src="item.photoUrl">
          </li>
        </ul>
      </div>
    </div>
    <!--付款方式-->
    <div class="needPay  border" style="background:white">付款方式</div>
    <div class="odc" v-if="productType!='6'">
      <div class="cto">
        <div class="order_content color_text">
          <checklist style="width:100%;border: 0;" label-position="right" :max="1" disabled required :options="paymentMethodList" v-model.trim="paymentMethod"></checklist>
        </div>
      </div>
    </div>

    <div class="odc" v-if="orderFrom.remark!=''">
      <div class="cto">
        <div class="order_title">备注</div>
        <div class="order_content" style="border: 1px solid #f1f1f1;width: 100%;overflow: hidden;margin-top: -1px">
          {{orderFrom.remark}}
        </div>
      </div>
    </div>
    <div class="odc">
      <div class="cto">
        <ul class="bottom_ul">
          <li>订单编号:{{orderFrom.id}}</li>
          <li>创建时间:{{orderFrom.createTime | time('yyyy-MM-dd hh:mm:ss')}}</li>
          <li v-if="orderFrom.orderPayRecordVOS&&orderFrom.orderPayRecordVOS.length>0">支付记录:
            <ul>
              <li v-for="(item,index) in orderFrom.orderPayRecordVOS" :key="index">
                <span>{{item.payTime}} 支付了￥{{item.payAmount || 0 |price}}元</span>
                <span v-if="item.status == 0">成功</span>
                <span v-if="item.status == 2">驳回</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer_div">
      <div class="zongji" style="overflow: hidden;white-space:nowrap;font-size:0.3rem;font-weight: bold;"> 总计:
        <span style="font-size:0.3rem;color: #f66513;" >
          <span v-if="orderFrom.orderStatus==3">￥{{orderFrom.needPayAmount-orderFrom.otherAmount || 0 |price}}</span>
          <span v-else>￥{{orderFrom.needPayAmount || 0 |price}}</span>
        </span>
      </div>
      <div class="submit_div" style="background: #888888" v-if="orderFrom.orderStatus==4">已取消</div>
      <div class="submit_div" style="background: #888888" v-else-if="orderFrom.orderStatus==3&&(orderFrom.realPayAmount==orderFrom.otherAmount)">审核中</div>
      <div class="submit_div" style="background: #888888" v-else-if="orderFrom.orderStatus==1">已支付</div>
      <div class="submit_div" @click="orderSubmit"        v-else>付 款</div>
    </div>
  </div>

</template>

<script>
import {
    Group,
    Scroller,
    Search,
    GroupTitle,
    Checklist,
    Checker,
    CheckerItem,
    TransferDomDirective as TransferDom,
    XDialog,
    Tabbar,
    TabbarItem,
    XInput,
    Tab,
    TabItem,
    Confirm,
    XTextarea
} from "vux";

export default {
    data() {
        return {
            productType: "0",
            paymentMethodList: [
                { key: "0", inlineDesc: "全款" },
                { key: "1", inlineDesc: "分期" }
            ], //付款方式
            paymentMethod: ["0"], //付款方式
            dn: false,
            fullHeight: document.documentElement.clientHeight,
            orderFrom: { year: "" },
            years: []
        };
    },
    created() {},
    mounted() {
        XuntongJSBridge.call("setWebViewTitle", { title: "订单详情" });
        this.selectOrderIdFrom();
    },
    methods: {
        //提交订单
        orderSubmit() {
            this.$router.push("/payment/" + this.orderFrom.id);
        },

        //查询页面基本信息 有订单ID
        selectOrderIdFrom() {
            this.axios
                .get(this.api.order.getOrderId.url + this.$route.params.id)
                .then(res => {
                    var items = res.data.data;
                    for (var i = 0; i < items.orderDetailVOS.length; i++) {
                        items.orderDetailVOS[i].checked = false;
                        this.productType = items.orderDetailVOS[i].productType;
                    }
                    this.orderFrom = items;
                    this.orderFrom.year = "2018";
                    this.paymentMethod = [
                        this.orderFrom.orderType &&
                        this.orderFrom.orderType != null
                            ? this.orderFrom.orderType
                            : "0"
                    ];
                    this.years.push("2018");
                    if (this.paymentMethod[0] == 0) {
                        this.paymentMethodList = [
                            { key: "0", inlineDesc: "全款" }
                        ];
                    } else {
                        this.paymentMethodList = [
                            { key: "1", inlineDesc: "分期" }
                        ];
                    }
                });
        }
    },
    components: {
        Group,
        GroupTitle,
        Search,
        Checker,
        CheckerItem,
        XDialog,
        Tabbar,
        TabbarItem,
        XInput,
        Tab,
        TabItem,
        Confirm,
        Scroller,
        XTextarea,
        Checklist
    },
    watch: {
        fullHeight(val) {
            if (this.fullHeight <= 500) {
                this.dn = true;
            } else {
                this.dn = false;
            }
        }
    },
    directives: {
        TransferDom
    }
};
</script>
<style type="text/scss">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
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
body .weui-cell {
    padding: 0;
    box-sizing: border-box;
}

.color_text .weui-cell {
    width: 50%;
    float: left;
}

.color_text .weui-cells:before,
.color_text .weui-cell:before,
.color_text .weui-cells:after {
    border: 0;
    border-top: 0;
}

.color_text1 .weui-cell {
    padding: 0 15px;
}
</style>
<style lang="scss" scoped type="text/scss">
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
    padding-left: 0.2rem;
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

.bottom_ul {
    margin-top: 0.2rem;
}
.bottom_ul > li {
    font-size: 0.25rem;
    line-height: 0.4rem;
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
        height: 45px;
        line-height: 45px;
    }
    .zongji {
        width: 50%;
        float: left;
    }
    .submit_div {
        /*background-image: linear-gradient(225deg, rgb(254, 86, 10) 3%, #f50 100%); */
        font-weight: 600;
        color: #ffffff;
        width: 100px;
        background: #f50;
        float: right;
    }
}

.dn {
    display: none;
}

.order_deatils_div {
    height: 100%;
    // padding: 0 10px;
    overflow-y: auto;
    // background: #f9f9f9;
    font-size: 12px;
    .order_student_div {
        overflow: hidden;
        max-height: 130px;
        overflow-y: auto;
        li {
            float: left;
            overflow: hidden;
            margin: 0 3px 5px 3px;
            border: 1px solid #e7e3e7;
            text-align: center;
            width: auto;
            min-width: 38px;
            line-height: 38px;
            height: 38px;
            border: 1px solid #ececec;
            border-radius: 50px;
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

.stu_ul {
    font-size: 14px;
    text-align: left;
    li {
        color: #888;
        // div {
        //     margin: 10px 0;
        //     float: left;
        //     width: 50%;
        // }
    }
    label {
        font-weight: 600;
        padding: 0 10px;
        color: #000000;
    }
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
        // margin-left: 0.4rem;
    }
    .onlyOne {
        margin-left: 0rem;
    }
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

.odc {
    background: #ffffff;
    border-radius: 4px;
    // margin-top: 5px;
    padding: 0 0.2rem;
    box-sizing: border-box;
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
}

.text_rigth_float {
    float: right;
    color: #f66513;
}

.attrib_ul {
    margin-top: 10px;
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
        padding-left: 10px;
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
}

/**/
/*.hd_div:not(:last-child) {*/
/*border-bottom: 1px solid #f1f1f1;*/
/*}*/
span {
    font-size: 14px;
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
    height: 20px;
    line-height: 20px;
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
        background: url("../../styles/img/male.png") no-repeat 0.25rem 0.04rem #3cbaff;
        background-size: 28%;
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
</style>
