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
                  <div class="flex-wrap gap-6">
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageInfoMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        내 정보 수정
                      </span>
                    </button>
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toViewImportHistory"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        입고 결과
                      </span>
                    </button>
                  </div>
                </h5>

                <div v-if="user_edit_mode == 'manageInfo'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <div
                      class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
                    >
                      <h5
                        class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                      >
                        내 정보 수정
                      </h5>
                      <div class="relative z-0 mb-6 w-full group">
                        <input
                          id="floating_id"
                          v-model="user.user_id"
                          class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          name="floating_id"
                          placeholder=" "
                          required=""
                          type="text"
                        />
                        <label
                          class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          for="floating_id"
                        >
                          아이디
                        </label>
                      </div>
                      <div class="relative z-0 mb-6 w-full group">
                        <input
                          id="floating_name"
                          v-model="user.user_name"
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
                          이름
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
                          name="floating_update_password"
                          id="floating_update_password"
                          class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                          v-model="user.update_password"
                        />
                        <label
                          class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          for="floating_update_password"
                        >
                          변경 패스워드</label
                        >
                      </div>

                      <div class="relative z-0 mb-6 w-full group">
                        <input
                          type="password"
                          name="repeat_update_password_check"
                          id="floating_repeat_update_password_check"
                          class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                          v-model="user.update_password_check"
                        />
                        <label
                          for="floating_repeat_update_password_check"
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

                <div v-if="user_edit_mode == 'importHistory'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <div
                      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
                    >
                      <div
                        class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div
                          class="text-2xl font-bold text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-white"
                          id="fullWidthTab"
                        >
                          <div
                            id="stats-tab"
                            class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            날짜 : {{ selected_history.createdAt }} 총 무게 :
                            {{
                              (
                                (selected_history.weight *
                                  (selected_history.grade_A +
                                    selected_history.grade_B +
                                    selected_history.grade_C +
                                    selected_history.grade_D +
                                    selected_history.grade_E)) /
                                1000
                              ).toFixed(2)
                            }}
                            KG
                          </div>
                        </div>
                        <div
                          id="fullWidthTabContent"
                          class="border-t border-gray-200 dark:border-gray-600"
                        >
                          <dl
                            class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8"
                          >
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">품목</dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.item }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">품종</dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.kind }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                평균 무게
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.weight }} G
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">경도</dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.hardness }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">당도</dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.brix }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">산도</dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.acidity }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                색상(Hunter L)
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.color }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                A 등급
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.grade_A }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                B 등급
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.grade_B }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                C 등급
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.grade_C }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                D 등급
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.grade_D }}
                              </dd>
                            </div>
                            <div
                              class="flex flex-col items-center justify-center"
                            >
                              <dt class="mb-2 text-3xl font-extrabold">
                                E 등급
                              </dt>
                              <dd class="text-xl text-gray-500 dark:text-white">
                                {{ selected_history.grade_E }}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      <div class="flex flex-row-2">
                        <div
                          class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                          <DatePicker v-model="date" mode="date" />
                        </div>
                        <div
                          class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                          <div
                            id="imagelist"
                            class="relative max-h-96 overflow-y-scroll sm:rounded-lg"
                          >
                            <table
                              class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                            >
                              <thead
                                class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                              >
                                <tr>
                                  <th
                                    scope="col"
                                    class="text-center text-white py-3 px-6"
                                  >
                                    목록
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="history in import_history_list"
                                  :key="history.idx"
                                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                  <th
                                    scope="row"
                                    class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                                  >
                                    입고 처리 날짜 :
                                    {{ history.createdAt }}
                                    <button
                                      v-on:click="viewHistory(history)"
                                      class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                                    >
                                      <span
                                        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                                      >
                                        확인
                                      </span>
                                    </button>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  data() {
    return {
      user: {
        user_id: "",
        user_name: "",
        password: "",
        update_password: "",
        update_password_check: "",
      },
      user_edit_mode: "manageInfo",
      import_history_list: [],
      all_import_history_list: [],
      selected_history: {},
      date: new Date(),
    };
  },
  methods: {
    toManageInfoMode() {
      this.user_edit_mode = "manageInfo";
    },
    toViewImportHistory() {
      this.user_edit_mode = "importHistory";
    },
    submitUpdateUserInfo() {
      if (this.user.update_password !== this.user.update_password_check) {
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
    getImportHistoryList() {
      this.$axios
        .post("/users/api/import/view", {
          user_id: this.$store.getters.getUserId,
          login_user_role: this.$store.getters.getUserRole,
        })
        .then((res) => {
          res.data.import_history_list.forEach((element) => {
            element["createdAt"] = this.formatDate(element["createdAt"]);
          });
          this.import_history_list = res.data.import_history_list;
          this.all_import_history_list = res.data.import_history_list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDate(date) {
      var d = new Date(date);
      var month = "" + (d.getMonth() + 1);
      var day = "" + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    viewHistory(history) {
      this.selected_history = history;
    },
  },
  watch: {
    //vuex 변수의 값이 변함을 감지하는 곳
    date() {
      this.import_history_list = [];
      this.all_import_history_list.forEach((element) => {
        if (this.formatDate(element.createdAt) == this.formatDate(this.date)) {
          this.import_history_list.push(element);
        }
      });
      console.log(this.import_history_list);
    },
  },
  mounted() {
    this.getImportHistoryList();
  },
};
</script>
