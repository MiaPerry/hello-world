<template>
    <div class="orderList">
        <!-- 加载中 -->
        <div v-transfer-dom>
            <loading :show="show1" text="加载中"></loading>
        </div>
        <!-- 取消确认弹窗 -->
        <div v-transfer-dom>
            <confirm v-model.trim="show" @on-confirm="onConfirm">
                <p style="text-align:center;font-size:0.42rem;">确定要取消订单吗？</p>
            </confirm>
        </div>
        <!-- 取消成功之后文字提示 -->
        <toast v-model.trim="show2" type="text">取消成功！</toast>

        <!-- 删除确认弹窗 -->
        <div v-transfer-dom>
            <confirm v-model.trim="shows" @on-confirm="onConfirms">
                <p style="text-align:center;font-size:0.42rem;">确定要删除订单吗？</p>
            </confirm>
        </div>
        <!-- 删除成功之后文字提示 -->
        <toast v-model.trim="show3" type="text">删除成功！</toast>
        <!-- 导航 -->
        <tab :line-width="1" custom-bar-width="60px" bar-active-color="#3cbaff">
            <tab-item @on-item-click="handler('-1')" selected>待付款</tab-item>
            <tab-item @on-item-click="handler('6')">已退款</tab-item>
            <tab-item @on-item-click="handler('')">全部订单</tab-item>
        </tab>
        <!-- 滑块 -->
        <scroller lock-x height="94%" @on-pulldown-loading="aaa" style="position:absolute;top:0.85rem;width:100%" ref="scrollerBottom" :scroll-bottom-offst="200" :scroll-top-offst="200" @on-scroll-bottom="onScrollBottom">
            <div class="box2" v-show="!boolean">
                <div class="item" v-for="item in list" :key="item.id">
                    <div @click="$router.push('/orderInfo/'+item.id)">
                        <div class="orderHeader">
                            <p>订单号：{{item.orderNo}}</p>

                            <span v-show="item.orderStatus == 0">待支付</span>
                            <span v-show="item.orderStatus == 1">已支付</span>
                            <span v-show="item.orderStatus == 2">部分付款</span>
                            <span v-show="item.orderStatus == 3">现金支付待审批</span>
                            <span v-show="item.orderStatus == 4">已取消</span>
                            <!-- <span v-show="item.orderStatus == 5">现金支付已驳回</span> -->
                            <span v-show="item.orderStatus == 6">已退款</span>
                            <span v-show="item.orderStatus == 7">支付中</span>
                        </div>
                        <div v-for="items in item.orderDetailVOS" :key="items.id" class="orderContent">
                            <div class="itemDetailBox" v-if="items.productName">
                                <p>{{items.productName}}</p>
                            </div>
                            <p>￥{{items.allPayAmount}}</p>
                        </div>
                        <div class="orderPrice">
                            <span>{{item.createTime | time}}</span>
                            <span>合计：￥{{item.realPayAmount}}</span>
                        </div>
                    </div>
                    <div class="orderOperate" v-if="item.orderStatus != 1">
                      <!--&&(orderFrom.realPayAmount==orderFrom.otherAmount)-->
                        <button @click="deletes(item.id)" v-if="item.orderStatus == 4 || item.orderStatus == 6">删除订单</button>
                        <button v-if="item.orderStatus == 0" @click="$router.push('/payment/'+item.id)">付款</button>
                        <button v-if="item.orderStatus ==3  && (item.needPayAmount!=item.otherAmount)" @click="$router.push('/payment/'+item.id)">还需支付{{item.needPayAmount | price}}元</button>
                        <button v-if="item.orderStatus == 2" @click="$router.push('/payment/'+item.id)">还需支付{{item.needPayAmount}}元</button>
                        <button @click="cancel(item.id)" v-if="item.orderStatus == 0">取消订单</button>
                        <button style="border:none;background:#ccc;color:white" v-if="item.orderStatus == 4">已取消</button>
                    </div>
                </div>
                <load-more tip="loading" v-show="conditions.page<totalPages"></load-more>
                <load-more style="margin-top:1.2rem;" v-show="list.length == 0" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
            </div>
            <div v-show="boolean" style="text-align:center;line-height:2rem;color:#2d2d2d">正在努力研发中，敬请期待~</div>
        </scroller>
    </div>
</template>

<i18n>
set bar-active-color:
  zh-CN: 设置bar颜色
</i18n>

<script>
import {
    Tab,
    TabItem,
    Scroller,
    LoadMore,
    TransferDomDirective as TransferDom,
    Confirm,
    Toast,
    Loading
} from "vux";

export default {
    components: {
        Tab,
        TabItem,
        Scroller,
        LoadMore,
        Confirm,
        Toast,
        Loading
    },
    directives: {
        TransferDom
    },
    data() {
        return {
            id: "",
            loadNum: [],
            list: [],
            show: false,
            show1: true,
            show2: false,
            shows: false,
            show3: false,
            boolean: "",
            totalPages: "",
            onFetching: false,
            conditions: {
                page: 1,
                pageNum: "10",
                search: {
                    status: "-1"
                }
            }
        };
    },
    mounted() {
      XuntongJSBridge.call('setWebViewTitle', {'title': '订单列表'});
        this.getList(0);
    },
    methods: {
        aaa() {

        },
        //切换
        handler(status) {
            this.conditions.page = 1;
            this.conditions.search.status = status;
            if (status == "-1") {
                this.boolean = false;
                this.getList(0);
            } else if (status == "1") {
                this.boolean = true;
            } else {
                this.boolean = false;
                this.getList(0);
            }
        },
        //订单列表
        getList(status) {
            let self = this;
            if (this.conditions.search.status == "1") {
                self.list = [];
                return;
            }
            this.axios
                .post(this.api.order.getList.url, this.conditions)
                .then(function(res) {
                    self.show1 = false;
                    let data = res.data.data.resultList;
                    self.totalPages = res.data.data.totalPages;
                    if (status == 0) {
                        self.list = data;
                    } else if (status == 1) {
                        self.list = self.list.concat(data);
                    }
                });
        },
        //加载更多
        onScrollBottom() {
            let self = this;
            if (this.onFetching) {
                // do nothing
            } else {
                self.onFetching = true;
                if (self.totalPages > self.conditions.page) {
                    setTimeout(() => {
                        self.conditions.page++;
                        self.getList(1);
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset();
                        });
                        this.onFetching = false;
                    }, 2000);
                }
            }
        },
        //取消订单
        cancel(id) {
            let self = this;
            self.show = true;
            self.id = id;
        },
        //确定
        onConfirm() {
            let self = this;
            this.axios
                .get(this.api.order.cancel.url + self.id)
                .then(function(res) {
                    self.show2 = true;
                    self.getList(0);
                });
        },

        //删除订单
        deletes(id) {
            let self = this;
            self.shows = true;
            self.id = id;
        },
        //确定
        onConfirms() {
            let self = this;
            this.axios
                .get(this.api.order.delete.url + self.id)
                .then(function(res) {
                    self.show3 = true;
                    self.getList(0);
                });
        }
    }
};
</script>
<style lang="scss">
.orderList .vux-tab-container {
    height: 0.85rem;
}
.orderList .vux-tab {
    height: 0.85rem;
}
.orderList .vux-tab .vux-tab-item {
    height: 0.85rem;
    line-height: 0.85rem;
}
.orderList .vux-tab-wrap {
    padding-top: 0.85rem;
}
.orderList .vux-tab .vux-tab-item.vux-tab-selected {
    color: #3cbaff;
    border-bottom: 3px solid #3cbaff;
    font-size: 0.32rem;
}
.orderList .vux-tab .vux-tab-item {
    font-size: 0.32rem;
}
</style>
<style lang="less" scoped>

header {
    width: 100%;
    height: 0.75rem;
    background: #f4f4f4;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.75rem;
    color: #333333;
}

.box {
    padding: 15px;
}
.active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
}
.active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
    background-color: #fff;
    height: 100px;
}
/*滑块*/
.box1 {
    height: 100px;
    position: relative;
    width: 1490px;
}
.box1-item {
    float: left;
    width: 200px;
    background-color: #ccc;
    margin-left: 15px;
    line-height: 100px;
}
.box1-item:first-child {
    margin-left: 0;
}
.box2 {
    min-height: 100%;
}
.box2-wrap {
    height: 300px;
    overflow: hidden;
}
.item {
    width: 100%;
    border-bottom: 10px solid #eaeaea;
}
.item:nth-of-type(1) {
    border-top: none;
}
.orderHeader {
    height: 0.9rem;
    width: 100%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    line-height: 0.9rem;
    overflow: hidden;
}
.orderHeader p {
    float: left;
    font-size: 0.3rem;
}
.orderHeader span {
    float: right;
    font-size: 0.3rem;
    color: #f66513;
}
.orderContent {
    font-size: 0.25rem;
    padding: 0.02rem 0.3rem;
    box-sizing: border-box;
    background-color: #fafafa;
    border-bottom: 1px dashed #e6e6e6;
    overflow: hidden;
}
.orderContent .itemDetailBox {
    float: left;
    width: 70%;
    height: 100%;
    line-height: 0.7rem;
}
.orderContent .itemDetailBox p:nth-of-type(1) {
    color: #666666;
}
.orderContent .itemDetailBox p:nth-of-type(2) {
    color: #3cbaff;
}
.orderContent > p {
    float: right;
    color: #666666;
    width: 30%;
    height: 100%;
    line-height: 0.7rem;
    text-align: right;
}
.orderPrice {
    overflow: hidden;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
}
.orderPrice span:nth-of-type(1) {
    float: left;
    font-size: 0.28rem;
    color: #b2b2b2;
}
.orderPrice span:nth-of-type(2) {
    float: right;
    font-size: 0.3rem;
    color: #000;
    font-weight: bold;
}
.orderOperate {
    overflow: hidden;
    padding: 0.25rem 0.3rem;
    box-sizing: border-box;
    box-sizing: border-box;
}
.orderOperate button {
    float: right;
    padding: 0 0.3rem;
    box-sizing:border-box;
    height: 0.52rem;
    line-height: 0.55rem;
    border-radius: 15px;
    text-align: center;
    color: white;
    background: #f66513;
    font-size: 0.28rem;
}
.orderOperate button:nth-of-type(2) {
    margin-right: 0.2rem;
    background: #ffffff;
    color: #fff;
    background: #ccc;
}
</style>
