<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="flex items-center flex-col">
          <div
            class="h-[900px] block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-y-scroll"
          >
            <div class="w-[1600px]">
              <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                  <h5
                    class="mb-2 text-white font-bold rounded-lg text-xl py-4 mr-2"
                  >
                    알림
                  </h5>
                </div>
                <div class="flex flex-row-reverse items-center justify-between">
                  <button
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="$emit('close')"
                  >
                    닫기
                  </button>
                  <button
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="deleteAllAlert"
                  >
                    모두 삭제
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-body">
              <slot name="body"> <AlertTool></AlertTool> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AlertTool from "../Alert/AlertTool";
export default {
  components: {
    AlertTool,
  },
  methods: {
    deleteAllAlert() {
      //알람 전부 삭제
      this.$store.dispatch("deleteAllAlert");
      this.changeLocalStorage();
    },
    changeLocalStorage() {
      const contentsArray = this.$store.getters.getAlertData; //index vuex -> 로컬스토리지 적용부분 1
      var contents = []; //index vuex -> 로컬스토리지 적용부분 2
      contentsArray.forEach(function (item) {
        //index vuex -> 로컬스토리지 적용부분 3
        contents.push(item["content"]);
      });
      localStorage.setItem("contents", contents); //index vuex -> 로컬스토리지 적용부분 4
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  color: #555555;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
