<template>
  <!--图书-->
  <ProductContent :productFrom="productFrom" class="product_book">
    <group style="width: 100%" slot="round">


          <ul class="hotel_cost_ul" style=" width: 100%" >
            <li style="border: 0;float: left">数量</li>
            <li style="border-left: 0;
                         border-bottom-right-radius: 5px;
                           border-top-right-radius: 5px;" @click="jianhao">
              <svg aria-hidden="true" class="icon icon-sm">
                <use data-v-634930a2="" xlink:href="#icon-jiahaocu"></use>
              </svg>
            </li>
            <li style="border-radius: 0">
              <x-input  text-align="center" style="margin: 0;padding: 0" @on-change="changeHot" @on-blur="changeHot" mask="9999"
                       :show-clear="false" v-model.trim="changeValue"></x-input>
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
      <div class="total_div">合计：<span>￥{{countPrice |price}}</span></div>
    </group>
  </ProductContent>
</template>

<script>
  import {XNumber, Flexbox, FlexboxItem, XInput, Group} from 'vux'
  import ProductContent from "@/components/product/product_template.vue"

  export default {
    props: ["productFrom"],
    data() {
      return {countPrice: 0,changeValue:this.productFrom.formRoundValue,}
    },
    created() {

    },
    mounted() {
      this.count(this.productFrom)
    },
    methods: {
      count(item) {
        this.countPrice = item.signDiscountPrice * item.formRoundValue;
        this.productFrom.countPrice=this.countPrice;
      },
//      change (val) {
//        this.productFrom.formRoundValue=val;
//        this.count(this.productFrom);
//      },
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
      },
    },

    components: {
      Flexbox, FlexboxItem, Group, XInput, XNumber, ProductContent
    },
    watch: {
    },

  };
</script>

<style lang="scss" >
  .product_book .vux-number-selector-sub {
    border-right: none;
    padding: 6px 8px 20px 8px;
    border-radius: 2px 0 0 2px;
  }
  .product_book .vux-number-input {
    padding: 13px;
    width: 60px !important;
  }
  .product_book .vux-number-selector-plus {
    border-left: none;
    margin-right: 5px;
    padding:4px 8px 22px 8px;
    border-radius: 0 2px 2px 0;
  }

</style>
<style lang="scss"  scoped type="text/scss">
  .hotel_cost_ul {
    width: 100%;
    overflow: hidden;
    height: 0.9rem;
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
