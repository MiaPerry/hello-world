export default {
  tocken: {
    // AccessToken:"http://localhost:14081/token/access"
  },
  home: {
    info: {url: "/product/sort/personInfo", method: "post", msg: ""}
  },
  cart: {
    goodsList: {url: "/product/cart/carts", method: "post", msg: "购物车列表"},
    delete: {url: "/product/cart/delete", method: "post", msg: "删除商品"},
    getNum: {url: "/product/cart/getCartsCount", method: "post", msg: "获取购物车物品数量"},
    save: {url: "/product/cart/save", method: "post", msg: "加入购物车"},
    plusOreduce: {url: "/product/cart/updateCartNum/", method: "post", msg: "数量加减"},
  },
  product: {
    list: {url: "/product/product/list", method: "post", msg: "查询产品"},
    choose: {url: "/product/product/choose", method: "post", msg: "选择按钮"},
    get: {url: "/product/product/get", method: "post", msg: "查看详情"},
    listSelection: {url: "/product/product/listSelection", method: "post", msg: "筛选框"},
    down: {url: "/class/api/download/", method: "post", msg: ""},
    discountList: {url: "/product/product/listLable", method: "post", msg: "查询优惠"},
  },
  order: {
    confirmOrder: {url: "/order/confirm", method: "post", msg: "根据产品Id生成订单"},
    getList: {url: "/order/orderList/listFg", method: "post", msg: "请求订单列表"},
    cancel: {url: "/order/orderList/cancel/", method: "post", msg: "取消订单"},
    delete: {url: "/order/orderList/delete/", method: "post", msg: "删除订单"},
    confirm: {url: "/product/order/confirm", method: "post", msg: "根据产品Id生成订单"},
    submit: {url: "/order/order/submit", method: "post", msg: "提交订单"},
    signal: {url: "/order/order/signal", method: "get", msg: "根据订单Id查询基本信息"},
    // getOrderId: { url: "/order/orderList/get/", method: "get", msg: "根据订单Id查询基本信息1" },
    getOrderId: {url: "/order/orderList/getOrder/", method: "get", msg: "根据订单Id查询基本信息2"},
    editBusiness: {url: "/order/orderList/editBusiness", method: "post", msg: "修改业绩归属比例"},
    getid: { url: "/order/orderList/getOrder/", method: "get", msg: "订单详情"},
    customerEarnest: {url: "/order/order/customerEarnest", method: "psot", msg: "根据人员查询定金"},
  },
  student: {
    regist: {url: "/order/student/regist", method: "post", msg: "注册新学员"},
    search: {url: "/order/student/search", method: "post", msg: "查询老学员"},
    listBg: {url: "/order/orderList/listBg", method: "post", msg: "订单列表"},
    personalInfo: {url: "/order/student/studentInfo/", method: "get", msg: "回显学员信息"},
    list: {url: "/product/customer/show", method: "post", msg: "学员字段列表"}
  },
  user: {
    search: {url: "/product/user/search", method: "post", msg: "搜索人员"}
  },
  pay: {
    payInfo: {url: "/order/pay/info", method: "get", msg: "获取支付信息"},
    payReduce: {url: "/order/pay/reduce", method: "post", msg: "申请其他优惠"},
    paySubmit: { url: "/order/pay/submit", method: "post", msg: "提交支付" },
    offLinelist: { url: "/order/pay/auditList", method: "post", msg: "离线支付审核列表" },
    auditDetail: { url: "/order/pay/auditDetail/", method: "get", msg: "审核详情" },
    auditSubmit: { url: "/order/pay/audit/", method: "get", msg: "审核提交" },
    imgas: { url: "/order/pay/api/download/", method: "get", msg: "" },
    getRecordByPayId: {url: "/order/pay/getRecordByPayId", method: "get", msg: ""},
  },
  dict: {
    dictSearch: {url: "/product/dict/searchDict", method: "post", msg: "查询字典"},
  },
  upload: {url: "/order/upload/uploadPay", method: "post", msg: "上传图片"},
  delImg: {url: "/order/upload/deleteImg/", method: "post", msg: "删除图片"},
  iSee: {url: "/product/class/api/download/", method: "get", msg: "查看图片"},
  bookImgurl:{url: "/product/book/api/download/", method: "get", msg: "查看图片"},
  send: {url: "/order/student/sendsms/", method: "get", msg: ""},

}
