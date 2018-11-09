<template>
  <div style="height: 96%;overflow-y: scroll;">

    <div class="payment_div">
      <div class="odc" style="border-bottom: 1px solid #f1f1f1">
        <div class="payment_price">
          <ul>
            <li style="text-align:center">
              <span class="needPay">￥{{payMentFrom.needPayAmount==null?0:payMentFrom.needPayAmount}}</span>
            </li>
            <li style="font-size: 0.32rem;color:#444444;line-height:0.7rem;">待付款金额</li>
          </ul>
        </div>
      </div>
      <div class="odc" style="border-bottom: 1px solid #f1f1f1" v-if="payMentFrom.approveStatus!=0">
        <ul class="tt_ul">
          <li>
            <svg class="icon-sm" aria-hidden="true">
              <use xlink:href="#icon-xiaoxitixing"></use>
            </svg>
            <span v-if="payMentFrom.approveStatus=='1'">该订单有{{payMentFrom.otherReduceAmount}}元优惠申请正在审核中!</span>
            <span v-else-if="payMentFrom.approveStatus=='3'">该订单有{{payMentFrom.otherReduceAmount }}元优惠申请被驳回!</span>
            <span v-else-if="payMentFrom.approveStatus=='2'">该订单有{{payMentFrom.otherReduceAmount }}元优惠申请通过!</span>
          </li>
        </ul>
      </div>
      <div class="odc">
        <ul class="payment_ul">
          <li @click="selectQRIMG(1)">
            <!--<li @click="erweimaVile=true;selectQRIMG(1)"> 弹窗-->
            <svg class="icon-sm payment_svg" aria-hidden="true">
              <use xlink:href="#icon-pospay"></use>
            </svg>
            <span>线下pos机支付</span>
          </li>

          <!--<li @click="selectQRIMG(3)">-->
          <!--离线支付待修改-->
          <li @click="offLineVile=true;offLineFrom.price=payMentFrom.needPayAmount==null?0:payMentFrom.needPayAmount;selectVoucherList();">
            <svg class="icon-sm payment_svg" aria-hidden="true">
              <use xlink:href="#icon-daifukuan"></use>
            </svg>
            <span>离线支付</span>
          </li>
          <li @click="selectQRIMG(2)">
            <!--<li @click="erweimaVile=true;selectQRIMG(2)">弹窗-->
            <svg class="icon-sm payment_svg" aria-hidden="true">
              <use xlink:href="#icon-fukuan"></use>
            </svg>
            <span>线上二维码支付</span>
          </li>
          <li @click="selectQRIMG(4)">
            <svg class="icon-sm payment_svg" aria-hidden="true">
              <use xlink:href="#icon-fukuan"></use>
            </svg>
            <span>手机APP支付</span>
          </li>
        </ul>

      </div>
      <div>
        <div v-if="payMentFrom.orderStatus!=1&&payMentFrom.orderStatus!=2">
          <span v-if="payMentFrom.approveStatus!='2'&&payMentFrom.approveStatus!='1'">
            <x-button type="primary" style="width: 90%;height: 40px;line-height: 40px;margin-top: 30px;" @click.native="showDialog=true;offLineVile=false;selectPreferentialList();">申请优惠
            </x-button>
          </span>
          <span v-else-if="payMentFrom.otherReduceAmount==0">
            <x-button type="primary" style="width: 90%;height: 40px;line-height: 40px;margin-top: 30px;" @click.native="showDialog=true;offLineVile=false;selectPreferentialList();">申请优惠
            </x-button>
          </span>
        </div>
        <!--<x-button type="primary" style="margin-top:0.2rem;width:90%;" ><a style="color:white" href="mqq://">打开微信</a>-->
        <!--</x-button>-->
        <x-button type="default" style="margin-top:0.2rem;width:90%" @click.native="$router.push('/order')">取消
        </x-button>
      </div>
      <popup v-model.trim="erweimaVile" position="bottom" height="350px">
        <div style="text-align: center;margin:50px 0;">
          <qrcode :value="QRURL" type="img" style="width: 160px;height: 160px;margin: 0 auto; "></qrcode>
          <div class="font_12" style="margin-top: 10px;">请用扫码进行支付操作!</div>
        </div>
        <div style="padding: 0px 15px; ">
          <x-button @click.native="erweimaVile = false" plain type="primary">完成</x-button>
        </div>
      </popup>
      <popup class="popup" v-model.trim="offLineVile" height="80%" width="100%" position="left" style="background-color:#fff;border-radius:0;z-index:1000;">
        <div class="odc" style="margin: 0;">
          <ul class="offLine_ul">
            <li>
              <selector style="padding-left:10px;box-sizing:border-box;" direction="ltr" ref="defaultValueRef" title="支付类型:" :options="voucherList" v-model.trim="offLineFrom.voucher" text-align="right"></selector>
            </li>
            <li>
              <x-input style="padding-left:10px;padding-right:10px;box-sizing:border-box" title="凭证单号:" placeholder="凭证单号" :required="false" v-model.trim="offLineFrom.numbers" text-align="left"></x-input>
            </li>
            <li>
              <datetime style="padding-left:10px;padding-right:10px;box-sizing:border-box;" v-model.trim="offLineFrom.time" :min-year=2018 :max-year="maxYear" format="YYYY-MM-DD HH:mm" title="支付时间:" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
            </li>
          </ul>
          <h3 style="font-size:0.32rem;line-height:1.5rem;padding-left:10px;box-sizing:border-box">请上传支付单据截图／照片</h3>
          <el-upload multiple :action="uploadUrl" list-type="picture-card" :on-preview="selectUploadPhoto" :on-remove="removePhoto" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload" :on-error="uploadError" :headers="headers" :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <x-button style="width:90%;margin-top:3rem;" type="primary" @click.native="offLineSubmit();">提交</x-button>
        <x-button style="width:90%;margin-top:0.2rem;" type="default" @click.native="offLineVile=false">取消</x-button>
      </popup>
    </div>
    <x-dialog v-model.trim="dialogVisible" @click="dialogVisible=false" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
      <img width="100%" :src="dialogImageUrl" alt="" @click="dialogVisible=false">
    </x-dialog>
    <popup v-model.trim="showDialog" hide-on-blur @on-hide="category=-1" height="80%" width="100%" position="left" style="background-color:#ffffff;overflow-y:auto">
      <div class="odc">
        <div class="cto">
          <ul class="offLine_ul">
            <li>
              <selector ref="defaultValueRef" style="padding-left: 10px;box-sizing:border-box;font-size:0.32rem;" title="优惠类型:" :options="preferentialList" v-model.trim="discountFrom.otherReduceType"></selector>
            </li>
            <li>
              <x-input title="优惠金额:" maxlength="6" style="padding-left: 10px;box-sizing:border-box;font-size:0.32rem;padding-right:0.2rem;" placeholder="优惠金额" :required="false" v-model.trim="discountFrom.otherReduceAmount" text-align="right"></x-input>
            </li>
          </ul>
        </div>
      </div>
      <h3 class="order_title1">备注信息:</h3>
      <div class="order_content1">
        <x-textarea v-model.trim="discountFrom.remarks" :max="200" name="description" placeholder="备注"></x-textarea>
      </div>
      <x-button type="primary" style="width:90%;margin-top:3rem;" @click.native="submitReduce" v-if="otherReducevail==true">申请
      </x-button>
      <x-button type="primary" style="width:90%;margin-top:3rem;" v-else>申请</x-button>
      <x-button type="default" style="margin-top:0.2rem;width:90%" @click.native="showDialog = false">取消
      </x-button>
    </popup>
  </div>
</template>

<script>
import {
    Checker,
    Alert,
    Selector,
    Group,
    CheckerItem,
    Msg,
    Divider,
    XButton,
    Tabbar,
    XDialog,
    Qrcode,
    Checklist,
    XInput,
    Popup,
    Radio,
    PopupRadio,
    Datetime,
    TabbarItem,
    XTextarea
} from "vux";

export default {
    data() {
        return {
            otherReducevail: true,
            maxYear: new Date().getFullYear() * 1,
            uploadUrl: "",
            headers: {
                Authorization: "Barner " + localStorage.token,
                appId: this.appId,
                version: ""
            },
            showDialog: false,
            dn: false,
            fullHeight: document.documentElement.clientHeight,
            dialogImageUrl: "",
            dialogVisible: false, //添加图片
            erweimaVile: false, //二维码支付弹框
            offLineVile: false, //离线支付弹框
            offLineFrom: {
                //离线支付
                time: "", //时间
                voucher: "", //优惠类型
                numbers: "", //凭证单号
                price: "",
                remark: "" //备注
            },
            discountFrom: {
                //优惠表单
                orderId: "", //订单Id
                otherReduceAmount: 0, // 订单优惠金额 ,
                otherReduceType: "", //订单优惠类型
                remarks: "", //订单优惠备注
                payAmount: 0
            },
            fileList: [],
            preferentialList: [], //优惠类型
            voucherList: [], //凭证类型列表
            voucher: {},
            payMentFrom: {}, //页面基本数据
            icon: "",
            buttons: [
                {
                    type: "primary",
                    text: "Primary button",
                    link: "/demo"
                },
                {
                    type: "default",
                    text: "Secondary button",
                    link: "/demo"
                }
            ],
            QRURL: ""
        };
    },
    created() {},
    mounted() {
        XuntongJSBridge.call("setWebViewTitle", { title: "支付" });
        this.uploadUrl = process.env.UPLOAD + this.api.upload.url + "/pay";
        const that = this;
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight;
                that.fullHeight = window.fullHeight;
            })();
        };
        this.selectPayMent();
        //      this.selectPreferentialList(); //申请优惠
        //        this.selectVoucherList(); //查询凭证列表
    },
    methods: {
        removePhoto(file, fileList) {
            for (var i = 0; i < this.fileList.length; i++) {
                var item = this.fileList[i];
                if (item.id == file.id) {
                    this.fileList.splice(i, 1);
                }
            }
            if (file.id == undefined) {
                return;
            }
            this.axios.get(this.api.delImg.url + file.id).then(reponse => {
                this.$vux.toast.show({
                    text: "图片删除!",
                    type: "success"
                });
            });
        },
        uploadError(err, file, fileList) {
            this.$vux.alert.show({
                title: "文件上传失败!"
            });
        },
        beforeAvatarUpload(file) {
            var isJPG = false;
            switch (file.type) {
                case "image/png":
                    isJPG = true;
                    break;
                case "image/jpeg":
                    isJPG = true;
                    break;
                default:
                    isJPG = false;
                    break;
            }
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isJPG) {
                this.$vux.alert.show({
                    title: "上传头像图片只能是 JPG/PNG 格式!"
                });
            }
            if (!isLt2M) {
                this.$vux.alert.show({
                    title: "上传头像图片大小不能超过 10MB!"
                });
            }
            return isJPG && isLt2M;
        },
        selectPreferentialList() {
            this.axios
                .post(this.api.dict.dictSearch.url, {
                    blurSearch: {},
                    order: {},
                    page: 0,
                    pageNum: 0,
                    search: { dictCode: "DISCOUNTTYPE" }
                })
                .then(res => {
                    var items = res.data.data;
                    for (var i = 0; i < items.length; i++) {
                        this.preferentialList.push({
                            key: items[i].dictValue,
                            value: items[i].dictValue
                        });
                    }
                });
        },
        uploadSuccess(res, file, fileList) {
            if (res.code == 0) {
                //          var item = res.data;
                //          item.url =process.env.UPLOAD + this.api.pay.imgas.url + item.id + "?version=" + process.env.WD_VERSSION + "&token=" + item.token;
                //          this.fileList.push(item);
                //          for(var i=0;i<fileList.length;i++){
                //            var item = fileList[i];
                //            if(item.id){
                //              item.url =process.env.UPLOAD + this.api.pay.imgas.url + item.id + "?version=" + process.env.WD_VERSSION + "&token=" + item.token;
                //              this.fileList.push(item);
                //            }
                //          }
                this.fileList = fileList;
            } else {
                this.$vux.toast.show({
                    text: "图片上传失败!",
                    type: "warn"
                });
            }
        },
        selectVoucherList() {
            this.axios
                .post(this.api.dict.dictSearch.url, {
                    blurSearch: {},
                    order: {},
                    page: 0,
                    pageNum: 0,
                    search: { dictCode: "VOUCHERTYPE" }
                })
                .then(res => {
                    var items = res.data.data;
                    for (var i = 0; i < items.length; i++) {
                        this.voucherList.push({
                            key: items[i].dictValue,
                            value: items[i].dictValue
                        });
                    }
                });
        },
        selectPayMent() {
            this.axios
                .get(
                    this.api.pay.payInfo.url +
                        "?orderId=" +
                        this.$route.params.id
                )
                .then(res => {
                    this.payMentFrom = res.data.data;
                });
        },
        selectQRIMG(num) {
            this.payMentFrom.payType = num;
            this.$vux.loading.show({
                text: "加载中"
            });
            this.axios
                .post(this.api.pay.paySubmit.url, this.payMentFrom)
                .then(res => {
                    this.$vux.loading.hide();
                    if (num == 4) {
                        var isPeople = navigator.userAgent.match(
                            /\(i[^;]+;( U;)? CPU.+Mac OS X/
                        )
                            ? "iOS"
                            : navigator.userAgent.match(/Android/i)
                                ? "Android"
                                : "";
                        if ("IOS" == isPeople.toUpperCase()) {
                            qing.call("gotoApp", {
                                data:
                                    "wdserviceos://action/?orderno=" +
                                    res.data.data,
                                success: function(res) {
                                    if (res.success == "false") {
                                        window.location.href =
                                            "https://fir.im/wdpayment";
                                    }
                                },
                                error: function(result) {}
                            });
                        } else {
                            qing.call("gotoApp", {
                                data:
                                    "activity://com.wendu.cispay/mainac?orderno=" +
                                    res.data.data,
                                success: function(result) {}
                            });
                        }
                    } else if (num == 2) {
                        this.erweimaVile = true;
                        this.QRURL = res.data.data;
                    } else {
                        window.location.href = res.data.data;
                    }
                });
        },
        toastMsg(type, msg) {
            this.$vux.toast.show({
                text: msg,
                type: "warn"
            });
        },
        isTextNull: function(value, msg) {
            return {
                valid: value == "",
                msg: msg + "不能为空"
            };
        },
        offLineSubmit() {
            var item2 = this.isTextNull(
                this.offLineFrom.voucher,
                "请选择支付类型"
            );
            var item3 = this.isTextNull(
                this.offLineFrom.numbers,
                "请输入凭单号"
            );
            var item1 = this.isTextNull(this.offLineFrom.time, "请选择时间");
            if (item2.valid == true) {
                this.toastMsg("warn", item2.msg);
            } else if (item3.valid == true) {
                this.toastMsg("warn", item3.msg);
            } else if (item1.valid == true) {
                this.toastMsg("warn", item1.msg);
            } else if (this.fileList.length <= 0) {
                this.toastMsg("warn", "请选择上传图片");
            } else {
                this.$vux.loading.show({
                    text: "支付中......"
                });
                console.log(this.fileList);
                this.payMentFrom.payType = 3;
//                this.payMentFrom.otherPayDate =
//                    new Date(this.offLineFrom.time).getTime() / 1000;

              var arr = this.offLineFrom.time.split(/[- : \/]/);
              this.payMentFrom.otherPayDate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]).getTime()/1000;

//              console.log(this.payMentFrom.otherPayDate  +" 时间")
                this.payMentFrom.ids = [];
                for (var i = 0; i < this.fileList.length; i++) {
                    this.payMentFrom.ids.push(
                        this.fileList[i].response.data.id
                    );
                }
                this.payMentFrom.unpayTime=this.payMentFrom.otherPayDate;
                this.payMentFrom.otherPayType = this.offLineFrom.voucher;
                this.payMentFrom.feeNo = this.offLineFrom.numbers;
                this.axios
                    .post(this.api.pay.paySubmit.url, this.payMentFrom)
                    .then(res => {
                        this.$vux.loading.hide();
                        this.QRURL = res.data.data;
                        window.location.href = res.data.data;
                        this.offLineVile = false;
                    });
            }
        },
        //提交优惠申请
        submitReduce() {
            var str = /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/;
            if(this.discountFrom.otherReduceAmount==""){
                this.$vux.toast.show({
                    text: "优惠类型不能为空!",
                    type: "warn"
                });
                return
            }
            if(this.discountFrom.otherReduceAmount==""||this.discountFrom.otherReduceAmount==0){
                this.$vux.toast.show({
                    text: "优惠金额不能为空和0!",
                    type: "warn"
                });
                return
            }
            if (!str.test(this.discountFrom.otherReduceAmount)) {
                this.$vux.toast.show({
                    text: "请输入正确的费用,最多保留两位小数!",
                    type: "warn"
                });
                return
            }
            if (
                this.discountFrom.otherReduceAmount >
                this.payMentFrom.needPayAmount
            ) {
                this.$vux.toast.show({
                    text: "申请优惠不能大于待支付金额!",
                    type: "warn"
                });
                 return
            }
             this.$vux.loading.show({
                    text: "申请提交中"
                });
                this.discountFrom.orderId = this.payMentFrom.orderNo;
                this.discountFrom.payAmount = this.payMentFrom.needPayAmount;
                this.otherReducevail = false;
                this.axios
                    .post(this.api.pay.payReduce.url, this.discountFrom)
                    .then(res => {
                        this.otherReducevail = true;
                        this.showDialog = false;
                        this.payMentFrom.otherReduceAmount = this.discountFrom.otherReduceAmount;
                        this.payMentFrom.approveStatus = "1";
                        this.$vux.loading.hide();
                        this.$vux.toast.show({
                            text: res.data.data,
                            type: "success"
                        });
                    })
                    .catch(res => {
                        this.otherReducevail = true;
                        this.$vux.toast.show({
                            text: res.data.msg + "!",
                            type: "warn"
                        });
                    });
        },
        change(value, label) {
            this.offLineFrom.voucher = value;
        },
        selectUploadPhoto(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    components: {
        Checker,
        Selector,
        Group,
        CheckerItem,
        Msg,
        Divider,
        XButton,
        XDialog,
        Qrcode,
        Checklist,
        Alert,
        XInput,
        Popup,
        Radio,
        PopupRadio,
        Datetime,
        Tabbar,
        TabbarItem,
        XTextarea
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
.el-upload--picture-card {
    margin-left: 15px;
    // width: 2rem;
    // height: 2rem;
    // border-radius:5px;
}

.weui-textarea {
    background: #eeeeee;
}

.vux-popup-dialog {
    z-index: 1200;
}

.el-upload-list__item-thumbnail {
    object-fit: cover !important;
}
</style>
<style lang="scss" scoped type="text/scss">
.order_title1 {
    font-size: 0.32rem;
    text-align: left;
    float: left;
    width: 5.5em;
    padding-left: 10px;
    box-sizing: border-box;
    margin-top: 0.5rem;
}

.order_title {
    font-size: 16px;
    color: #999999;
}

.payment_div .pay_title {
    color: #999999;
    border-bottom: 1px solid #f1f1f1;
}

.order_content1 {
    display: block;
    border: 1px solid #f1f1f1;
    width: 90%;
    margin: 1.5rem auto;
    overflow: hidden;
    margin-bottom: -1px;
    font-size: 12px;
    border-radius: 5px;
    background: #eeeeee;
}

.icon-sm {
    width: 1.5em;
    height: 1.5em;
    height: 20px;
    line-height: 20px;
}

.tt_ul {
    font-size: 12px;
    text-align: left;
    padding: 5px 0;
    box-sizing: border-box;
    li {
        // height: 20px;
        line-height: 20px;
        font-size: 0.26rem;
    }
    overflow: hidden;
}

.dn {
    display: none;
}

.payment_ul {
    font-size: 14px;
    text-align: left;
    li {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.3rem;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 5px;
        box-sizing: border-box;
    }
}

.offLine_ul {
    li {
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 1px solid #f1f1f1;
        overflow: hidden;
    }
    .weui-cell {
        text-align: left;
        padding: 0;
        p {
        }
    }
}

.payment_div {
    // background: #fffcfc;
    height: 100%;
}

.payment_svg {
    color: rgb(97, 204, 115);
}

.payment_price {
    text-align: center;
    padding: 1.1rem;
    box-sizing: border-box;
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

// 9.7日彭瑞修改ui
.needPay {
    font-size: 0.44rem;
    color: #f56016;
}

option {
    padding-left: 0.2rem;
    // font-size:0.24rem;
}

.popup .weui-label {
    padding-left: 10px;
    box-sizing: border-box;
}
</style>
