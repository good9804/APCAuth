<template>
  <div class="flex-wrap p-2 sm:ml-64 ">
    <div class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div class="max-w-[96rem] min-w-[18rem] mx-auto ">
        <div class=" bg-[url('./assets/apc.png')] bg-cover bg-center" >
          <div class="backdrop-brightness-50">
        <div class="flex justify-center">
          <div class="grid md:grid-cols-1 md:gap-6 relative z-0 mb-6 w-full group">
            <div class="mx-auto">
              <img src="../../assets/chungjuLogo.png">
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6 relative z-0 mb-6 w-full group ">
          <p class="text-white col-span-2 text-2xl flex justify-center" >
            농림축산식품부 인공지능 기반 신선 과채류의 품질 판정 기술 <br>개발 사업으로<br>
            디지털 트윈 시스템 개발중인 사이트입니다.<br>
            <br>
            충주 스마트 농산물산지유통센터(APC: Agricultural Productional Complex)를 토대로 
            신선 과채류의 입고, 품질 판정, 저장 및 주문에 의한 배송 기능까지 <br>가상화함으로써 디지털 트윈을 실현하였습니다.<br>
            아래 동영상은 APC 전체 공정과정을 나타낸 것 입니다.<br>
          </p>
          <div class="flex justify-center">
            <ul class="text-white">

              <span class="text-white text-2xl">
              제공하는 기능
              <br>
              </span>
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
      </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6 relative z-0 mb-6 w-full group ">
    <div class="text-xl text-white relative">
      최대 6개의 박스를 한 단위로 하여 APC 컨베이어 벨트에 투입이 됩니다.<br>
      사전세척기에 투입되어 박스와 원물이 분리되고 <br>원물들은 사전 세척 후 세척 건조기로 투입됩니다.<br>
      그 후육안 품질 검사를 통한 선별 과정을 거친 후 <br>품질 선별 시스템에 들어가기 위해 정렬 과정을 거칩니다.
      품질 선별 시스템 과정은 다음과 같습니다.<br>
      
      <div class="group relative cursor-pointer py-2 white-space: nowrap" >
      <span
        class="text-xl text-base underline cursor-pointer hover:text-blue-700 transition white-space: nowrap"
        @mouseover="showTooltip = true"
        @mouseout="showTooltip = false"
      >
      - 결점과 선별 시스템
    </span>
        <div v-if="showTooltip" 
       class=" absolute invisible bottom-7 group-hover:visible w-40 bg-white text-black px-4 mb-3 py-2 text-sm rounded-md white-space: nowrap">  
         <p class=" leading-2 text-gray-600 pt-2 pb-2"> 초당 30 프레임의 사진을 촬영하여 원물의 외부적인 결점 파악하고 바퀴 형태의 컨베이어 벨트를 통해 원물을 회전하게 만들어 결점 검사</p>
          <svg class="absolute z-10  bottom-[-10px] " width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white"/>
          </svg>
         </div>
        </div>
        <div class="group relative cursor-pointer py-2 white-space: nowrap" >
      <span
        class="text-xl text-base underline cursor-pointer hover:text-blue-700 transition white-space: nowrap"
        @mouseover="showTooltip2 = true"
        @mouseout="showTooltip2 = false"
      >
      - 중량 선별 시스템
    </span>
        <div v-if="showTooltip2" 
       class=" absolute invisible bottom-7 group-hover:visible w-40 bg-white text-black px-4 mb-3 py-2 text-sm rounded-md white-space: nowrap">  
         <p class=" leading-2 text-gray-600 pt-2 pb-2"> 원물 무게 측정</p>
          <svg class="absolute z-10  bottom-[-10px] " width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white"/>
          </svg>
         </div>
        </div>
        <div class="group relative cursor-pointer py-2 white-space: nowrap" >
      <span
        class="text-xl text-base underline cursor-pointer hover:text-blue-700 transition white-space: nowrap"
        @mouseover="showTooltip3 = true"
        @mouseout="showTooltip3 = false"
      >
      - 비파괴 광센서 시스템
    </span>
        <div v-if="showTooltip3" 
       class=" absolute invisible bottom-7 group-hover:visible w-40 bg-white text-black px-4 mb-3 py-2 text-sm rounded-md white-space: nowrap">  
         <p class=" leading-2 text-gray-600 pt-2 pb-2"> 광센서를 통하여 당도, 경도, 산도 등의 품위 데이터 측정 수집하며 여러 대의 카메라가 동시에 작동하여 각각의 원물에 대한 측정 병행</p>
          <svg class="absolute z-10  bottom-[-10px] " width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white"/>
          </svg>
         </div>
        </div>
    </div>
    


      <div class="flex justify-center">
         <iframe src="https://www.youtube.com/embed/_CjovkOcMZA" width="1200" height="600" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
        <div class="flex justify-center">
        <img src="../../assets/apcRoad.png" class="object-cover" height="600">
      </div>
      
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showTooltip: false,
      showTooltip2: false,
      showTooltip3: false,
      videoUrl: "https://www.youtube.com/embed/N3cPl0uZTh4"
    };
  }
};
</script>
