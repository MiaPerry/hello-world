<template>
  <ProductContent :productFrom="productFrom" ref="productcontentdiv">
    <group title="产品组合" style="width: 100%" slot="content" v-if="productFrom.groupVOList.length>0">
      <checker v-model.trim="productFrom.formCategory" default-item-class="demo1-item" selected-item-class="demo1-item-selected" @on-change="selectCategory">
        <checker-item :value="item" v-for="(item, index) in productFrom.groupVOList" class="category_content phone_product_content" :key="index">
          {{item.value}}
        </checker-item>
      </checker>
    </group>

    <div style="width: 100%;overflow: hidden" slot="bottom">
      <flexbox v-if="bookFlag==true">
        <checklist title="教材费" style="width:100%;" disabled required :options="productFrom.bookPrice" v-model="productFrom.formBookPrice"></checklist>
      </flexbox>

      <flexbox v-if="productFrom.presentVOList&&productFrom.presentVOList.length>0">
        <checklist title="赠品" style="width:100%;" disabled required :options="productFrom.presentVOList" v-model="productFrom.fromGiftList"></checklist>
      </flexbox>
    </div>

    <group title="" style="width: 100%" slot="total">
      <div class="total_div">合计：
        <span>￥{{countPrice | price}}</span>
      </div>
    </group>
  </ProductContent>
</template>
<script>
import {
    Flexbox,
    FlexboxItem,
    Group,
    Checker,
    CheckerItem,
    Checklist
} from "vux";
import ProductContent from "@/components/product/product_template.vue";
import BottomVue from "@/components/product/product_bottom.vue";
export default {
    props: ["productFrom"],
    data() {
        return {
            bookFlag: false,
            countPrice: this.productFrom.signDiscountPrice
        };
    },
    mounted() {},
    methods: {
        selectCategory(value) {
          this.countPrice=0;
          this.productFrom.formBookPrice=[];
          this.productFrom.classDisplay=false;
           this.$refs['productcontentdiv'].classDisplayClick();
            this.bookFlag = false;
            if (this.productFrom.formCategory.bookDiscountPrice) {
                this.productFrom.bookPrice = [
                    {
                        key: this.productFrom.formCategory.bookDiscountPrice,
                        value: "教材费",
                        inlineDesc:
                            this.productFrom.formCategory.bookDiscountPrice +
                            "元"
                    }
                ];
                this.productFrom.formBookPrice = [this.productFrom.bookPrice[0].key]; //存放教材费
                this.bookFlag = true;
            }
           if(this.bookFlag==false){
             this.countPrice=0;
           }
            this.countPrice = this.productFrom.signDiscountPrice;
            if(this.productFrom.formBookPrice){
              for (var i = 0; i < this.productFrom.formBookPrice.length; i++) {
                this.countPrice += this.productFrom.formBookPrice[i] * 1;
              }
            }

            this.productFrom.countPrice = this.countPrice;
        }
    },
    components: {
        Checker,
        CheckerItem,
        Flexbox,
        FlexboxItem,
        Group,
        ProductContent,
        BottomVue,
        Checklist
    },
    watch: {}
};
</script>
<style lang="scss" scoped>
.category_content {
    width: 48%;
    float: left;
    text-align: center;
    margin: 1%;
    border-radius: 3px;
}
.demo1-item-selected{
  border: 1px solid rgb(48, 166, 255);
}
.phone_product_content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>


