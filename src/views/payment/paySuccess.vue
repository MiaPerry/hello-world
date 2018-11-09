<template>
  <div style="background-color: #eeeeee">
    <div class="msg_div" style="padding-bottom: 0.1rem">
      <div class="msg_top_div">
        <svg class="icon-sm" aria-hidden="true" :class="{svgAction:payForm.iconStatus==2}">
          <use :xlink:href="payForm.icon"></use>
        </svg>
        <div style="color: #F56219;">
          ￥{{payForm.title || 0 | price}}
        </div>
        <div :class="{active:payForm.type==1}">
          {{payForm.description}}
        </div>
      </div>
      <!--{{time}}-->
      <flexbox class="fle_box_button" style="padding: 0 0.2rem">
        <flexbox-item v-for="(item,index) in buttons" :key="index">
          <x-button :type="item.type" :link="item.link" plain style="font-weight: 1; border-radius: 0">{{item.text}}
          </x-button>
        </flexbox-item>
      </flexbox>
      <!--buttons-->
    </div>
    <!--<div class="msg_div" v-if="payForm.iconStatus==1">-->
    <!--<ul>-->
    <!--<li>-->
    <!--<span class="msg_span_left">付款信息</span>-->
    <!--<span class="msg_span_rigth">{{payForm.info}}</span>-->
    <!--</li>-->
    <!--<li>-->
    <!--<span class="msg_span_left">收款方</span>-->
    <!--<span class="msg_span_rigth">{{payForm.receivables}}</span>-->
    <!--</li>-->
    <!--<li>-->
    <!--<span class="msg_span_left">付款时间</span>-->
    <!--<span class="msg_span_rigth">{{payForm.time | time}}</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
  </div>

</template>
<script>

  import {
    Msg, Divider, XButton, Flexbox, FlexboxItem
  } from 'vux'
  import {getUrlParam} from '@/util/urlParam'
  export default {
    data() {
      return {
        fcid: "",
        time:5,
        payForm: {
          title: "",
          description: "",
          info: "",
          receivables: "北京文都",
          time: "",
          type: 0,
          icon: "#icon-wancheng",
          iconStatus: 1,
        },
        buttons: [{
          type: 'primary',
          text: '返回首页',
          link: '/'
        }, {
          type: 'warn',
          text: '返回产品列表',
          link: '/product'
        }],
      };
    },
    mounted() {
      var url = window.location.href;
      this.fcid = url.substring(url.indexOf("fcid") + 5, url.indexOf("fcid") + 23);
      this.selectPay();
    },
    methods: {
      selectPay() {
        this.axios.get(this.api.pay.getRecordByPayId.url + "?payId=" + this.fcid)
          .then(res => {
          var item = res.data.data;
          this.payForm.title = item.paidAmount;
          if (item.payedType == 0) {
            this.payForm.description = "待财务审核";
            this.payForm.type = 1;
          } else {
            this.payForm.description = "支付成功";
            this.payForm.type = 0;
          }
          this.payForm.info = item.feeName;
          this.payForm.receivables = "";
          this.payForm.time = item.updateTime;
          this.payForm.icon = "#icon-wancheng";
          this.payForm.iconStatus = 1; //1是成功,2是失败
//          this.setInter();
        })
        .catch(res => {
          this.payForm.icon = "#icon-guanbi";
          this.payForm.iconStatus = 2; //1是成功,2是失败
          this.payForm.description = "暂未查询到此记录,请稍后再试!";
          this.payForm.title = 0;
//          this.setInter();
//          this.$vux.toast.show({
//            text: res.data.msg + "!",
//            type: "warn"
//          });
        })
      },
      setInter(){
        var self=this;
        var a=setInterval(function(){
          self.time--;
          if(self.time==0){
            clearInterval(a);
            self.$router.push("/")
          }
        },1000);
      }
    },
    components: {Msg, Divider, XButton, Flexbox, FlexboxItem},
    watch: {}
  };
</script>
<style>
  .fle_box_button .weui-btn:after {
    border-radius: 0px;
  }
</style>
<style lang="scss" scoped type="text/scss">
  .msg_div {
    background: #ffffff;
    margin-bottom: 0.15rem;
    font-weight: 600;
    .msg_top_div {
      text-align: center;
      padding: 1rem 0;
      .icon-sm {
        width: 1.5rem;
        height: 1.5rem;
        color: #04be02;
      }
      div {
        height: 0.6rem;
        line-height: 0.6rem;
      }
      .active {
        color: #04be02;
      }
      .svgAction {
        color: red;
      }
    }
    ul {
      li {
        width: 100%;
        overflow: hidden;
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #e1e1e1;
        .msg_span_left {
          float: left;
        }
        .msg_span_rigth {
          float: right;
        }
      }
    }
  }

</style>
