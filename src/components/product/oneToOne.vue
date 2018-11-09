<template>
  <div class="one-to-one-div">
    <!--|| productFrom.lessonHourPrice-->
    <ProductContent :productFrom="productFrom" class="product_book">
      <group style="width: 100%" slot="round" >



        <ul class="hotel_cost_ul" style=" width: 100%" >
          <li style="border: 0;float: left;text-align: left;padding-left: 3px;">课时数</li>
          <li style="border-left: 0;
                     border-bottom-right-radius: 5px;
                       border-top-right-radius: 5px;" @click="jianhao">
            <svg aria-hidden="true" class="icon icon-sm">
              <use data-v-634930a2="" xlink:href="#icon-jiahaocu"></use>
            </svg>
          </li>
          <li style="border-radius: 0">
            <x-input   text-align="center" style="margin: 0;padding: 0" @on-change="changeHot" :show-clear="false"  mask="9999"
                     @on-blur="changeHot" v-model.trim="changeValue"></x-input>
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
      <BottomVue slot="bottom" :productFrom="productFrom"></BottomVue>
      <group title="" style="width: 100%" slot="total">
        <div class="total_div">合计：<span>￥{{countPrice | price}}</span></div>
      </group>
    </ProductContent>
  </div>
</template>

<script>
  import {XNumber, Flexbox, FlexboxItem, XInput, Group} from 'vux'
  import ProductContent from "@/components/product/product_template.vue"
  import BottomVue from "@/components/product/product_bottom.vue"

  export default {
    props: ["productFrom"],
    data() {
      return {
      countPrice: 0, changeValue: this.productFrom.formRoundValue,
      }
    },
    created() {
    },
    mounted() {
      this.count(this.productFrom)
    },
    methods: {
      count(item) {
        this.countPrice = item.courseTimeSum * item.signDiscountPrice;
        if (item.originalBookPrice>0) {
          this.countPrice += item.originalBookPrice*1;
        }
        this.productFrom.countPrice = this.countPrice;
      },
      changeHot() {
        this.productFrom.courseTimeSum = this.changeValue;
        this.productFrom.formRoundValue= this.changeValue;
        this.count(this.productFrom);
      },
      jianhao() {
        this.changeValue++;
        this.changeHot();
      },
      jiahao() {
        if(this.productFrom.formRoundValue <= this.productFrom.setCourseTimeSum){
          this.$vux.alert.show({
            title: "最低起购课时为:"+ this.productFrom.setCourseTimeSum
          });
          return
        }
        if (this.changeValue <= 0) {
          this.changeValue == 0;
        } else {
          this.changeValue--;
        }
        this.changeHot();
      },
    },
    components: {
      Flexbox, FlexboxItem, Group, XNumber, XInput, ProductContent, BottomVue
    },
    watch: {},
  };
</script>
<style lang="scss">

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
   /*.one-to-one-div .vux-tap-active:active{*/
    /*background-color: #fa760b!important;*/
  /*}*/

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
