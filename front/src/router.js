import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //path별 component를 추가한다.
    {
      path: "/users",
      name: "MainPage",
      component: () => import("@/components/Main/MainPage"),
    },
    {
      path: "/users/signup",
      name: "SignupPage",
      component: () => import("@/components/Login/SignupPage"),
    },
    {
      path: "/users/login",
      name: "LoginPage",
      component: () => import("@/components/Login/LoginPage"),
    },
    {
      path: "/users/mypage", //mypage : admin console 이나 userpage로 이동하기위해 만듬
      meta: { requiresRole: true },
    },
    {
      path: "/users/usermypage",
      name: "UserPage",
      component: () => import("@/components/Console/MyPage"),
      meta: { requiresAuth: true },
    },
    {
      path: "/users/adminpage",
      name: "AdminPage",
      component: () => import("@/components/Console/AdminPage"),
      meta: { requiresAdmin: true },
    },
  ],
});

import store from "./store/index";

router.beforeEach(async function (to, _, next) {
  await store.dispatch("refresh"); //routing 시 Refresh 토큰 확인 후 Access 토큰 재발급
  await store.dispatch("getAlert"); //routing 시 기존 alarm 목록 불러오기
  if (to.meta.requiresAuth) {
    //admin 권한이 필요한 url
    await store.dispatch("verify"); //권한 점검
    const access_message = await store.getters.getAccessMode;
    //console.log(access_message);
    if (access_message == 0) {
      //권한 없음
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    } else {
      next();
    }
  }
  if (to.meta.requiresAdmin) {
    //관리자 콘솔로 이동을 위한 확인
    const role = await store.getters.getUserRole; // 권한 가져오기
    //console.log(role);
    if (role == 0) {
      //관리자 
      next();
    } else {
      alert("관리자 계정만 접근이 가능합니다.");
      next("/");
    }
  }
  if (to.meta.requiresRole) {
    //mypage 이동용
    const role = await store.getters.getUserRole;
    console.log(role);
    if (role == 0) {
      //관리자
      next("/users/adminpage");
    } else if (role == 1) {
      //일반 사용자
      next("/users/usermypage");
    } else {
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    }
  } else {
    next();
  }
});

export default router;
