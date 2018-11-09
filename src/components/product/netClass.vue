<template>
  <!--一对一-->
  <ProductContent :productFrom="productFrom">
    <group style="width: 100%" slot="round">
      <div style="text-align: right;width: 100%">
        <!--<x-number title="课时数:" v-model.trim="changeValue" :min="0" @on-change="change"></x-number>-->

        <ul class="hotel_cost_ul" style=" width: 100%">
          <li style="border: 0;float: left">课时数</li>
          <li style="border-left: 0;
                     border-bottom-right-radius: 5px;
                       border-top-right-radius: 5px;" @click="jianhao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jiahaocu"></use>
            </svg>
          </li>
          <li style="border-radius: 0">
            <x-input type="number" pattern="\d*" text-align="center" style="margin: 0;padding: 0" @on-change="changeHot" mask="9999" @on-blur="changeHot" v-model.trim="changeValue"></x-input>
          </li>
          <li style="border-right: 0;
                      border-bottom-left-radius: 5px;
                       border-top-left-radius: 5px;" @click="jiahao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jianhaocu"></use>
            </svg>
          </li>
        </ul>

      </div>
    </group>
    <BottomVue slot="bottom" :productFrom="productFrom"></BottomVue>
    <group title="" style="width: 100%" slot="total">
      <div class="total_div">合计：
        <span>￥{{countPrice}}</span>
      </div>
    </group>
  </ProductContent>
</template>

<script>
import { XNumber, Flexbox, FlexboxItem, XInput, Group } from "vux";
import ProductContent from "@/components/product/product_template.vue";
import BottomVue from "@/components/product/product_bottom.vue";

export default {
    props: ["productFrom"],
    data() {
        return { countPrice: 0, changeValue: this.productFrom.formRoundValue };
    },
    created() {},
    mounted() {
        this.count(this.productFrom);
    },
    methods: {
        count(item) {
            this.countPrice = item.signDiscountPrice * item.formRoundValue;
            this.productFrom.countPrice = this.countPrice;
        },
        //      change (val) {
        //        this.productFrom.formRoundValue=val;
        //        this.count(this.productFrom);
        //      }
        changeHot() {
            this.productFrom.formRoundValue = this.changeValue;
            this.count(this.productFrom);
        },
        jianhao() {
            this.changeValue++;
            this.changeHot();
        },
        jiahao() {
            if (this.changeValue <= 0) {
                this.changeValue == 0;
            } else {
                this.changeValue--;
            }
            this.changeHot();
        }
    },
    components: {
        Flexbox,
        FlexboxItem,
        Group,
        XInput,
        XNumber,
        ProductContent,
        BottomVue
    },
    watch: {}
};
</script>
<style lang="scss" scoped>
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
