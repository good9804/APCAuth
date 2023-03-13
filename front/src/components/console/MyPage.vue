<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="gap-10 sticky top-0">
        <div class="flex flex-col gap-10">
          <!-- NOTE: list view -->
          <div
            class="text-gray-900 dark:text-white mb-5 pb-5 border-gray-600 border-b"
          >
            <p class="text-3xl text-center font-bold">마이페이지</p>
          </div>
          <div>
            <div class="gap-5 grow h-min">
              <div
                class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
              >
                <h5
                  class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                >
                  🙍내 정보 수정
                </h5>
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    id="floating_name"
                    v-model="user.userid"
                    class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="floating_name"
                    placeholder=" "
                    required=""
                    type="text"
                  />
                  <label
                    class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="floating_nmae"
                  >
                    아이디
                  </label>
                </div>
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    v-model="user.password"
                  />
                  <label
                    class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="floating_password"
                  >
                    현재 패스워드</label
                  >
                </div>

                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="floating_updatepassword"
                    id="floating_updatepassword"
                    class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    v-model="user.updatepassword"
                  />
                  <label
                    class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    for="floating_updatepassword"
                  >
                    변경 패스워드</label
                  >
                </div>

                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="repeat_updatepasswordcheck"
                    id="floating_repeat_updatepasswordcheck"
                    class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    v-model="user.updatepasswordcheck"
                  />
                  <label
                    for="floating_repeat_updatepasswordcheck"
                    class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    비밀번호 확인
                  </label>
                </div>
                <div class="flex-wrap gap-6">
                  <button
                    class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    v-on:click="submitUpdateUserInfo"
                  >
                    <span
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                    >
                      수정
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    submitUpdateUserInfo() {
      if (this.user.updatepassword !== this.user.updatepasswordcheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      this.$axios
        .post("/users/api/update", { user: this.user })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  created() {},
  data() {
    return {
      user: {
        userid: "",
        username: "",
        password: "",
        updatepassword: "",
        updatepasswordcheck: "",
      },
    };
  },
};
</script>
