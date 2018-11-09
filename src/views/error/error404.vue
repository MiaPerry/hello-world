<template>
  <div>
    <msg :title="title"
         :description="description"
         :icon="icon" ></msg>
    <flexbox style="padding: 0 20px;" v-if="falg==true">
      <flexbox-item>
        <x-button type="primary" plain @click.native="$router.push('/')">返回首页</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" plain @click.native="$router.push('/product')">返回列表</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>

  import {
    Msg, Divider, XButton,
    Flexbox, FlexboxItem,
  } from 'vux'

  export default {
    data() {
      return {
        title: "404",
        icon: 'warn',
        description:"",
        buttons: [{
          type: 'primary',
          text: '返回首页',
          link: '/'
        }, {
          type: 'warn',
          text: '返回产品列表',
          link: '/product'
        }],
        falg:true,
      };
    },
    mounted() {
      this.title = this.$route.params.id;
      switch (this.title*1) {
        case 10000:
          this.title="该用户未找到!";
          this.description="该用户未找到,请联系系统管理员";
          this.falg=false;
          break;
        case 401:
          this.title="401 暂无权限!";
          this.description="暂无权限,请联系系统管理员";
          break;
        case 404:
          this.title="404 页面未找到";
          this.description="服务器连接失败,请联系系统管理员";
          break;
        default:
          break;
      }
    },
    methods: {},
    components: {Msg, Divider, XButton,Flexbox, FlexboxItem,},
    watch: {}
  };
</script>
