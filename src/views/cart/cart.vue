<template>
    <div class="cart_div box">
        <div v-transfer-dom>
            <confirm v-model.trim="show" @on-confirm="onConfirm">
                <p style="text-align:center;font-size:0.42rem;">确定要删除吗？</p>
            </confirm>
        </div>
        <toast v-model.trim="showPositionValue" type="text" :time="800" is-show-mask :position="position">请先选择产品！</toast>
        <header>
            <div>购物车</div>
            <button @click="goEdit" v-text="boolean?'完成': '编辑'"></button>
        </header>
        <div style="height: 0.88rem;width: 100%;"></div>
        <div style="width:100%;height: 85%;" ref="scrollerEvent">
            <div class="box2">
                <div v-for="(item,index) in cartList" :key="index" v-if="item.list.length>0">
                    <div class="title">{{item.name}}</div>
                    <div v-for="(item1,index1) in item.list" :key=index1 style="width:100%;position:relative;float:left;margin-left:0.05rem;">
                        <!-- {{item1.productVO.productBook}} -->
                        <!-- {{item1.productVO.isAgreementbigger == '0'}} -->
                        <!-- <div :class="{red: item1.productVO.isAgreementbigger == '0'}">1</div> -->
                        <el-collapse accordion v-if="item1.productVO.productClassVOS&&item1.productVO.productClassVOS.length>0" style="overflow:hidden" :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2'}" >
                            <el-collapse-item>
                                <template slot="title">
                                    <div style="float:left;margin-left:15px;width:0.6rem;height:0.6rem;">
                                        <el-checkbox v-show="boolean == true" style="border:none;" v-model.trim="item1.checked"></el-checkbox>
                                    </div>
                                    <div style="width:79%;float:left;font-size: 0.3rem;height:100%;">
                                        <p :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2'  ,red: item1.productVO.isAgreementbigger == '0'}" style="float:left;width:65%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size:0.28rem;">{{item1.productVO.productName}}</p>
                                        <p class="orange" :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2' ,red: item1.productVO.isAgreementbigger == '0' }" v-if="item1.allBaseAmount==item1.allDiscountAmount">{{item1.allPayAmount || 0 | price}}</p>
                                        <p class="orange" :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2' ,red: item1.productVO.isAgreementbigger == '0'}" v-else>￥{{item1.allPayAmount || 0 | price}}</p>
                                    </div>
                                </template>
                                <div style="display:block" class="cart_child">
                                    <ul v-if="item1.productVO.productClassVOS">
                                        <li class="title_li">班型</li>
                                        <li style="" v-for="(item2,index2) in item1.productVO.productClassVOS" :key="index2">
                                            <span style="float:left" :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2' ,red: item1.productVO.isAgreementbigger == '0'}">{{item2.className}}</span>
                                            <span class="orange" :class="{gray: item1.productVO.dr == '1' || item1.productVO.publistStatus == '2' || item1.productVO.productStatus == '2' ,red: item1.productVO.isAgreementbigger == '0'}">￥{{item2.discountPrice || 0 | price}}</span>
                                        </li>
                                    </ul>
                                    <ul v-if="item1.productVO.productPresentVOS">
                                        <li class="title_li">赠品</li>
                                        <li v-for="(item2,index2) in item1.productVO.productPresentVOS" :key="index2">
                                            <span style="float:left">{{item2.productName}}</span>
                                        </li>
                                    </ul>
                                    <ul v-if="item1.productVO.productServiceVOS">
                                        <li class="title_li">教材费</li>
                                        <li>
                                            <span style="float:left">教材费</span>
                                            <span style="float:right;color:rgb(245, 96, 22)">￥{{item1.bookDiscountAmount || 0 | price}}</span>
                                        </li>
                                    </ul>
                                    <ul v-if="item1.productVO.productServiceVOS">
                                        <li class="title_li">服务费</li>
                                        <li v-for="(item2,index2) in item1.productVO.productServiceVOS" :key="index2">
                                            <span style="float:left">{{item2.serviceName}}</span>
                                            <span style="float:right;color:rgb(245, 96, 22)">￥{{item2.discountPrice || 0 | price}}</span>
                                        </li>
                                    </ul>
                                    <ul v-if="item1.productVO.productServiceVOS">
                                        <li class="title_li">优惠</li>
                                        <li>
                                            <span style="float:left">总优惠</span>
                                            <span style="float:right;color:rgb(245, 96, 22)">-￥{{item1.allReduceAmount || 0 | price}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                        </el-collapse>

                        <div disabled="disabled" v-else style="position:relative;overflow:hidden;border-bottom: 1px solid #e6e6e6;line-height:0.83rem;" :class="{gray: (item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.dr == '1')  || (item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.productStatus == '2') || (item1.productVO &&item1.productVO.productService&&item1.productVO.productService.dr == '1')  || (item1.productVO &&item1.productVO.productService&&item1.productVO.productService.productStatus == '2' || item1.productVO &&item1.productVO.dr == '1'  || item1.productVO &&item1.productVO.productStatus == '2')}">
                            <div style="float:left;margin-left:15px;width:0.6rem;;height:0.6rem;;">
                                <el-checkbox v-show="boolean == true" style="float:left;margin-right:10px;" v-model.trim="item1.checked" class="aaa"></el-checkbox>
                            </div>
                            <div style="padding-right:0.3rem;width:85%;font-size: 0.28rem;font-weight:normal;overflow:hidden;float:left">
                                <p style="float:left;width:36%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item1.productVO.productName}}</p>
                                <p class="orange" v-if="item1.allBaseAmount==item1.allDiscountAmount" :class="{gray: item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.dr == '1'  || item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.productStatus == '2' || item1.productVO &&item1.productVO.productService&&item1.productVO.productService.dr == '1'  || item1.productVO &&item1.productVO.productService&&item1.productVO.productService.productStatus == '2' || item1.productVO &&item1.productVO.dr == '1'  || item1.productVO &&item1.productVO.productStatus == '2'}">
                                    ￥{{item1.allPayAmount | price}}</p>
                                <p class="orange" v-else :class="{gray: item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.dr == '1'  || item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.productStatus == '2' || item1.productVO &&item1.productVO.productService&&item1.productVO.productService.dr == '1'  || item1.productVO &&item1.productVO.productService&&item1.productVO.productService.productStatus == '2'}">￥{{item1.allPayAmount | price}}</p>
                            </div>
                            <div v-if="item.name == '已购服务' || item.name == '已购图书' || item.name == '其他'" style="text-align:center;position:absolute;left:3.3rem;top:0.1rem;" :class="{preventClick: flag == false}">
                                <div v-if="(item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.dr == '1')  || (item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.productStatus == '2') || (item1.productVO &&item1.productVO.productService&&item1.productVO.productService.dr == '1')  || (item1.productVO &&item1.productVO.productService&&item1.productVO.productService.productStatus == '2') || (item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.dr == '1')  || (item1.productVO &&item1.productVO.productBook&&item1.productVO.productBook.productStatus == '2') || (item1.productVO &&item1.productVO.dr == '1')  || (item1.productVO &&item1.productVO.productStatus == '2')">{{item1.productVO.numCount}}</div>
                                <x-number width="0.6rem" @on-change="plusOreduce(item1,index1)" v-model.trim="item1.productVO.numCount" button-style="round" :min="1"></x-number>
                            </div>
                            <div @click="toClick" style="position:absolute;left:3.7rem;top:0;width:0.6rem;height:0.9rem;z-index=500;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="line-height:4rem;text-align:center;color:#9f9f9f" v-show="isNull == false">
                您的购物车空空如也~
            </div>
        </div>
        <footer>
            <div>
                <div class="cell">
                    <span>{{num}}</span>
                </div>
            </div>
            <div>合计：
                <span class="moneyNum">￥{{payAmount || 0 | price}}</span>
            </div>
            <div class="toOrderList" @click="toOrderList" :class="{refuse:isNull == false, grays: isCcc == true}">立即下单</div>
        </footer>
        <!-- 删除 -->
        <div class="tabDelete" :class="{toShow:boolean == false}">
            <el-checkbox v-model.trim="checked" @change="handleCheckAll(checked)">全选</el-checkbox>
            <button class="deleteBar" @click="deleteItem">删除</button>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {
    XNumber,
    Scroller,
    Confirm,
    Group,
    XSwitch,
    XButton,
    TransferDomDirective as TransferDom,
    Toast
} from "vux";

Vue.use(ElementUI);
let modelState = [];
let keep = [
    { name: "已购班型", list: [], checked: true }, //班型
    { name: "已购套餐", list: [], checked: true }, //套餐
    { name: "已购图书", list: [], checked: true }, //图书
    { name: "已购服务", list: [], checked: true } //服务
];
export default {
    data() {
        return {
            flag: true,
            isNull: "false",
            isCcc: true,
            showPositionValue: false,
            show: false,
            idList: [],
            boolean: false,
            checked: false,
            num: "",
            changeValue: "",
            showList1: true,
            scrollTop: 0,
            onFetching: false,
            bottomCount: 20,
            payAmount: "", //总价
            cartList: [
                { name: "已选课程", list: [], checked: true }, //已选课程
                { name: "已购图书", list: [], checked: true }, //图书
                { name: "已购服务", list: [], checked: true } //服务
            ]
        };
    },
    mounted() {
        XuntongJSBridge.call("setWebViewTitle", { title: "购物车" });
        this.getList();
    },
    directives: {
        TransferDom
    },
    methods: {
        toClick(e) {
            e.stopPropagation();
        },
        //获取购物车列表
        getList() {
            let self = this;
            this.cartList = [
                { name: "已选课程", list: [], checked: true }, //已选课程
                { name: "已购图书", list: [], checked: true }, //图书
                { name: "已购服务", list: [], checked: true }, //服务
                { name: "其他", list: [], checked: true } //服务
            ];
            this.axios.post(this.api.cart.goodsList.url).then(function(res) {
                //查数量
                self.getNum();
                // let data = res.data.data.productGroups;
                let oData = res.data.data;

                let data;
                //判断购物车是否为空
                if (oData.length != "0") {
                    self.isNull = true;
                    data = res.data.data.productGroups;
                    self.payAmount = res.data.data.payAmount;
                } else {
                    self.isNull = false;
                    self.payAmount = "0";
                }

for (var i = 0; i < data.length; i++) {
    if(data[i].productVO.isAgreementbigger == '0'){
        self.isCcc = true;
                        break;
    }else{
                        self.isCcc = false;
                    }
}



                for (var i = 0; i < data.length; i++) {
                    data[i].checked = false;
                    if (data[i].productVO.productType == 1) {
                        //班型
                        self.cartList[0].list.push(data[i]);
                    } else if (data[i].productVO.productType == 2) {
                        //套餐
                        self.cartList[0].list.push(data[i]);
                    } else if (data[i].productVO.productType == 3) {
                        //图书
                        self.cartList[1].list.push(data[i]);
                    } else if (data[i].productVO.productType == 4) {
                        self.cartList[2].list.push(data[i]);
                    }else if (data[i].productVO.productType == 7) {
                        self.cartList[3].list.push(data[i]);
                    }
                }
                // console.log(self.cartList);
            });
        },
        //去编辑
        goEdit() {
            let self = this;
            if (self.isNull == true) {
                self.boolean = !self.boolean;
            }
        },
        //全选
        handleCheckAll(status) {
            this.cartList.map(item => {
                item.list.map(items => {
                    items.checked = status;
                });
            });
        },
        //获取购物车物品数量
        getNum() {
            let self = this;
            this.axios
                .get(this.api.cart.getNum.url)
                .then(function(res) {
                    self.num = res.data.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //删除购物车物品/清空
        deleteItem() {
            //获取选中id
            this.getSelectedId();

            //判断是否选中
            let self = this;
            if (self.idList.length != 0) {
                this.show = true;
            } else {
                this.position = top;
                this.showPositionValue = true;
            }
        },
        //点击确定
        onConfirm() {
            let self = this;
            this.axios
                .post(this.api.cart.delete.url, self.idList)
                .then(function(res) {
                    self.num = res.data.data;
                    self.getList();
                    self.getNum();
                    self.boolean = false;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //遍历选中的id
        getSelectedId() {
            this.idList = [];
            this.cartList.map(item => {
                item.list.map(items => {
                    if (items.checked == true) {
                        this.idList.push(items.productVO.id);
                    }
                });
            });
            let self = this;
            let items = new Set(self.idList);
            self.idList = Array.from(items);
        },
        //监听数量变化
        plusOreduce(item, index) {
            var id = item.productVO.id;
            var val = item.productVO.numCount;
            let self = this;
            if (self.flag == true) {
                self.flag = false;
                this.axios
                    .get(this.api.cart.plusOreduce.url + id + "/" + val)
                    .then(function(res) {
                        self.getNum();
                        self.axios
                            .post(self.api.cart.goodsList.url)
                            .then(function(res) {
                                let data = res.data.data.productGroups;
                                var spliceItem = {};
                                self.payAmount = res.data.data.payAmount;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].productVO.id == id) {
                                        data[i].checked = false;
                                        spliceItem = data[i];
                                    }
                                }
                                if (item.productVO.productType == 1) {
                                    //班型
                                    self.cartList[0].list.splice(
                                        index,
                                        1,
                                        spliceItem
                                    );
                                } else if (item.productVO.productType == 2) {
                                    //套餐
                                    self.cartList[0].list.splice(
                                        index,
                                        1,
                                        spliceItem
                                    );
                                } else if (item.productVO.productType == 3) {
                                    //图书
                                    self.cartList[1].list.splice(
                                        index,
                                        1,
                                        spliceItem
                                    );
                                } else if (item.productVO.productType == 4) {
                                    self.cartList[2].list.splice(
                                        index,
                                        1,
                                        spliceItem
                                    );
                                }
                                self.flag = true;
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        //下单
        toOrderList() {
            if (this.isNull == true && this.isCcc == false) {
                //构建数据数组
                let sendMsg1 = [];
                let sendMsg = [];
                let oMsg = [];
                this.cartList.map(item => {
                    item.list.map(item1 => {
                        sendMsg1.push(item1);
                    });
                });
                sendMsg1.map(item => {
                    let notProductClassVOS =
                        (item.productVO &&
                            item.productVO.productClassVOS &&
                            item.productVO.dr == "1") ||
                        (item.productVO &&
                            item.productVO.productClassVOS &&
                            item.productVO.publistStatus == "2") ||
                        (item.productVO &&
                            item.productVO.productClassVOS &&
                            item.productVO.productStatus == "2");
                    let notBookService =
                        (item.productVO &&
                            item.productVO.productBook &&
                            item.productVO.productBook.dr == "1") ||
                        (item.productVO &&
                            item.productVO.productBook &&
                            item.productVO.productBook.productStatus == "2") ||
                        (item.productVO &&
                            item.productVO.productService &&
                            item.productVO.productService.dr == "1") ||
                        (item.productVO &&
                            item.productVO.productService &&
                            item.productVO.productService.productStatus == "2") ||
                            (item.productVO &&item.productVO.dr == '1'  || item.productVO &&item.productVO.productStatus == '2')
                    if (notProductClassVOS || notBookService) {
                    } else {
                        sendMsg.push(item);
                    }
                });
                //存储
                sendMsg.map(item => {
                    let obj = {};
                    var productServiceVOS = [];
                    if (item.productVO.productServiceVOS) {
                        for (
                            var i = 0;
                            i < item.productVO.productServiceVOS.length;
                            i++
                        ) {
                            productServiceVOS.push({
                                serviceId:
                                    item.productVO.productServiceVOS[i]
                                        .serviceId
                            });
                        }
                    }

                    obj.id = item.productVO.id;
                    obj.productType = item.productVO.productType * 1;
                    obj.numCount = item.productVO.numCount;
                    obj.productServiceVOS = productServiceVOS;
                    if (item.productVO.packageGroupId) {
                        obj.packageGroupId = item.productVO.packageGroupId;
                    } else {
                        obj.packageGroupId = null;
                    }
                    obj.productClassVOS=item.productVO.productClassVOS;
                    oMsg.push(obj);

                });



              this.$store.commit("setOrder", oMsg);
                this.$router.push("/orderDetails");
            }
        }
    },
    components: {
        XNumber,
        Scroller,
        Confirm,
        Group,
        XSwitch,
        XButton,
        Toast
    }
};
</script>
<style lang="scss" type="text/scss">
body .vux-number-input {
    height: 0.64rem;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #555555;
}
.el-checkbox__label {
    font-size: 0.28rem;
    color: #555555;
}
.cart_div {
    .vux-number-round .vux-number-selector-sub svg {
        position: relative;
        top: -1px;
        left: -2px;
    }
    .vux-number-round .vux-number-selector-plus svg {
        top: 100px;
        position: relative;
        top: -3px !important;
        left: -3px;
    }
    //改变默认样式专用~彭瑞
    .box .el-checkbox__label {
        width: 100%;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }
    .el-checkbox__label {
        line-height: 0.83rem;
        font-size: 0.26rem;
    }
    .vux-number-selector svg {
        fill: white;
    }
    .vux-number-round .vux-number-selector-sub,
    .vux-number-round .vux-number-selector-plus {
        border: 1px solid #f50;
        background: #f50;
        margin-top: 0.12rem;
    }
    .vux-number-round .vux-number-selector.vux-number-disabled {
        border-color: #ececec;
        background: #ffffff;
        margin-top: 0.12rem;
    }
    .vux-number-input {
        font-size: 0.33rem;
        color: #555555;
        // height: 20px;
        // line-height: -10px;
    }
    .el-checkbox__label {
        width: 98%;
    }
    .el-collapse {
        border-top: none;
    }
    .aaa .el-checkbox__input {
        float: left;
        width: 2%;
        margin-top: 0.3rem;
    }
    .aaa .el-checkbox__input.is-checked + .el-checkbox__label {
        float: right;
        width: 98%;
    }
    .el-checkbox__label {
        padding-top: 0.1rem;
    }
    .weui-cell {
        padding: 0;
    }
    .el-collapse-item__header {
        height: 0.96rem;
        line-height: 0.96rem;
    }
    .el-collapse-item__arrow {
        line-height: 0.96rem;
    }
    .vux-number-round .vux-number-selector {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        font-size: 0.5rem;
        padding-top: 0.05rem;
        padding-left: 0.06rem;
    }
    body .vux-number-input {
        height: 0.64rem;
    }
    .el-checkbox__inner {
        width: 0.28rem;
        height: 0.28rem;
    }
    .el-checkbox {
        font-size: 0.28rem;
    }
    .el-checkbox__inner::after {
        height: 0.14rem;
        left: 0.09rem;
        position: absolute;
        top: 1px;
        width: 0.06rem;
    }
}
</style>

<style lang="scss" scoped type="text/scss">
header {
    width: 100%;
    overflow: hidden;
    height: 0.88rem;
    background: #f4f4f4;
    line-height: 0.88rem;
    position: fixed;
    z-index: 100;
}
.cart_child {
    .title_li {
        padding: 0;
        margin-left: 15px;
        padding-left: 30px;
        color: #9999;
    }
    ul {
        li {
            padding: 0 0.6rem 0 1rem;
            -webkit-box-sizing: border-box;
            font-size: 0.2rem;
            line-height: 0.4rem;
            overflow: hidden;
        }
    }
}

section {
    margin-top: 0.88rem;
}

header div {
    float: left;
    margin-left: 0.3rem;
    font-size: 0.26rem;
}

header button {
    float: right;
    width: 0.88rem;
    height: 0.88rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.26rem;
    color: #9f9f9f;
    background: #f4f4f4;
}
.title {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    font-weight: 200;
    font-size: 0.28rem;
    color: #444444;
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
}
.el-checkbox-group .el-checkbox {
    display: block;
    line-height: 1.1rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    font-weight: normal;
}

.el-checkbox + .el-checkbox {
    margin-left: 0;
}

.el-checkbox span:nth-of-type(1) {
    border: 1px solid #3cbaff;
    color: #3cbaff;
    font-size: 0.22rem;
    padding: 1px;
    text-align: center;
}

.el-checkbox span:nth-of-type(2) {
    font-size: 0.3rem;
}

.el-checkbox span:nth-of-type(3) {
    float: right;
    display: inline-block;
    text-align: right;
    color: #f56016;
    font-size: 0.3rem;
    margin-right: 2.5rem;
}

.border {
    height: 0.16rem;
    width: 100%;
    background: #f4f4f4;
}

.box {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

//滑块
.box1 {
    height: 100px;
    position: relative;
    width: 1490px;
}

.box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
}

.box1-item:first-child {
    margin-left: 0;
}

.box2-wrap {
    height: 300px;
    overflow: hidden;
}

.tabDelete {
    height: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0rem;
    overflow: hidden;
    transition: 0.3s;
    z-index: 500;
    background-color: #fff;
    border-top: 1px solid #e6e6e6;
}

.toShow {
    bottom: -1.5rem;
}

.tabDelete label {
    float: left;
    margin-left: 0.3rem;
    height: 100%;
}

.deleteBar {
    float: right;
    width: 1.26rem;
    height: 0.6rem;
    border: 1px solid #ff0000;
    border-radius: 4px;
    margin-top: 0.2rem;
    margin-right: 0.3rem;
    background: #ff0000;
    color: #ffffff;
    font-size: 0.26rem;
}

footer {
    height: 1rem;
    background: #ffffff;
    width: 100%;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    z-index: 499;
    border-top: 1px solid #e6e6e6;
}

footer > div:nth-of-type(1) {
    width: 19%;
    height: 100%;
    float: left;
}

footer > div:nth-of-type(2) {
    width: 51%;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 1rem;
    font-size: 0.32rem;
}

.toOrderList {
    width: 30%;
    height: 100%;
    float: right;
    background: #f50;
    font-size: 0.32rem;
    color: white;
    text-align: center;
    line-height: 1rem;
}

.cell {
    width: 100%;
    height: 0.6rem;
    background: url("../../styles/img/cart/car.png") no-repeat 0.35rem
        0.045rem;
    background-size: 0.62rem 0.51rem;
    margin-top: 0.25rem;
    border-right: 1px solid #e6e6e6;
}

.cell span {
    display: block;
    padding: 0.05rem;
    width: 0.43rem;
    height: 0.33rem;
    background: #ff0000;
    font-size: 0.22rem;
    color: white;
    border-radius: 40%;
    text-align: center;
    line-height: 0.27rem;
    margin-left: 0.8rem;
    margin-top: 0.1rem;
}

.moneyNum {
    color: #f56016;
    // font-weight: bold;
}
label span:nth-of-type(1) {
    margin-top: 0.1rem;
}
footer .refuse {
    // color: #ccc;
    background: #ccc;
}
body .gray {
    color: #ccc;
}
body .red{
    color: #ce1018;
    text-decoration: line-through;
}
body .grays{
    // color: #ccc;
    background: #ccc;
}
.orange {
    float: right;
    color: #f56016;
    font-size: 0.28rem;
}
body .togray {
    border: 1px solid #ccc;
    background: #ccc;
}
.preventClick{
    pointer-events: none;
}
</style>
