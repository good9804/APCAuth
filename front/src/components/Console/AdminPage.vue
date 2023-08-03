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
                      </span></button
                    ><button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageRegisterProductMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        상품 등록
                      </span>
                    </button>
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageProductMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        상품 관리
                      </span>
                    </button>
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageOrderMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        취소주문관리
                      </span>
                    </button>
                  </div>
                </h5>

                <div v-if="user_edit_mode == 'manageRegisterProductMode'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <div class="grid grid-row-3 py-6">
                      <div class="mb-6">
                        <label
                          for="default-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >제품명</label
                        >
                        <input
                          type="text"
                          v-model="product.product_item"
                          id="default-input"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div
                        class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                      >
                        <div
                          class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800"
                        >
                          <label for="comment" class="sr-only"
                            >Your comment</label
                          >
                          <textarea
                            id="comment"
                            v-model="product.product_detail"
                            rows="4"
                            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="제품 설명"
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div class="mb-6">
                        <label
                          for="default-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >원산지</label
                        >
                        <input
                          type="text"
                          v-model="product.product_made"
                          id="default-input"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div class="mb-6">
                        <label
                          for="default-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >제품 가격</label
                        >
                        <input
                          type="text"
                          v-model="product.product_price"
                          id="default-input"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div class="mb-6">
                        <div
                          class="p-6 bg-whiteborder border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <label
                            for="images"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >이미지 업로드</label
                          >
                          <div class="file-upload">
                            <input
                              type="file"
                              accept="image/*"
                              @change="onFileChange"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="mb-6">
                        <button
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          @click="onUploadProduct"
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="user_edit_mode == 'manageProductMode'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <table
                      v-if="product_list"
                      class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <tr>
                          <th scope="col" class="text-center py-3 px-6">
                            상품 이름
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            상품 설명
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="product in product_list"
                          :key="product.idx"
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ product["product_item"] }}
                          </th>
                          <td
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ product["product_detail"] }}
                          </td>
                          <td
                            class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                          >
                            <button
                              v-on:click="deleteProduct(product)"
                              class="relative inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            >
                              <span
                                class="relative text-2xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                              >
                                삭제
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                <div v-else-if="user_edit_mode == 'manageOrderMode'">
                  <table
                    v-if="request_decline_orders"
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
                          주문 번호
                        </th>
                        <th scope="col" class="text-center py-3 px-6">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="order in request_decline_orders"
                        :key="order.idx"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ order["order_id"] }}
                        </th>
                        <td
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ order["order_number"] }}
                        </td>

                        <td
                          class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                        >
                          <button
                            v-on:click="deleteOrder(order)"
                            class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                          >
                            <span
                              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                            >
                              승인
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="user_edit_mode == 'managePendingUsers'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <table
                      v-if="pending_user_list.length !== 0"
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
                          v-for="user in pending_user_list"
                          :key="user.idx"
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ user["user_id"] }}
                          </th>
                          <td
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ user["user_name"] }}
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
                <div v-else-if="user_edit_mode == 'manageUsers'">
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
                          {{ user["user_id"] }}
                        </th>
                        <td
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ user["user_name"] }}
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
      product_list: [],
      request_decline_orders: [],
      pending_user_list: {},
      loading: true,
      users: {},
      user_edit_mode: "managePendingUsers",
      product: {
        product_item: "제품명",
        product_detail: "제품 설명",
        product_price: 0,
        product_made: "원산지",
      },
      selected_file: "",
    };
  },
  methods: {
    toPendingMode() {
      this.user_edit_mode = "managePendingUsers";
    },
    toManageMode() {
      this.user_edit_mode = "manageUsers";
    },
    toManageProductMode() {
      this.user_edit_mode = "manageProductMode";
    },
    toManageOrderMode() {
      this.user_edit_mode = "manageOrderMode";
    },
    toManageRegisterProductMode() {
      this.user_edit_mode = "manageRegisterProductMode";
      console.log(1);
    },
    getUserList() {
      this.$axios
        .get("/users/api/view/info", {})
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getPendingUserList() {
      this.$axios
        .get("/users/api/view/pending", {})
        .then((res) => {
          this.pending_user_list = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    approveuser(user) {
      this.$axios
        .post("/users/api/approve", { user: user })
        .then((res) => {
          this.pending_user_list = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    declineuser(user) {
      this.$axios
        .post("/users/api/decline", { user: user })
        .then((res) => {
          this.pending_user_list = res.data;
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
    getProductList() {
      this.$axios
        .get("/product/api/admin/view", {})
        .then((res) => {
          this.product_list = res.data.product_list;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteProduct(product) {
      this.$axios
        .post("/product/api/delete", {
          product_item: product["product_item"],
          product_detail: product["product_detail"],
        })
        .then((res) => {
          this.product_list = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getRequestDeclineOrders() {
      this.$axios
        .get("/order/api/view/decline", {})
        .then((res) => {
          this.request_decline_orders = res.data.order_list;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteOrder(order) {
      this.$axios
        .post("/order/api/decline/approve", { order: order })
        .then((res) => {
          this.request_decline_orders = res.data.order_list;
        })
        .catch((err) => {
          alert(err);
        });
    },
    onFileChange(event) {
      const selected_file = event.target.files[0]; // accessing file
      this.selected_file = selected_file;
    },
    onUploadProduct() {
      const formData = new FormData();
      formData.append("file", this.selected_file); // appending file
      formData.append("product_item", this.product["product_item"]); // appending file
      formData.append("product_detail", this.product["product_detail"]); // appending file
      formData.append("product_price", this.product["product_price"]); // appending file
      formData.append("product_made", this.product["product_made"]); // appending file
      // sending file to the backend
      this.$axios
        .post("/product/api/register", formData)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getPendingUserList();
    this.getUserList();
    this.getProductList();
    this.getRequestDeclineOrders();
  },
  watch: {
    pending_user_list() {
      if (this.pending_user_list.length === 0) {
        this.loading = false;
      }
    },
    product_list() {
      if (this.product_list.length == 0) {
        this.loading = false;
      }
    },
  },
};
</script>
