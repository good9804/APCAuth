// store/index.js
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    loginUserId: "",
    loginUserName: "",
    loginUserRole: 2, //0 : admin, 1 : user, 2 : unauth
    AccessMode: 0, //0 : 권한 없음, 1 : 권한 있음
  },
  getters: {
    getUserId(state) {
      return state.loginUserId;
    },
    getUserRole(state) {
      return state.loginUserRole;
    },
    getAccessMode(state) {
      return state.AccessMode;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      // payload : .commit을 통해 전달받은 데이터
      state.loginUserId = payload["loginUserId"];
      state.loginUserRole = payload["loginUserRole"];
    },
    setUserId(state, payload) {
      state.loginUserId = payload;
    },
    setUserRole(state, payload) {
      state.loginUserRole = payload;
    },
    setUserName(state, payload) {
      state.loginUserName = payload;
    },
    setAccessMode(state, payload) {
      state.AccessMode = payload;
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
              loginUserId: res.data.user.userid,
              loginUserRole: res.data.user.role,
            });
            context.commit("setUserName", res.data.user.username);
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
        .get("/users/api/verify/role", { userid: context.state.loginUserId })
        .then((res) => {
          console.log(res.data);
          context.commit("setUserRole", res.data.loginUserRole);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});

export default store;

// 사용법
// this.$store.commit("setUserInfo", {
//   loginUserId: "123",
//   loginUserRole: "5",
// });
// console.log(this.$store.getters.getUserInfo);
// this.$store.dispatch('getData');
