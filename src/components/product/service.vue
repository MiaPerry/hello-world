<template>
  <!--服务-->
  <ProductContent :productFrom="productFrom" class="product_service">
    <group style="width: 100%" slot="round">
      <div v-if="productFrom.dictCode=='HOTELCOST'" class="hotelcost">

        <ul class="hotel_cost_ul">
          <li style="border: 0;float: left">住宿天数</li>
          <li style="border-left: 0;
                     border-bottom-right-radius: 5px;
                       border-top-right-radius: 5px;" @click="jianhao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jiahaocu"></use>
            </svg>
          </li>
          <li style="border-radius: 0">
            <x-input text-align="center" style="margin: 0;padding: 0" @on-change="changeHot" @on-blur="changeHot" mask="9999" :show-clear="false"
                     v-model.trim="numCount"></x-input>
          </li>
          <li style="border-right: 0;
                      border-bottom-left-radius: 5px;
                       border-top-left-radius: 5px;" @click="jiahao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jianhaocu"></use>
            </svg>
          </li>
        </ul>

        <datetime label-width="80px" style="padding-left: 0.1rem;
    box-sizing:border-box;" v-model.trim="productFrom.startTime" title="开始时间:" @on-change="changeEnd" placeholder="开始时间"></datetime>

      </div>

        <!--<x-number title="数量:" v-model.trim="changeValue" :min="0" @on-change="change"></x-number>-->
        <ul class="hotel_cost_ul"  v-else>
          <li style="border: 0;float: left">数量</li>
          <li style="border-left: 0;
                     border-bottom-right-radius: 5px;
                       border-top-right-radius: 5px;" @click="jianhao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jiahaocu"></use>
            </svg>
          </li>
          <li style="border-radius: 0">
            <x-input  text-align="center" style="margin: 0;padding: 0" @on-change="changeHot" @on-blur="changeHot" mask="9999" :show-clear="false"
                      v-model.trim="numCount"></x-input>
          </li>
          <li style="border-right: 0;
                      border-bottom-left-radius: 5px;
                       border-top-left-radius: 5px;" @click="jiahao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jianhaocu"></use>
            </svg>
          </li>
        </ul>
    </group>

    <group title="" style="width: 100%" slot="total">
      <div class="total_div">合计：
        <span>￥{{countPrice | price}}</span>
      </div>
    </group>
  </ProductContent>

</template>

<script>
import { XNumber, Flexbox, FlexboxItem, Group, XInput, Datetime } from "vux";
import ProductContent from "@/components/product/product_template.vue";
export default {
    props: ["productFrom"],
    data() {
        return {
            countPrice: 0,
            changeValue: this.productFrom.formRoundValue,
            numCount: 1
        };
    },
    created() {},
    mounted() {
        this.productFrom.startTime = "";
        this.productFrom.endTime = "";
        this.productFrom.numCount = this.numCount;
        this.count(this.productFrom);
    },
    methods: {
        jianhao() {
            this.numCount++;
            this.changeHot();
        },
        jiahao() {
            if (this.numCount <= 0) {
                this.numCount == 0;
            } else {
                this.numCount--;
            }
            this.changeHot();
        },
        changeEnd() {
            var n = new Date(this.productFrom.startTime).getTime() / 1000;
            var time = 86400 * this.numCount + n;
            this.productFrom.endTime = time;
        },
        count(item) {
            if (item.dictCode == "HOTELCOST") {
                this.countPrice = item.signDiscountPrice * (this.numCount == "" ? 1 : this.numCount);
            } else {
                this.countPrice = item.signDiscountPrice * item.formRoundValue;
            }
            this.productFrom.countPrice = this.countPrice;
        },
        change(val) {
            this.productFrom.formRoundValue = val;
            this.count(this.productFrom);
        },
        changeHot() {
            this.productFrom.formRoundValue = this.numCount;
            this.count(this.productFrom);
        }
    },

    components: {
        Flexbox,
        FlexboxItem,
        Group,
        XNumber,
        ProductContent,
        XInput,
        Datetime
    },
    watch: {}
};
</script>
<style lang="scss"  type="text/scss">
.hotelcost .weui-cell:before {
    left: 0;
}
.product_service .vux-number-selector-sub {
    border-right: none;
    padding: 6px 8px 20px 8px;
    border-radius: 2px 0 0 2px;
}
.product_service .vux-number-input {
    padding: 13px;
    width: 60px !important;
}
.product_service .vux-number-selector-plus {
    border-left: none;
    margin-right: 5px;
    padding: 4px 8px 22px 8px;
    border-radius: 0 2px 2px 0;
}
</style>
<style lang="scss"  scoped type="text/scss">
.hotel_cost_ul {
    width: 100%;
    overflow: hidden;
    height: 0.7rem;
    padding: 6px 0;
    li {
        border: 1px solid #eeeeee;
        text-align: center;
        float: right;
        width: 20%;
        height: 0.56rem;
        .icon-sm {
            width: 0.4rem;
            height: 0.4rem;
            vertical-align: -0.36em;
            color: rgb(255, 85, 0);
        }
    }
}
</style>

