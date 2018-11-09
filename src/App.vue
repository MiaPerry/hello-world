<template>
  <div style="width: 100%;height: 100%">
    <transition name="fade" mode="out-in" v-if="$route.meta.keepAlive">
      <!-- 这里是需要keepalive的 -->
      <!--<keep-alive key="1">-->
      <router-view ></router-view>
      <!--</keep-alive>-->
    </transition>
    <!-- 这里不会被keepalive -->
    <router-view v-if="!$route.meta.keepAlive" key="2"></router-view>
  </div>
</template>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<style lang="less">
  @import '~vux/src/styles/close.less';
</style>
