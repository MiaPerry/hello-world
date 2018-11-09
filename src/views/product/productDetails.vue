<template>
  <div class="details_div">
    <div class="title_img" v-if="details.productCoverImg">
      <img :src="imgesSrc(details,details.productCoverImg)" :onerror="errorImg" style="object-fit: fill;"/>
    </div>
    <ul class="content_ul">
      <li><span v-if="details.costType==true">[协议]</span>{{details.name}}</li>
      <li><span class="price_name">￥{{details.signDiscountPrice || 0 | price}}</span>
        <span class="price_name" style="color:#cccccc"><s>￥{{details.discountPrice || 0 | price}}</s></span></li>
      <li v-if="details.signVO">
        <span class="title_span">单品促销：</span>
        <span v-if="details.signVO&&details.signVO.costType==0">
              <span>
                <span>立减￥{{details.signVO.discountPrice}}</span>
              </span>
              <span
                v-if="details.signVO.choosePriceSetting==1&&details.signVO.setDiscountPrice&&details.signVO.setDiscountPrice!=0">
                <span>立减￥{{details.signVO.setDiscountPrice}}</span>
              </span>
        </span>
        <span v-if="details.signVO&&details.signVO.costType==1">
          <span
            v-if="details.signVO.choosePriceSetting==0&&details.signVO.discountPrice&&details.signVO.discountPrice!=0">
            <span>折扣￥{{details.signVO.discountPrice}}折</span>
          </span>
          <span
            v-if="details.signVO&&details.signVO.choosePriceSetting==1&&details.signVO.setDiscountPrice&&details.signVO.setDiscountPrice!=0">
            <span>折扣￥{{details.signVO.setDiscountPrice}}折</span>
          </span>
        </span>
        <span v-if="details.signVO&&details.signVO.costType==2">
          <span
            v-if="details.signVO.choosePriceSetting==0&&details.signVO.discountPrice&&details.signVO.discountPrice!=0">
            <span>促销价{{details.signVO.discountPrice}}</span>
          </span>
          <span
            v-if="details.signVO.choosePriceSetting==1&&details.signVO.setDiscountPrice&&details.signVO.setDiscountPrice!=0">
            <span>促销价{{details.signVO.setDiscountPrice}}</span>
          </span>
        </span>
      </li>
      <li v-if="details.reductionVO">
        <span class="title_span">满&nbsp;减&nbsp;折：</span> <span>{{details.reductionVO.label}}</span>
      </li>

      <li v-if="details.sellGroupVO">
        <span class="title_span">组合促销：</span> <span>{{details.sellGroupVO.label}}</span>
      </li>

      <li v-if="details.presentVOList&&details.presentVOList.length>0">
        <span style="float: left" class="title_span">赠&nbsp;&nbsp;&nbsp;&nbsp;品：&nbsp;</span>
        <ul style="float: left">
          <li v-for="(item,index) in details.presentVOList">{{item.value}}</li>
        </ul>
      </li>
    </ul>

    <div v-if="details.productOtherImgList.length>0" class="img_dist">
      <span>产品介绍：</span>
      <img :src="imgesSrc(details,item)" :onerror="errorImg" v-for="(item,index) in details.productOtherImgList"
           :key="index">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgesSrc(item, imgItem) {
          if (!imgItem || !imgItem.id) {
            return
          }
          if (item.productType == 0 || item.productType == 1 || item.productType == 2) {
            return (
              process.env.UPLOAD +
              this.api.iSee.url +
              imgItem.id +
              "?version=" +
              process.env.WD_VERSSION +
              "&token=" +
              imgItem.token
            );
          } else {
            return (
              process.env.UPLOAD +
              this.api.bookImgurl.url +
              imgItem.id +
              "?version=" +
              process.env.WD_VERSSION +
              "&token=" +
              imgItem.token
            );
          }
        },
        errorImg: 'this.src="' + require("@/styles/img/wd.png") + '"',
        details: {
          id: "",
//          productCoverImg:{id:""},
          productOtherImgList: [],
        },
      };
    },
    created() {
    },
    mounted() {
      XuntongJSBridge.call("setWebViewTitle", {title: "产品详情"});
      this.selectDetaile();
    },
    methods: {
      selectDetaile() {
        this.axios.post(this.api.product.get.url, {
          id: this.$route.params.id
        }).then(res => {
          this.details = res.data.data;
          this.details.costType = false;
          if (this.details.serviceCostJson && this.details.serviceCostJson != "" && this.details.serviceCostJson != null) {
            this.details.serviceCostJson = JSON.parse(this.details.serviceCostJson);
            for (var j = 0; j < this.details.serviceCostJson.length; j++) {
              if (this.details.serviceCostJson[j].type == '1') {
                this.details.costType = true;
              }
            }
          }
        })
      },
    },
    watch: {}
  };
</script>


<style lang="scss" scoped type="text/scss">
  .details_div {
    background: url("../../styles/img/wd.png");
    background-size: 100%;
    overflow-y: auto;
    height: 100%;
    .title_span {
      margin-left: 0.15rem;
      font-weight: bold;
      font-size: 0.3rem;
      text-align: center;
    }
    .price_name {
      color: rgb(245, 96, 22);
      margin-left: 0.15rem;
      line-height: 0.5rem;
      font-weight: bold;
      font-size: 0.28rem;
      float: left;
    }
    .img_dist {
      background-color: #ffffff;
      img {
        object-fit: cover;
        width: 100%;
      }
    }
    .title_img {
      margin-bottom: 10px;
      width: 100%;
      height: 150px;
      overflow: hidden;
      background-color: #ffffff;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .content_ul {
      background-color: #ffffff;
      margin-bottom: 10px;
      li {
        font-weight: normal;
        padding-bottom: 10px;
        width: 100%;
        overflow: hidden;
      }
    }
  }


</style>
