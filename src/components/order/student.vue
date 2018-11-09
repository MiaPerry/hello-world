<template>
  <div class="order_deatils_div">
    <!-- 加载中 -->
    <div v-transfer-dom>
      <loading :show="show1" :text="words"></loading>
    </div>
    <!--添加学员-->
    <div hide-on-blur style="width:100%;height:100%;overflow:hidden" v-if="form.name">
      <!-- 切换 -->
      <tab style="height:7%;z-index:99">
        <tab-item :selected="studentIndex == 0" @on-item-click="onItemClick">{{tab}}</tab-item>
        <tab-item :selected="studentIndex == 1" @on-item-click="onItemClick">老学员</tab-item>
      </tab>
      <!-- 添加新学员 -->
      <!-- <div v-else style="width: 100%;height:93%;overflow: hidden;position: absolute;top:7%;left: 0;"> -->
      <div v-if="studentIndex==0"
           style="width: 100%;height:93%;overflow: hidden;position: absolute;top:7%;left: 0;overflow:scroll">
        <div class="people_ul">
          <div v-show="form.name&&form.name.isEcho &&form.name.isEcho==true" :class="{isRequire: form.name&&form.name.isRequire == true}">
            <x-input :max="8" title="姓 名" placeholder="姓名" :is-type="isName" :required="form.name&&form.name.isRequire"
                     v-model.trim="form.name.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.sex&&form.sex.isEcho &&form.sex.isEcho==true" style="width: 100%;overflow: hidden"
               class="color_text color_text1" :class="{isRequire: form.sex&&form.sex.isRequire == true}">
            <div style="width: 60px;float: left;text-align:center">性 别</div>
            <checklist style="width:100%;" label-position="right" :max="1" :required="form.sex&&form.sex.isRequire"
                       :options="sexList" v-model.trim="sex"></checklist>
          </div>
          <div v-show="form.idCard&&form.idCard.isEcho &&form.idCard.isEcho==true"
               :class="{isRequire: form.idCard&&form.idCard.isRequire == true}">
            <x-input :required="form.idCard&&form.idCard.isRequire" title="身份证" placeholder="身份证" :is-type="isIDCard"
                     v-model.trim="form.idCard.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.mobile&&form.mobile.isEcho&&form.mobile.isEcho==true"
               :class="{isRequire: form.mobile&&form.mobile.isRequire == true}">
            <x-input :required="form.mobile&&form.mobile.isRequire" :disabled="NumDisabled" title="手机号" placeholder="手机号"
                     :is-type="isPhone" v-model.trim="form.mobile.value" label-width="60px"
                     style="padding: 0;"></x-input>
          </div>
          <!-- v-if="form.mobile.isEcho&&   form.mobile.value.length === 11 && studentForm.userId =='' " -->
          <!-- <div>{{studentForm.userId}}</div> -->
          <div v-if="form.mobile.value.length == 11 && NumDisabled == false ">
            <x-input title="验证码" class="weui-vcode" v-model.trim="form.checkCode.value" style="padding: 0;"
                     placeholder="验证码">
              <x-button slot="right" class="codeBtn" :disabled="disabled" mini @click.native="sendCode">{{codeBtn}}
              </x-button>
            </x-input>
          </div>
          <div v-show="form.email&& form.email.isEcho&&   form.email.isEcho==true"
               :class="{isRequire: form.email&&form.email.isRequire == true}">
            <x-input :required="form.email&&form.email.isRequire" title="邮箱" placeholder="邮箱" :is-type="isMail"
                     v-model.trim="form.email.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.qq&& form.qq.isEcho&&  form.qq.isEcho==true" :class="{isRequire: form.qq&&form.qq.isRequire == true}">
            <x-input :required="form.qq&&form.qq.isRequire" title="QQ:" placeholder="QQ" :is-type="isQQ"
                     v-model.trim="form.qq.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.year&&form.year.isEcho&&   form.year.isEcho==true" :class="{isRequire: form.year&&form.year.isRequire == true}">
            <selector :required="form.year&&form.year.isRequire" class="selector" placeholder="考研年份" v-model.trim="form.year.value"
                      title="考研年份" name="district" :options="yearList"></selector>
          </div>
          <div v-show="form.grade&&form.grade.isEcho==true"
               :class="{isRequire: form.grade&&form.grade.isRequire == true}">
            <selector :required="form.grade&&form.grade.isRequire" class="selector" placeholder="年级" v-model.trim="form.grade.value"
                      title="年级" name="district" :options="gradeList"></selector>
          </div>
          <div v-show="form.nowSchool&&form.nowSchool.isEcho&&   form.nowSchool.isEcho==true"
               :class="{isRequire: form.nowSchool&&form.nowSchool.isRequire == true}">
            <x-input :max="20" :required="form.nowSchool&&form.nowSchool.isRequire" title="就读院校" placeholder="就读院校"
                     v-model.trim="form.nowSchool.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.nowMajor&&form.nowMajor.isEcho&&form.nowMajor.isEcho==true"
               :class="{isRequire: form.nowMajor&&form.nowMajor.isRequire == true}">
            <x-input :max="20" :required="form.nowMajor&&form.nowMajor.isRequire" title="就读专业" placeholder="就读专业"
                     v-model.trim="form.nowMajor.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.aimSchool&&form.aimSchool.isEcho&&   form.aimSchool.isEcho==true"
               :class="{isRequire: form.aimSchool&&form.aimSchool.isRequire == true}">
            <x-input :max="20" :required="form.aimSchool&&form.aimSchool.isRequire" title="目标院校" placeholder="目标院校"
                     v-model.trim="form.aimSchool.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.aimMajor&&form.aimMajor.isEcho&&   form.aimMajor.isEcho==true"
               :class="{isRequire: form.aimMajor&&form.aimMajor.isRequire == true}">
            <x-input :max="20" :required=" form.aimMajor&&form.aimMajor.isRequire" title="目标专业" placeholder="目标专业"
                     v-model.trim="form.aimMajor.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
          <div v-show="form.source&&form.source.isEcho&&   form.source.isEcho==true"
               :class="{isRequire: form.source&&form.source.isRequire == true}">
            <selector :required="form.source&&form.source.isRequire" class="selector" placeholder="来源"
                      v-model.trim="form.source.value" title="来源" name="district" :options="sourceList"></selector>
          </div>
          <div v-show="form.remark&&form.remark.isEcho&&   form.remark.isEcho==true"
               :class="{isRequire: form.remark&&form.remark.isRequire == true}">
            <x-input :max="150" :required="form.remark&&form.remark.isRequire" title="备注" placeholder="备注"
                     v-model.trim="form.remark.value" label-width="60px" style="padding: 0;"></x-input>
          </div>
        </div>

      </div>
      <div v-if="studentIndex==1" style="width: 100%;height:1.24rem;overflow:hidden;position: relative;top:0;left: 0;">
        <input class="searchStudent" type="text" v-model="searchStudentName" @on-submit="searchStudent(0)"
               @keyup.enter="searchStudent(0)" placeholder="学号／姓名／身份证号／手机号">
        <!-- <input @blur="isTop = false" @focus="isTop = true" > -->
      </div>
      <!-- 查询老学员 -->
      <div v-if="studentIndex==1" style="width: 100%;height:83%;overflow: hidden;position: relative;top:0 ;left: 0;">

        <!-- 滑块 -->
        <scroller lock-x style="position:absolute;top:0;width:100%;height:100%;z-index: 1" ref="scrollerBottom"
                  @on-scroll-bottom="onScrollBottom">
          <ul class="stu_ul" style="width: 100%;overflow:hidden;background-color: #f1f1f1">
            <li v-for="(item, index) in searchStudentNameList" :class="{active:studengIndex==index}"
                @click="changeStudent(item,index)" :key="index" class="stu_ul_li"
                style="overflow: hidden;position:relative">
              <div class="basicInfo">
                <h3>{{item.name}}</h3>
                <div :class="{female: item.sex == 1 }"></div>
              </div>
              <div class="telInfo" v-if="item.mobile">
                <img src="../../styles/img/tel.png" alt="电话">
                <span>{{item.mobile}}</span>
              </div>
              <div class="numInfo">
                <span class="number" v-if="item.code!=''&&item.code!=null">学号：{{item.code}}</span>
                <span class="idCard" :class="{onlyOne: item.code == undefined}" v-if="item.idCard">身份证后四位：{{item.idCard}}</span>
              </div>
              <svg @click="onItemClick(0, item.userId)"
                   style="position:absolute;right:0.2rem;top:0.3rem;width:0.3rem;height:0.3rem;" data-v-634930a2=""
                   aria-hidden="true" class="icon icon-sm">
                <use data-v-634930a2="" xlink:href="#icon-ICONbiaozhun_fuzhi-"></use>
              </svg>
            </li>
          </ul>
        </scroller>
      </div>
    </div>
    <tabbar :class="{dn:dn==true}">
      <tabbar-item>
        <span slot="label" @click="saveStatue" v-if="submitvail==true">保存</span>
        <span slot="label" v-else>保存</span>
      </tabbar-item>
      <tabbar-item @click.native="cleanStatus">
        <span slot="label">返回</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {
    Group,
    Alert,
    Scroller,
    Search,
    GroupTitle,
    Checklist,
    Checker,
    CheckerItem,
    TransferDomDirective as TransferDom,
    XDialog,
    Tabbar,
    TabbarItem,
    XInput,
    Tab,
    TabItem,
    Confirm,
    XTextarea,
    Selector,
    Loading,
    LoadMore,
    Divider
  } from "vux";

  export default {
    props: ["studentFromTransmit"],
    data() {
      return {
        vuexData: "",
        submitvail: true,
        studengIndex: -1,
        bottomLine: false,
        codeBtn: "获取验证码",
        disabled: false,
        NumDisabled: false,
        words: "加载中",
        tab: "新学员",
        isDataMore: false,
        totalRows: "",
        show1: false,
        yearList: [],
        gradeList: [],
        sourceList: [],
        scrollTop: "0",
        onFetching: false,
        page: "1",
        sexList: [
          {key: "0", inlineDesc: "男"},
          {key: "1", inlineDesc: "女"}
        ], //付款方式
        paymentMethodList: [
          {key: "0", inlineDesc: "全款"},
          {key: "1", inlineDesc: "分期"}
        ], //付款方式
        paymentMethod: ["0"], //付款方式
        dn: false,
        fullHeight: document.documentElement.clientHeight,
        searchAttribName: "", //查询业绩归属员工名字
        attribVali: false,
        studentVali: true,
        chageStudentShow: true, //选择当前学员 弹出对话框
        studentIndex: 0, //0新学员  1老学员 标识
        searchStudentName: "", //按照工号查询老学员名字
        studentFromList: [], //选中老学员的集合
        studentFrom: {},
        searchStudentNameList: [], //按照工号查询老学员名字 查询出来的集合
        sex: [],
        form: {},
        textare: "", //备注
        orderFrom: {}, //页面基础数据
        studentList: [], //页面头部学员集合
        searchPeopleList: [], //业绩归属搜索人员集合
        peopleList: [], //业绩归属 已加入人员列表
        isName: function (value) {
          return {
            valid: !value == "",
            msg: "姓名不能为空"
          };
        },
        isPhone: function (value) {
          var str = /^[1][3,4,5,7,8][0-9]{9}$/;
          return {
            valid: str.test(value),
            msg: "手机号格式不正确"
          };
        },
        isIDCard: function (value) {
          var str = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          return {
            valid: str.test(value),
            msg: "身份证格式不正确"
          };
        },
        //邮箱正则
        isMail: function (value) {
          var str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          return {
            valid: str.test(value),
            msg: "邮箱格式不正确"
          };
        },
        //QQ正则
        isQQ: function (value) {
          var str = /^\d{5,12}$/;
          return {
            valid: str.test(value),
            msg: "QQ格式不正确"
          };
        },
        verificationList: [],
        fullHeight: document.documentElement.clientHeight,
      };
    },
    mounted() {
      this.vuexData = this.$store.getters.getHomeMsg;
      this.studentFrom = this.studentFromTransmit.studentFrom;
      let oClientWidth = document.documentElement.clientWidth;
      // alert(oClientWidth)
      XuntongJSBridge.call("setWebViewTitle", {title: "学员管理"});
      this.selectYearList(); //年份
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight;
        })();
      };
    },
    methods: {
      changeStudent(item, index) {
        this.studengIndex = index;
        this.studentFromTransmit.changeStudent = item;
      },
      selectList() {
        this.axios.post(this.api.student.list.url).then(res => {
          this.form = res.data.data;
          this.form.checkCode = {
            isRequire: true,
            isEcho: true,
            value: ""
          };
        });
      },
      sendCode() {
        let self = this;
        this.axios
          .get(this.api.send.url + this.form.mobile.value)
          .then(res => {
            if (res.data.data == true) {
              clearInterval(timer); //这句话至关重要
              let timer = null;
              var time = 59;
              timer = setInterval(function () {
                if (time <= 0) {
                  self.codeBtn = "重新获取";
                  self.disabled = false;
                  clearInterval(timer);
                } else {
                  self.disabled = true;
                  self.codeBtn = time + "s";
                  time--;
                }
              }, 1000);
            } else {
              this.$vux.toast.show({
                text: "验证码获取失败",
                type: "warn"
              });
            }
          });
      },
      //获取年级列表
      selectGradeList() {
        this.gradeList = [];
        this.axios
          .post(this.api.dict.dictSearch.url, {
            blurSearch: {},
            order: {},
            page: 1,
            pageNum: 0,
            search: {dictCode: "GRADE"}
          })
          .then(res => {
            this.gradeList = [];
            var items = res.data.data;
            for (var i = 0; i < items.length; i++) {
              let obj = {};
              obj.key = items[i].id;
              obj.value = items[i].dictValue;
              this.gradeList.push(obj);
            }
          });
      },
      //查询代理推荐
      selectSourceList() {
        this.sourceList = [];
        this.axios
          .post(this.api.dict.dictSearch.url, {
            blurSearch: {},
            order: {},
            page: 1,
            pageNum: 0,
            search: {dictCode: "STUDENTSSOURCE"}
          })
          .then(res => {
            this.sourceList = [];
            var items = res.data.data;
            for (var i = 0; i < items.length; i++) {
              this.sourceList.push({
                key: items[i].id,
                value: items[i].dictValue
              });
            }
          });
      },
      //生成年份
      selectYearList() {
        for (
          var i = new Date().getFullYear() + 3;
          i > new Date().getFullYear()-1;
          i--
        ) {
          this.yearList.push(i);
        }
      },
      panduan(value, zhengze) {
        return zhengze.test(value);
      },
      panduan1(item, zhengze, msg, msg1) {
        //item,格式,消息,为空格式 ,消息1
        if (item.isEcho == true) {
          if (item.isRequire == true) {
            if (item.value == "" || item.value == null) {
              this.$vux.alert.show({
                title: msg1
              });
              this.verificationList.push(false);
              return;
            }
          }
          if (zhengze != null && item.value != "") {
            if (!this.panduan(item.value + "", zhengze)) {
              this.$vux.alert.show({
                title: msg
              });
              this.verificationList.push(false);
            }
          }
        }
      },
      cleanStatus() {
        this.studentFromTransmit.revert = false;
      },
      //添加学员到订单详情页面
      saveStatue() {
        if (this.studentIndex == 1) {
          this.studentFromTransmit.studentFrom = this.studentFromTransmit.changeStudent;
          this.studentList = this.studentFromList;
          this.studentFromList = [];
        } else {
          this.form.sex.value = this.sex.join(",");
          this.verificationList = [];
          this.panduan1(
            this.form.mobile,
            /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            "手机格式错误",
            "手机不能为空"
          );
          this.panduan1(
            this.form.email,
            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            "邮箱格式错误",
            "邮箱不能为空"
          );
          this.panduan1(
            this.form.qq,
            /^\d{5,12}$/,
            "qq格式错误",
            "qq不能为空"
          );
          this.panduan1(
            this.form.year,
            null,
            "请选择考研年份",
            "请选择考研年份"
          );
          this.panduan1(this.form.grade, null, "请选择年级", "请选择年级");
          this.panduan1(
            this.form.nowSchool,
            null,
            "请选择就读学校",
            "请选择就读学校"
          );
          this.panduan1(
            this.form.nowMajor,
            null,
            "请选择就读专业",
            "请选择就读专业"
          );
          this.panduan1(
            this.form.aimMajor,
            null,
            "请选择目标专业",
            "请选择目标专业"
          );
          this.panduan1(
            this.form.aimSchool,
            null,
            "请选择目标学校",
            "请选择目标学校"
          );
          this.panduan1(this.form.source, null, "请选择来源", "请选择来源");
          this.panduan1(this.form.remark, null, "请输入备注", "请输入备注");
          this.panduan1(
            this.form.idCard,
            /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            "身份证格式不正确",
            "身份证不能为空"
          );
          this.panduan1(this.form.sex, null, "请选择性别", "请选择性别");
          this.panduan1(this.form.name, null, "姓名格式错误", "姓名不能为空");
          if (this.verificationList.length > 0) {
            return;
          }
          if (this.form.mobile.value.length > 0 && this.form.checkCode.value == "") {
            this.$vux.alert.show({
              title: "请输入验证码"
            });
            return;
          }
          // this.studentFrom
          //是否是老学员
          this.$vux.loading.show({
            text: "加载中"
          });
          this.submitvail = false;
          this.axios
            .post(this.api.student.regist.url, {
              name: this.form.name.value,
              sex: this.form.sex.value,
              idCard: this.form.idCard.value,
              mobile: this.form.mobile.value,
              checkCode: this.form.checkCode.value,
              email: this.form.email.value,
              qq: this.form.qq.value,
              year: this.form.year.value,
              grade: this.form.grade.value,
              nowSchool: this.form.nowSchool.value,
              nowMajor: this.form.nowMajor.value,
              aimSchool: this.form.aimSchool.value,
              aimMajor: this.form.aimMajor.value,
              source: this.form.source.value,
              remark: this.form.remark.value,
              id: this.studentFrom.id,

              code: this.studentFrom.code,
              userId: this.studentFrom.userId,
              dr: this.studentFrom.dr,
              isExist: this.studentFrom.isExist,
              orgId: this.studentFrom.orgId,
              shopId: this.vuexData.shopId,
                        campusId: this.vuexData.campusId
            })
            .then(res => {
              this.submitvail = true;
              this.$vux.loading.hide();
              self.gradeList = [];
              if (this.studentFrom.userId) {
                this.$vux.toast.show({
                  text: "学员修改成功!",
                  type: "success"
                });
              } else {
                this.$vux.toast.show({
                  text: "学员添加成功!",
                  type: "success"
                });
              }
              //清空对象val值
              this.sex = [];
              this.studentFrom.userId = "";
              this.onItemClick(1);
              this.studentFromTransmit.studentFrom = res.data.data;
            }).catch(function (error) {
            this.submitvail = true;
            this.$vux.toast.show({
              text: res.data.msg + "!",
              type: "warn"
            });
          });
        }
      },

      //查询老学员
      searchStudent(status) {
        let self = this;
        self.show1 = true;
        this.axios
          .post(this.api.student.search.url, {
            blurSearch: {},
            order: {},
            page: this.page,
            pageNum: 10,
            search: {param: this.searchStudentName}
          })
          .then(res => {
            if (res.data.data.resultList.length == 0) {
              this.searchStudentNameList = [];
              self.show1 = true;
              self.words = "暂无数据";
              setTimeout(function () {
                self.show1 = false;
                setTimeout(function () {
                  self.words = "加载中";
                }, 500);
              }, 500);
            } else {
              self.show1 = false;
              if (status == 0) {
                this.totalRows = res.data.data.totalRows;
                this.searchStudentNameList =
                  res.data.data.resultList;
              } else if (status == 1) {
                this.searchStudentNameList = this.searchStudentNameList.concat(
                  res.data.data.resultList
                );
              }
            }
          });
      },
      //新学员  老学员切换
      onItemClick(index, userId) {
        let self = this;

        this.studentIndex = index;
        if (index == 1) {
          this.tab = "新学员";
          this.studentFromList = this.studentList;
          this.searchStudentNameList = this.studentList;
          this.page = 1;
          this.searchStudent(0);
          this.selectList();
        } else if (index == 0) {
          if (userId) {
            // self.show1 = true;
            self.tab = "修改学员";
            self.studentFrom.userId = userId;
            // self.NumDisabled = true;

            this.axios
              .get(this.api.student.personalInfo.url + userId)
              .then(res => {
                // self.show1 = false;
                let data = res.data.data;
                self.selectGradeList();
                self.selectSourceList();
                self.form.name.value = data.name;
                // self.form.sex.value = data.sex;
                self.sex = [];
                self.sex.push(data.sex);
                self.form.idCard.value = data.idCard;
                if (data.mobile == "") {
                  self.NumDisabled = false;
                } else {
                  self.NumDisabled = true;
                }
                self.form.mobile.value = data.mobile;
                self.form.checkCode.value = data.checkCode;
                self.form.email.value = data.email;
                self.form.qq.value = data.qq;
                self.form.year.value = data.year;
                self.form.grade.value = data.grade;
                self.form.nowSchool.value = data.nowSchool;
                self.form.nowMajor.value = data.nowMajor;
                self.form.aimSchool.value = data.aimSchool;
                self.form.aimMajor.value = data.aimMajor;
                self.form.source.value = data.source;
                self.form.remark.value = data.remark;
                self.studentFrom.userId = data.id;
                self.studentFrom.code = data.code;
                self.studentFrom.userId = data.userId;

                self.studentFrom.dr = data.dr;
                self.studentFrom.id = data.id;
                self.studentFrom.isExist = data.isExist;
                self.studentFrom.orgId = data.orgId;
              });
          } else {
            self.NumDisabled = false;
            // this.selectList();
            self.sex = [];
          }
        }
      },
      //加载更多
      onScrollBottom() {
        let self = this;

        if (self.onFetching) {
          // do nothing
        } else {
          if (self.page < Math.ceil(self.totalRows / 10)) {
            self.onFetching = true;
            setTimeout(() => {
              self.page++;
              self.searchStudent(1);
              self.$nextTick(() => {
                self.$refs.scrollerBottom.reset();
              });
              self.onFetching = false;
            }, 2000);
          } else {
            self.show1 = true;
            self.words = "暂无更多数据";
            setTimeout(function () {
              self.show1 = false;
              setTimeout(function () {
                self.words = "加载中";
              }, 500);
            }, 500);
          }
        }
      }
    },
    components: {
      Group,
      GroupTitle,
      Search,
      Checker,
      CheckerItem,
      XDialog,
      Tabbar,
      TabbarItem,
      XInput,
      Tab,
      TabItem,
      Confirm,
      Scroller,
      XTextarea,
      Checklist,
      Selector,
      Loading,
      LoadMore,
      Divider
    },
    watch: {
      fullHeight(val) {
        if (this.fullHeight <= 500) {
          this.dn = true;
        } else {
          this.dn = false;
        }
      }
    },
    directives: {
      TransferDom
    }
  };
</script>
<style type="text/scss">
  body .codeBtn {
    background: #3cbaff;
    margin-right: 0.15rem;
    color: white;
  }

  body .weui-btn:after {
    border: none;
  }

  body .weui-btn {
    border-radius: 4px;
  }

  body .vux-tab .vux-tab-item.vux-tab-selected {
    color: #3cbaff;
    border-bottom: 3px solid #3cbaff;
  }

  body .vux-tab-ink-bar {
    background-color: #3cbaff;
  }

  body
  .weui-cells_checkbox
  .weui-check:checked
  + .vux-checklist-icon-checked:before {
    color: #3cbaff;
  }

  body
  .weui-cells_checkbox
  .weui-check:checked
  + .vux-checklist-icon-checked:before {
    color: #3cbaff;
  }

  body .weui-cell__ft button.weui-btn {
    padding: 0;
    width: 1.5rem;
    height: 0.55rem;
  }

  /* body .weui-btn:after{
        background-color: #3cbaff;
    } */
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    transform: translateY(10px);
    opacity: 0;
  }

  .color_text .vux-label-desc {
    color: black !important;
  }

  .color_text .weui-cell {
    width: 45%;
    float: left;
  }

  .color_text .weui-cells:before,
  .color_text .weui-cell:before,
  .color_text .weui-cells:after {
    border: 0;
    border-top: 0;
  }

  .color_text1 .weui-cell {
    padding: 0 15px;
  }

  .weui-cells {
    text-align: left;
  }

  .weui-input {
    padding-left: 0.3rem;
  }

  .selector .weui-label {
    text-align: left;
    padding-left: 0.1rem;
    box-sizing: border-box;
    width: 63px;
  }

  .weui-label {
    padding-left: 0.1rem;
    box-sizing: border-box;
  }

  .vux-tab-wrap {
    height: 7%;
  }

  scroller {
    position: absolute;
    top: 7%;
    height: 93%;
  }

  .weui-cell__hd {
    padding: 0 0.2rem;
    box-sizing: border-boxl;
  }

  /* body .vux-selector.weui-cell_select-after{
        padding: 0;
    } */
  .weui-cell_select .weui-select {
    padding-left: 0.3rem;
  }

  body .vux-selector.weui-cell_select-after {
    padding-left: 0;
  }

  body .weui-cells__title + .weui-cells {
    margin-top: 0.2rem;
  }

  .weui-cell_select-after .weui-select {
    padding-left: 0.2rem;
    box-sizing: border-box;
  }

  /* .color_text color_text1>div:nth-of-type(1){
      width: 30%;
  } */
  .color_text color_text1 > div:nth-of-type(2) {
    position: absolute;
    left: 0;
    top: 0;
  }

  @media screen and (min-width: 500px) and (max-width: 639px) {
    body .weui-cells__title + .weui-cells {
      margin-top: 0.05rem;
    }
  }

  @media screen and (min-width: 720px) and (max-width: 799px) {
    body .weui-cells__title + .weui-cells {
      margin-top: 0;
    }
    .isRequire {
      background: url("../../styles/img/require.png") no-repeat 0.06rem 0.36rem;
      background-size: 1.7%;
    }
  }

  @media screen and (min-width: 799px) and (max-width: 1024px) {
    body .weui-cells__title + .weui-cells {
      margin-top: 0.1rem;
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  .active {
    border: 1px solid #3cbaff;
  }

  .numInfo {
    overflow: hidden;
    font-size: 0.28rem;
    color: #555555;
    line-height: 0.6rem;
    .number {
      float: left;
    }
    .idCard {
      float: left;
      margin-left: 0.4rem;
    }
    .onlyOne {
      margin-left: 0rem;
    }
  }

  .telInfo {
    overflow: hidden;
    img {
      width: 0.24rem;
      height: 0.24rem;
      object-fit: cover;
      float: left;
      margin-top: 0.03rem;
    }
    span {
      float: left;
      font-size: 0.28rem;
      color: #555555;
      margin-left: 0.12rem;
    }
  }

  .stu_ul_li {
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    margin: 0.1rem 0;
    background-color: #ffffff;
  }

  .basicInfo {
    overflow: hidden;
    h3 {
      font-size: 0.32rem;
      color: #333333;
      float: left;
    }
    div {
      float: left;
      width: 0.6rem;
      height: 0.26rem;
      line-height: 0.26rem;
      margin-left: 0.25rem;
      font-size: 0.2rem;
      color: white;
      background: url("../../styles/img/male.png") no-repeat 0.25rem 0.035rem #3cbaff;
      background-size: 30%;
      margin-top: 0.19rem;
      padding-left: 0.1rem;
      border-radius: 10px;
    }

    .female {
      background: url("../../styles/img/female.png") no-repeat 0.25rem 0.018rem #fc5860;
      background-size: 0.6rem 0.26rem;
      background-size: 18%;
    }
  }

  .dn {
    display: none;
  }

  .order_deatils_div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background: #f9f9f9;
    font-size: 12px;
    .order_student_div {
      overflow: hidden;
      max-height: 130px;
      overflow-y: auto;
      div {
        float: left;
        overflow: hidden;
        margin: 0 3px 5px 3px;
        border: 1px solid #e7e3e7;
        text-align: center;
        width: auto;
        min-width: 38px;
        line-height: 38px;
        height: 38px;
        border: 1px solid #ececec;
        border-radius: 50px;
      }
    }
  }

  ul {
    width: 100%;
    overflow: hidden;
  }

  .stu_che {
    padding: 0 5px;
    margin: 10px 0;
    width: 100%;
  }

  // .stu_ul {
  //     font-size: 14px;
  //     text-align: left;
  //     li {
  //         color: #888;
  //         overflow: hidden;
  //         border-bottom: 1px solid #ebeef5;
  //         div {
  //             margin: 10px 0;
  //             float: left;
  //             width: 50%;
  //         }
  //     }
  //     label {
  //         padding: 0 10px;
  //         color: #000000;
  //     }
  // }

  .oli {
    height: 30px;
    line-height: 30px;
    transition: 2s;
  }

  .people_ul {
    div {
      width: 100%;
      height: 50px;
      // margin-bottom: 20px;
      line-height: 50px;
      border-bottom: 1px solid #f1f1f1;
    }
  }

  .odc {
    background: #ffffff;
    border-radius: 4px;
    margin-top: 5px;
    padding: 5px;
    overflow: hidden;
    width: 100%;
    .cto {
      width: 100%;
      overflow: hidden;
    }
  }

  .order_title {
    color: #999999;
    border-bottom: 1px solid #f1f1f1;
  }

  .order_content {
    width: 100%;
    overflow: hidden;
    line-height: 30px;
  }

  .text_left_float {
    float: left;
  }

  .text_rigth_float {
    float: right;
  }

  .attrib_ul {
    margin-top: 10px;
    li {
      margin-bottom: 10px;
      width: 38px;
      height: 38px;
      border-radius: 50px;
      float: left;
      margin-right: 10px;
      width: 38px;
      border: 1px solid #ececec;
      text-align: center;
    }
  }

  .people_ul_add {
    position: relative;
    right: 0px;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
  }

  .checker_item {
    margin-right: 10px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    width: 100px;
    text-align: center;
  }

  .deti_pro_ul {
    width: 100%;
    overflow: hidden;
    padding-left: 10px;
    .title_li {
      color: #9999;
    }
    .content_li {
      padding-left: 10px;
      width: 100%;
      overflow: hidden;
      .content_li_div {
        float: left;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .content_li_span {
        float: right;
      }
    }
  }

  .product_li {
    max-height: 200px;
    overflow-y: auto;
  }

  .product_name_div {
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
    width: 100%;
  }

  /**/
  /*.hd_div:not(:last-child) {*/
  /*border-bottom: 1px solid #f1f1f1;*/
  /*}*/
  span {
    font-size: 14px;
  }

  .img_div {
    width: 100%;
    overflow: hidden;
    height: 40px;
  }

  img {
    height: 100%;
  }

  .demo5-item {
    width: 80px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo5-item-selected {
    background: #ffffff;
    border-color: green;
  }

  .search_people_name {
    height: 20px;
    line-height: 20px;
  }

  .pay_item {
    margin: 5px 3%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    width: 40%;
    float: left;
    text-align: center;
  }

  .searchStudent {
    display: block;
    width: 6.9rem;
    height: 0.68rem;
    font-size: 0.28rem;
    text-align: center;
    margin: 0.25rem auto 0;
    background: #f4f4f4;
    border-radius: 15px;
    color: #666666;
    //  background: red;
  }

  body .order_deatils_div {
    background: #fff;
  }

  .isRequire {
    background: url("../../styles/img/require.png") no-repeat 0.06rem 0.36rem;
    background-size: 1.7%;
  }
</style>
