<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[48rem] min-w-[18rem] mx-auto">
        <div
          class="grid md:grid-cols-2 md:gap-6 relative z-0 mb-6 w-full group"
        >
          <input
            type="text"
            name="floating_user_id"
            id="floating_user_id"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            v-model="user.user_id"
          />
          <label
            for="floating_alias"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            아이디</label
          >
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              v-model="user.password"
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              비밀번호
            </label>
          </div>
        </div>

        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="login"
        >
          로그인
        </button>
        <button
          class="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="login"
        >
          <a href="/users/signup">가입하기</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        user_id: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      this.$emitter.emit("eventMethod", "event 전송");
      this.$axios
        .post("/users/api/login", {
          user: this.user,
        })
        .then((res) => {
          if (res.data.success == true) {
            console.log(res.data);
            this.$store.commit("setUserInfo", res.data.user_info);
            console.log(this.$store.getters.getUserRole);
            this.$router.push("/");
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style></style>
