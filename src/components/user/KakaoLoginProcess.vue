<template>
  <div>
    <div v-if="loading">
      <p>로그인중입니다</p>
    </div>
    <div v-if="!loading">
      <p>로그인 완료</p>
      <p>jwt token : {{ jwtToken }}</p>
    </div>
  </div>
</template>
<script>
import router from "../../router/router"
import { kakaoLogin } from "@/api/user.js";

export default {
  data() {
    return {
      kakaoToken: '',
      jwtToken: '',
      loading: true,
    };
  },

  created() {
    this.kakaoToken = this.getToken();
    this.dokakaoLogin();
  },

  methods: {
    dokakaoLogin() {
        kakaoLogin(
        this.kakaoToken,
        (res) => {
          this.loading = false;
          this.jwtToken = res.data;
          localStorage.setItem('accessToken', this.jwtToken);
          this.$store.dispatch('getUserInfo');
          router.push({ name: 'Main' });
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },

    getToken() {
      var url = this.$route.query.code;
      return url;
    },
  },
};
</script>
