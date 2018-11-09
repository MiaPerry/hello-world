var state = {
  orderFrom:[],
  homeMsg: []
};
const mutations = {
  setOrder(state, orderFrom) {
    state.orderFrom=orderFrom
  },
  storeHomeMsg(state, oMsg) {
    state.homeMsg = oMsg
  },
};
const getters = {
  getOrder() {
    return state.orderFrom;
  },
  getHomeMsg() {
    return state.homeMsg;
  },
};
const actions = {};

export default ({
  getters,
  state,
  mutations,
  actions
})
