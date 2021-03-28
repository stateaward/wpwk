<template>
  <div>
    <!-- <div v-if="loading">
      <p>로그인중입니다</p>
    </div> -->
  </div>
</template>
<script>
import router from "../../router/router"
import { naverLogin } from "@/api/user.js";

export default {
  data() {
    return {
      naverToken: "",
      jwtToken: "",
    };
  },

  created() {
    this.naverToken = this.getToken()    
    this.doNaverLogin()
  },

  methods: {
    doNaverLogin() {
      naverLogin(
        this.naverToken,
        (res) => {
          this.loading = false;
          this.jwtToken = res.data;
          localStorage.removeItem("com.naver.nid.oauth.state_token");
          localStorage.setItem("accessToken", this.jwtToken);
          this.$store.dispatch("getUserInfo"); // 토큰을 이용한 유저정보 가져오기
          router.push({name:'Main'});
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },

    getToken() {
      var url = this.$route.hash;
      var tokenInfo = url.replace("#", "");
      var strArray = tokenInfo.split("=");
      var token = strArray[1].split("&");      

      return token[0];
    },
  },
};
</script>
