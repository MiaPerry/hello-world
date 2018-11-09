<template>
  <div>
    <!-- 弹框 -->
      <!--<confirm v-model.trim="show" title="是否添加试听课？" @on-cancel="onCancel" @on-confirm="onConfirm" @on-hide="onHide">-->
        <!--<p style="text-align:center;">{{ 十大 }}</p>-->
      <!--</confirm>-->
    <div class="textBox">
      <input class="moneyAmount" placeholder="输入金额" type="number" v-model.trim="moneyAmount">
      <input class="remarks" type="text" placeholder="请输入备注" v-model.trim="remarks">
    </div>
    <button :class="{hasContent:moneyAmount != ''}" @click="makeSure">确认收款</button>
  </div>
</template>
<script>
  import {XInput, Group, XButton, Cell, Confirm} from "vux";

  export default {
    data() {
      return {
        moneyAmount: "",
        remarks: "",
        show: false
      };
    },
    mounted() {
      XuntongJSBridge.call('setWebViewTitle', {'title': '定金'});
    },
    methods: {
      makeSure() {
        let oMsg = [];
        let obj = {};
        obj.productType = 6;
        obj.saleAmount = this.moneyAmount;
        oMsg.push(obj);
        this.$store.commit("setOrder", oMsg);
        this.$router.push("/orderDetails");
      }
    },
    components: {
      Confirm
    }
  };
</script>
<style lang="scss" scoped type="text/scss">
  .textBox {
    width: 6.9rem;
    height: 4.2rem;
    margin: 0.8rem auto 1.6rem;
    background: url("../../styles/img/cart/moneyBg.png") no-repeat;
    background-size: contain;
    overflow: hidden;
  }

  input {
    width: 4rem;
    height: 0.65rem;
    background: #ebf5fc;
    display: block;
    margin-top: 1rem;
    margin-left: 2rem;
    font-size: 0.32rem;
    text-align: center;
  }

  .remarks {
    margin-top: 0.9rem;
    font-size: 0.32rem;
  }

  button {
    display: block;
    width: 6.5rem;
    height: 1rem;
    font-size: 0.36rem;
    line-height: 1rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 30px;
    color: white;
  }

  .hasContent {
    background: #2188ff;
  }
</style>


