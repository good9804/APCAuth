<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div class="max-w-[96rem] min-w-[18rem] mx-auto">
        <div>
          <div class="grid md:grid-cols-3 md:gap-6 relative z-0 mb-6 w-full group;">
            <div></div>
            <div>
          <img src="../../assets/chungjuLogo.png" >
        </div>
          <span class="text-white text-2xl">
              <br>
              <br>
              <br>
              <br>
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제공하는 기능
        </span>
        
        </div>
       
        </div>
        <div class="grid md:grid-cols-3 md:gap-6 relative z-0 mb-6 w-full group;">
          <p class="text-white col-span-2 text-2xl flex justify-center" >
            농림축산식품부 인공지능 기반 신선 과채류의 품질 판정 기술 <br>개발 사업으로<br>
            디지털 트윈 시스템 개발중인 사이트입니다.<br>
            <br>
            충주 APC를 디지털트윈화 하였으며 <br>
            아래 동영상은 APC 전체 공정과정을 나타낸 것 입니다.<br>
          </p>
          <div class="flex justify-center">
            <ul class="text-white">
              <li class="text-xl">
                <a href="/product/import">
                <p class="underline">
                  입고</p></a>
                  <a href="/product/import/view">
                <p class="text-base underline">- 회원 별 입고 기록 관리</p></a>
              </li>
              <li class="text-xl">
                <a href="/dashboard">
                  <p class="underline">
                모니터링</p></a>
                <p class="text-base">
                  - 공정 프로세스 3D 모델링<br>
                  - 선별 진행 상황<br>
                  - 저장고 구역별 온,습도<br>
                  - 이상상태 알림<br>
                </p>
              </li>
              <li class="text-xl">
                <a href="/dashboard/storage">
                  <p class="underline">저장고</p></a>
                  <a href="/dashboard/storage">
                <p class="text-base underline">- 저장고 구역 관리</p></a>
              </li>
              <li class="text-xl">
                <a href="/order/main">
                  <p class="underline">유통</p></a>
                <p class="text-base">
                  <a href="/users/adminpage" class="underline">
                  - 상품 등록<br></a>
                  <a href="/order/main" class="underline">
                  - 주문 등록<br></a>
                  <a href="/product/counsel" class="underline">
                  - 회원 문의<br></a>
                  <a href="/order/view" class="underline">
                  - 주문 조회<br></a>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-center">
      <iframe src="https://www.youtube.com/embed/_CjovkOcMZA" width="1200" height="600" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="flex justify-center">
        <img src="../../assets/apcRoad.png" class="object-cover" height="600">
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
