<template>
  <!--基本-->
  <ProductContent :productFrom="productFrom">
    <checklist title="住宿费" style="width:100%;" slot="content" v-if="productFrom.serveVOList"
               required :options="productFrom.serveVOList" @on-change="count(productFrom)"
               v-model.trim="productFrom.formHotel"></checklist>
    <BottomVue slot="bottom" :productFrom="productFrom"></BottomVue>
    <group title="" style="width: 100%" slot="total">
      <div class="total_div">合计：
        <span >￥{{countPrice | price}}</span>
      </div>
    </group>
  </ProductContent>
</template>

<script>
import { XNumber, Flexbox, FlexboxItem,  XInput,Checker, Checklist, Group } from "vux";
import ProductContent from "@/components/product/product_template.vue";
import BottomVue from "@/components/product/product_bottom.vue";

export default {
    props: ["productFrom"],
    data() {
        return {
            countPrice: 0
        };
    },
    created() {},
    mounted() {
        this.count(this.productFrom);
    },
    methods: {
        count(productFrom) {
            this.countPrice = productFrom.signDiscountPrice;
            if (productFrom.formBookPrice) {
                for (var i = 0; i < productFrom.formBookPrice.length; i++) {
                    this.countPrice += productFrom.formBookPrice[i];
                }
            }else if (productFrom.originalBookPrice>0) {
                    this.countPrice += productFrom.originalBookPrice;
            }
            if (productFrom.serveVOList) {
                if (productFrom.serveVOList) {
                    for (var i = 0; i < productFrom.serveVOList.length; i++) {
                        for (var j = 0; j < productFrom.formHotel.length; j++) {
                            if (
                                this.productFrom.serveVOList[i].key ==
                                productFrom.formHotel[j]
                            ) {
                                this.countPrice += this.productFrom.serveVOList[
                                    i
                                ].inlineDesc;
                            }
                        }
                    }
                }
            }
            this.productFrom.countPrice = this.countPrice;
        }
    },
    components: {
        Flexbox,
        FlexboxItem,
        Checker, XInput,
        Checklist,
        Group,
        XNumber,
        ProductContent,
        BottomVue
    },
    watch: {
      "productFrom.isFree":function(){
        alert(productFrom.isFree);
      }
    }
};
</script>
<style lang="scss" scoped type="text/scss">
</style>
