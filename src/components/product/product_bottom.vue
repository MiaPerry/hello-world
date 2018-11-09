<template>
  <div style="width: 100%;overflow: hidden">
    <flexbox v-if="productFrom.bookPrice&&productFrom.bookPrice.length>0">
      <checklist title="" style="width:100%;line-height:0.4rem;" disabled label-position="left" required
                 :options="productFrom.bookPrice"
                 v-model.trim="productFrom.formBookPrice"></checklist>
    </flexbox>
    <flexbox v-if="productFrom.presentVOList&&productFrom.presentVOList.length>0">
      <checklist title="赠品" style="width:100%;" disabled label-position="left" required
                 :options="productFrom.presentVOList" v-model.trim="productFrom.fromGiftList"></checklist>
    </flexbox>
  </div>
</template>

<script>
import { Checker, Checklist, Flexbox, FlexboxItem } from "vux";
export default {
    props: ["productFrom"],
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    components: {
        Checker,
        Checklist,
        Flexbox,
        FlexboxItem
    },
    watch: {}
};
</script>
<style>
body .weui-cells__title{
  font-size: 0.34rem;
  color: #555555;
  font-weight: bold;
  margin: 0;
  line-height: 0.75rem;
}
body .weui-cells{
  font-size: 0.3rem;
  color: #555555;
  padding: 0;

  line-height: 0.5rem;
}
body .weui-cells:before{
  border: none;
}
body .total_div{
  height: 1rem;
  line-height: 1rem;
  font-size: 0.34rem;
  padding-right: 0.15rem;
  box-sizing: border-box;
}
body .vux-no-group-title{
  margin: 0;
}
.rainow_div .weui-cells {
    line-height: 30px !important;
}

.weui-cells__title {
    padding-left: 0.1rem;
    box-sizing:border-box;
}

.demo1-item {
    /* border: 1px solid #ececec; */
    padding: 5px 15px;
}

.demo1-item-selected {
    /*background: #fa760b;*/
    /*color:white;*/
}
</style>
<style lang="scss" scoped>
.title {
    color: #88888888;
    // border-bottom: 1px solid #eee;
    width: 100%;
}

.category_content {
    width: 48%;
    float: left;
    text-align: center;
    margin: 1%;
    padding: 3px;
}
</style>
