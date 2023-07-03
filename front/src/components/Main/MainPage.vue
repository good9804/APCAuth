<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[56rem] min-w-[18rem] mx-auto">
        <div
          class="grid md:grid-cols-2 md:gap-6 relative z-0 mb-6 w-full group;"
        >
        <p class="text-white">
          농림축산식품부 인공지능 기반 신선과채류의 품질 판정 기술 개발 사업으로 디지털 트윈 시스템 개발중인 사이트입니다.<br>

          충주 APC를 디지털트윈화 하였으며 아래 동영상은 APC 전체 공정과정을 나타낸 것 입니다.<br>
          현재 사이트에서 제공하는 기능들은 오른쪽 목록과 같습니다.
        </p>
        <ul class="text-white">
          <li>
            입고
            <p>
              - 회원 별 입고 기록 관리
            </p>
          </li>
          <li>
            모니터링
            <p>
              - 공정 프로세스 3D 모델링<br>
              - 선별 진행 상황<br>
              - 저장고 구역별 온,습도<br>
              - 이상상태 알림<br>
            </p>
          </li>
          <li>
            저장소
            <p>
              - 저장고 구역 관리
            </p>
          </li>
          <li>
            유통
            <p>
              - 상품 등록<br>
              - 주문 등록<br>
              - 회원 문의<br>
              - 주문 조회<br>
            </p>
          </li>
        </ul>
        </div>
        <div
          class="grid md:grid-cols-2 md:gap-6 relative z-0 mb-6 w-full group align-items: center;"
        >
        <object width="560" height="315" :data="videoUrl" frameborder="0" allowfullscreen></object>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: "https://www.youtube.com/embed/N3cPl0uZTh4"
    };
  }
};
</script>


