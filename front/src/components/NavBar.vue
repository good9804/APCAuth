<template>
  <div>
    <nav
      class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <a href="/" class="flex ml-2 md:mr-24">
              <img src="../assets/rda_logo.png" class="h-8 mr-3" alt="Logo" />
              <span
                class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >
                APC</span
              >
            </a>
          </div>

          <div v-show="logout">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <div
                  class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
                >
                  <div>
                    <button
                      id="show-modal"
                      class="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      @click="showModal = true"
                    >
                      <svg
                        class="w-5 h-5 mr-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        ></path>
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        ></path>
                      </svg>
                      <span class="sr-only">Notifications</span>
                      알림
                      <div
                        class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
                      >
                        <!-- 알림 개수 modal-->
                        {{ alert_data.length }}
                      </div>
                    </button>

                    <!-- use the modal component, pass in the prop -->
                    <ModalTool v-if="showModal" @close="showModal = false">
                      <!-- 알림 창 생성 modal-->
                    </ModalTool>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <aside
      id="separator-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <button
              @click="toggleDropdown1"
              id="dropdownOffsetButton"
              data-dropdown-toggle="dropdownBottom"
              data-dropdown-placement="bottom"
              data-dropdown-offset-distance="35"
              data-dropdown-offset-skidding="0"
              type="button"
            >
              <div
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  fill="currentColor"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
                  ></path>
                </svg>
                <span class="ml-3">공정 제어</span>
              </div>
              <div v-if="show_drop_down_1" id="mega-menu-full-image-dropdown">
                <a
                  href="/dashboard"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="ml-3">품질 선별</span>
                </a>
                <a
                  href="/dashboard/view/storage"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="ml-3">저장 보관</span>
                </a>
              </div>
            </button>
          </li>

          <li>
            <a
              href="/dashboard/storage"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z"
                ></path>
                <path
                  d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">저장고 관리</span>
            </a>
          </li>

          <li>
            <button
              @click="toggleDropdown2"
              id="dropdownOffsetButton"
              data-dropdown-toggle="dropdownBottom"
              data-dropdown-placement="bottom"
              data-dropdown-offset-distance="35"
              data-dropdown-offset-skidding="0"
              type="button"
            >
              <div
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">계정</span>
              </div>
            </button>
            <div v-if="show_drop_down_2" id="mega-menu-full-image-dropdown">
              <a
                href="/users/mypage"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">내 계정 정보</span>
              </a>

              <div v-show="login">
                <a
                  href="/users/login"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">로그인</span>
                </a>
              </div>
              <div v-show="logout">
                <a
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <button v-on:click="signOut" class="ml-3 whitespace-nowrap">
                    로그아웃
                  </button>
                </a>
              </div>
              <a
                href="/users/signup"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">회원가입</span>
              </a>
            </div>
          </li>
        </ul>

        <ul
          class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700"
        >
          <li>
            <button
              @click="toggleDropdown3"
              id="dropdownOffsetButton"
              data-dropdown-toggle="dropdownBottom"
              data-dropdown-placement="bottom"
              data-dropdown-offset-distance="35"
              data-dropdown-offset-skidding="0"
              type="button"
            >
              <div
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                  ></path>
                  <path
                    d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">입고</span>
              </div>
            </button>
            <div v-if="show_drop_down_3" id="mega-menu-full-image-dropdown">
              <a
                href="/product/import"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">원물 등록</span>
              </a>
              <a
                href="/product/import/input"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">공정 대기</span>
              </a>

              <a
                href="/product/import/view"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">처리 내역</span>
              </a>
            </div>
          </li>

          <li>
            <button
              @click="toggleDropdown4"
              id="dropdownOffsetButton"
              data-dropdown-toggle="dropdownBottom"
              data-dropdown-placement="bottom"
              data-dropdown-offset-distance="35"
              data-dropdown-offset-skidding="0"
              type="button"
            >
              <div
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">주문</span>
              </div>
            </button>

            <div v-if="show_drop_down_4" id="mega-menu-full-image-dropdown">
              <a
                href="/order/main"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">제품 목록</span>
              </a>

              <a
                href="/order/view"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">주문 내역</span>
              </a>
              <a
                href="/order/track/info"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap"
                  >이력 조회</span
                >
              </a>
            </div>
          </li>
          <li>
            <button
              @click="toggleDropdown5"
              id="dropdownOffsetButton"
              data-dropdown-toggle="dropdownBottom"
              data-dropdown-placement="bottom"
              data-dropdown-offset-distance="35"
              data-dropdown-offset-skidding="0"
              type="button"
            >
              <div
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">고객 문의</span>
              </div>
            </button>
            <div v-if="show_drop_down_5" id="mega-menu-full-image-dropdown">
              <a
                href="/product/counsel"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">1:1 문의</span>
              </a>
              <a
                href="/product/counsel/view"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">문의 내역</span>
              </a>
            </div>
          </li>

          <li>
            <a
              href="https://forms.gle/MSz2PNB7hNHP8Gae6"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              ><svg
                fill="currentColor"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">리뷰</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import ModalTool from "./Modal/AlertModal";

export default {
  components: { ModalTool },
  data: () => ({
    login: true, //login 표시
    logout: false, //logout 표시
    showModal: false,
    alert_data: [],
    show_drop_down_1: false,
    show_drop_down_2: false,
    show_drop_down_3: false,
    show_drop_down_4: false,
    show_drop_down_5: false,
  }),
  methods: {
    signOut() {
      //signout
      this.$axios
        .get("/users/api/logout", {})
        .then((res) => {
          alert(res.data.message);
          this.$store.commit("setUserId", "");
          this.$router.push("/users/login");
        })
        .catch((err) => {
          alert(err);
        });
    },
    toggleDropdown1() {
      this.show_drop_down_1 = !this.show_drop_down_1;
    },
    toggleDropdown2() {
      this.show_drop_down_2 = !this.show_drop_down_2;
    },
    toggleDropdown3() {
      this.show_drop_down_3 = !this.show_drop_down_3;
    },
    toggleDropdown4() {
      this.show_drop_down_4 = !this.show_drop_down_4;
    },
    toggleDropdown5() {
      this.show_drop_down_5 = !this.show_drop_down_5;
    },
  },
  mounted() {
    this.alert_data = this.$store.getters.getAlertData;
  },
  computed: {
    checklogin: function () {
      return this.$store.getters.getUserId;
    },
    changeAlertData: function () {
      return this.$store.getters.getAlertData;
    },
  },
  watch: {
    //vuex 변수의 값이 변함을 감지하는 곳
    checklogin(val) {
      if (val) {
        this.login = false;
        this.logout = true;
      } else {
        this.login = true;
        this.logout = false;
      }
    },
    changeAlertData(value) {
      this.alert_data = value;
    },
  },
};
</script>

<style></style>
