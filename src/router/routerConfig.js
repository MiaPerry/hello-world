export default {
  // mode: 'history',
  base: '/order/',
  routes: [
    //主页
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/index',
          component: resolve => require(['../views/home/index.vue'], resolve),
          meta: {keepAlive: true},
        },
      ]
    },
    //选课列表页面
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/product',
          component: resolve => require(['../views/product/product'], resolve),
          meta: {keepAlive: true},

        },
        {
          path: '/product/:id',
          component: resolve => require(['../views/product/product'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },

    //产品详情页面
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/details/:id',
          component: resolve => require(['../views/product/productDetails'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //订单详情页面 从购物车和选课进入
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/orderDetails',
          component: resolve => require(['../views/order/orderDetails'], resolve),
          meta: {keepAlive: false},
          beforeEnter: (to, from, next) => {
            if ((from.path + "").indexOf("product") > 0) {
              let flg = sessionStorage.getItem('flge');
              if (flg * 1 == 0) {
                next('/product')
              } else {
                sessionStorage.setItem('flge', 0);
                next()
              }
            } else if ((from.path + "").indexOf("payment") > 0) {
              let len = history.length;
              history.go(-(len - 1));
              next('/order')
            } else if ((from.path + "").indexOf("order") > 0) {
              let len = history.length;
              history.go(-(len - 1));
              next('/product')
            } else {
              next()
            }
          }
        },
      ]
    },
    //订单详情页面  从订单列表进入
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/orderInfo/:id',
          component: resolve => require(['../views/order/orderInfo'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //订单详情页面  从订单列表进入
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/order',
          component: resolve => require(['../views/order/order'], resolve),
          meta: {keepAlive: false},

        },
      ]
    },
    //购物车页面
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/cart',
          component: resolve => require(['../views/cart/cart'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //支付页面
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/payment/:id',
          component: resolve => require(['../views/payment/payment'], resolve),
          meta: {keepAlive: false},
          beforeEnter: (to, from, next) => {
            (from.path + "").indexOf("payment") > 0 ? next('/product') : next();
          }
        },

      ]
    },
    //支付完成页面
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/paySuccess',
          component: resolve => require(['../views/payment/paySuccess'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //定金
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/money',
          component: resolve => require(['../views/money/index'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //学员
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/student',
          component: resolve => require(['../views/student/index'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
    //错误
    {
      path: '/',
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: '/error/:id',
          component: resolve => require(['../views/error/error404'], resolve),
          meta: {keepAlive: false}
        },
      ]
    },
  ]
}
