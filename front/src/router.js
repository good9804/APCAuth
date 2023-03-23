import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //path별 component를 추가한다.
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
      path: "/mypage", //mypage : admin console 이나 userpage로 이동하기위해 만듬
      meta: { requiresRole: true },
    },
    {
      path: "/users/mypage",
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
  await store.dispatch("refresh");
  if (to.meta.requiresAuth) {
    await store.dispatch("verify");
    const accessmessage = await store.getters.getAccessMode;
    console.log(accessmessage);
    if (accessmessage == 0) {
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    } else {
      next();
    }
  }
  if (to.meta.requiresAdmin) {
    const role = await store.getters.getUserRole;
    console.log(role);
    if (role == 0) {
      next();
    } else {
      alert("허용되지 않은 접근");
      next("/users/login");
    }
  }
  if (to.meta.requiresRole) {
    const role = await store.getters.getUserRole;
    console.log(role);
    if (role == 0) {
      next("/users/adminpage");
    } else if (role == 1) {
      next("/users/mypage");
    } else {
      alert("로그인 후 이용해주세요.");
      next("/users/login");
    }
  } else {
    next();
  }
});

export default router;
