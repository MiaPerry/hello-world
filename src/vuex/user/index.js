var state = {
  tocken: null,
  time:null,
  status: ''
};
const mutations = {
  setTocken(state, tocken) {
    state.tocken=tocken;
    localStorage.token = tocken;
  },
  setTockenTime(state, time){
    state.time=time;
    localStorage.outtime = time;
  },
  //记录新增/修改状态（0新增，1修改）
  statusRecode(state, payload){
    state.status=payload.status;
  },
}
const getters = {
  getTocken() {
   return state.tocken;
  },
  getTockenTime() {
    return state.time;
  },
};
const actions = {}

export default ({
  getters,
  state,
  mutations,
  actions
})
