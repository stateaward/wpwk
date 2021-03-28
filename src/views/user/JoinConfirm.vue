<template>
   <div v-if="loading">
      ...인증 중입니다...
      <loading></loading>
   </div>
</template>
<script>
import { checkEmailAuthReq } from '@/api/email.js';
import router from '../../router/router';
import Loading from '@/components/main/Loading.vue';

export default {
   components: {
      Loading,
   },
   data() {
      return {
         loading: true,
      };
   },
   created() {
      this.checkEmailAuth();
   },
   methods: {
      // 이메일 인증
      checkEmailAuth() {
         checkEmailAuthReq(
            this.$route.query.uid,
            this.$route.query.verificationKey,
            (res) => {
               this.loading = true;
               if (res.status === 200) {
                  alert('회원가입이 완료되었습니다.');
               }
               if (res.status === 208) {
                  alert('이미 인증이 완료된 이메일입니다.');
               }
               router.push({ name: 'Login' });
            },
            (err) => {
               this.loading = true;
               console.log(err);
               alert('인증코드가 일치하지 않습니다.');
               router.push({ name: 'Login' });
            }
         );
      },
   },
};
</script>
<style></style>
