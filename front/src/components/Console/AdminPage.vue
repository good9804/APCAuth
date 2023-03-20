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
            <p class="text-3xl text-center font-bold">관리자 콘솔</p>
          </div>
          <div>
            <div class="gap-5 grow h-min">
              <div
                class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
              >
                <h5
                  class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                >
                  <div class="flex-wrap gap-6">
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toPendingMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        유저승인
                      </span>
                    </button>
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        유저관리
                      </span>
                    </button>
                  </div>
                </h5>

                <div v-if="userEditMode == 'managePendingUsers'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <table
                      v-if="pendingusers.length !== 0"
                      class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <tr>
                          <th scope="col" class="text-center py-3 px-6">
                            유저 아이디
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            유저 이름
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="user in pendingusers"
                          :key="user.idx"
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ user["userid"] }}
                          </th>
                          <td
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ user["username"] }}
                          </td>

                          <td
                            class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                          >
                            <button
                              v-on:click="approveuser(user)"
                              class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                            >
                              <span
                                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                              >
                                승인
                              </span>
                            </button>
                            <button
                              v-on:click="declineuser(user)"
                              class="relative inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            >
                              <span
                                class="relative text-2xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                              >
                                거절
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h5
                      v-show="nosign"
                      class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                    >
                      깔끔해요! 미승인 유저가 없습니다.
                    </h5>
                    <div
                      v-show="loading"
                      class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="userEditMode == 'manageUsers'">
                  <table
                    v-if="users.length !== 0"
                    class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="text-center py-3 px-6">
                          유저 아이디
                        </th>
                        <th scope="col" class="text-center py-3 px-6">
                          유저 이름
                        </th>
                        <th scope="col" class="text-center py-3 px-6">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="user in users"
                        :key="user.idx"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ user["userid"] }}
                        </th>
                        <td
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ user["username"] }}
                        </td>

                        <td
                          class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                        >
                          <button
                            v-on:click="deleteuser(user)"
                            class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                          >
                            <span
                              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                            >
                              제거
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h5
                    v-show="nousers"
                    class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                  >
                    깔끔해요! 유저가 없습니다.
                  </h5>
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
  data() {
    return {
      pendingusers: {},
      nosign: false,
      nousers: false,
      loading: true,
      users: {},
      userEditMode: "managePendingUsers",
    };
  },
  methods: {
    toPendingMode() {
      this.userEditMode = "managePendingUsers";
    },
    toManageMode() {
      this.userEditMode = "manageUsers";
    },
    getUserList() {
      this.$axios
        .get("/users/api/view/users", {})
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getPendingUserList() {
      this.$axios
        .get("/users/api/pending", {})
        .then((res) => {
          this.pendingusers = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    approveuser(user) {
      this.$axios
        .post("/users/api/approve", { user: user })
        .then((res) => {
          this.pendingusers = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    declineuser(user) {
      this.$axios
        .post("/users/api/decline", { user: user })
        .then((res) => {
          this.pendingusers = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteuser(user) {
      this.$axios
        .post("/users/api/delete", { user: user })
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  created() {
    this.getPendingUserList();
    this.getUserList();
  },
  watch: {
    pendingusers() {
      if (this.pendingusers.length === 0) {
        this.loading = false;
        this.nosign = true;
      }
    },
    users() {
      if (this.users.length === 0) {
        this.nousers = true;
      }
    },
  },
};
</script>
