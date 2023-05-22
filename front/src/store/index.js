// store/index.js
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    login_user_id: "",
    login_user_name: "",
    login_user_role: 2, //0 : admin, 1 : user, 2 : unauth
    access_mode: 0, //0 : 권한 없음, 1 : 권한 있음
    alert_data: [],
  },
  getters: {
    getUserId(state) {
      return state.login_user_id;
    },
    getUserRole(state) {
      return state.login_user_role;
    },
    getAccessMode(state) {
      return state.access_mode;
    },
    getAlertData(state) {
      return state.alert_data;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      // payload : .commit을 통해 전달받은 데이터
      state.login_user_id = payload["login_user_id"];
      state.login_user_role = payload["login_user_role"];
    },
    setUserId(state, payload) {
      state.login_user_id = payload;
    },
    setUserRole(state, payload) {
      state.login_user_role = payload;
    },
    setUserName(state, payload) {
      state.login_user_name = payload;
    },
    setAccessMode(state, payload) {
      state.access_mode = payload;
    },
    setAlertData(state, payload) {
      state.alert_data.push(payload);
    },
    insertAlertData(state, payload) {
      var contents = [];
      contents.push(payload);
      state.alert_data.forEach(function (item) {
        if (contents.includes(item["content"]) == false) {
          //이미 콘텐츠 안에 같은 것이 있다면
          contents.push(item["content"]);
        }
      });
      state.alert_data = [];
      contents.forEach(function (item, index) {
        state.alert_data.push({ index: index, content: item });
      });
      console.log(state.alert_data);
    },
    deleteAlertData(state, payload) {
      state.alert_data.splice(payload, 1);
      var contents = [];
      state.alert_data.forEach(function (item) {
        if (contents.includes(item["content"]) == false) {
          //이미 콘텐츠 안에 같은 것이 있다면
          contents.push(item["content"]);
        }
      });
      state.alert_data = [];
      contents.forEach(function (item, index) {
        state.alert_data.push({ index: index, content: item });
      });
      console.log(state.alert_data);
    },
    clearAlertData(state) {
      state.alert_data = [];
    },
  },
  actions: {
    async refresh(context) {
      await axios
        .get("/users/api/verify/refresh", {})
        .then((res) => {
          if (res.data.message == "유효기간 만료 되어 재발급합니다.") {
            context.commit("setAccessMode", 1);
            context.commit("setUserInfo", {
              login_user_id: res.data.user.user_id,
              login_user_role: res.data.user.role,
            });
            context.commit("setUserName", res.data.user.user_name);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    async verify(context) {
      await context.commit("setAccessMode", 0);
      await axios
        .get("/users/api/verify/access", {})
        .then((res) => {
          const errormessage = res.data.message;
          if (errormessage == "jwt expired") {
            axios
              .get("/users/api/verify/refresh", {})
              .then((res) => {
                if (res.data.message == "유효기간 만료 되어 재발급합니다.") {
                  context.commit("setAccessMode", 1);
                }
              })
              .catch((err) => {
                alert(err);
              });
          } else {
            if (errormessage == "접속 성공") {
              context.commit("setAccessMode", 1);
            }
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    async getRole(context) {
      await context.commit("setUserRole", 2);
      await axios
        .get("/users/api/verify/role", { user_id: context.state.login_user_id })
        .then((res) => {
          console.log(res.data);
          context.commit("setUserRole", res.data.login_user_role);
        })
        .catch((err) => {
          alert(err);
        });
    },
    async getAlert(context) {
      try {
        const contents = await localStorage.getItem("contents").split(",");
        context.commit("clearAlertData", 0);
        if (contents[0] == "") return;
        await Array.from(contents).forEach(function (item, index) {
          context.commit("setAlertData", { index: index, content: item });
        });
      } catch (err) {
        context.commit("clearAlertData", 0);
        return;
      }
    },
    async deleteAlert(context, index) {
      await context.commit("deleteAlertData", index);
    },
    async deleteAllAlert(context) {
      await context.commit("clearAlertData", 0);
    },
  },
});

export default store;

// 사용법
// this.$store.commit("setUserInfo", {
//   login_user_id: "123",
//   login_user_role: "5",
// });
// console.log(this.$store.getters.getUserInfo);
// this.$store.dispatch('getData');

//this.$store.commit("insertAlertData", "알림 내용 적기");
