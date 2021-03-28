<template lang="">
   <div id="naverIdLogin"></div>
</template>
<script>
const naverService = () => {
   var naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'dYxRjRrd569zhsnI7b3z',
      // callbackUrl: 'http://localhost:8080/login/oauth2/code/naver',
      callbackUrl: 'http://i4a205.p.ssafy.io/login/oauth2/code/naver',
      isPopup: false /* 팝업을 통한 연동처리 여부 */,
      loginButton: { color: 'green', type: 1, height: 38 } /* 로그인 버튼의 타입을 지정 */,
   });

   /* 설정정보를 초기화하고 연동을 준비 */
   naverLogin.init();
};

export default {
   mounted() {
      naverService();
   },
};
</script>
<style scoped>
#naverIdLogin {
   display: inline;
}
</style>
