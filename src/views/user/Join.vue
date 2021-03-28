<template>
   <div class="lj-container">
      <div class="wrapper">
         <div class="title">
            <img class="join-img" src="@/assets/c_wp.png" />
            <span>우리와 함께해요!</span>
         </div>
         <div class="input-wrapper">
            <div class="input-email">
               <label for="email">이메일을 입력해주세요! </label>
               <input
                  class="join"
                  type="text"
                  v-bind:class="{ error: error.email, complete: !error.email && join_email.length !== 0 }"
                  v-model="join_email"
                  id="email"
                  placeholder="이메일을 입력하세요."
               />
               <div class="error-text" v-if="error.email">
                  <v-icon>
                     mdi-alert-decagram
                  </v-icon>
                  {{ error.email }}
               </div>
            </div>
            <div class="input-nick">
               <label for="nick">별명을 입력해주세요! </label>
               <input class="join nf" type="text" v-model="join_nick" id="nick" placeholder="별명을 입력하세요." />
            </div>
            <div class="input-password">
               <label for="password">비밀번호 </label>
               <input
                  type="password"
                  class="join"
                  v-bind:class="{ error: error.password, complete: !error.password && join_pw.length !== 0 }"
                  v-model="join_pw"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
               />
               <div class="error-text" v-if="error.password"><v-icon> mdi-alert-decagram </v-icon> {{ error.password }}</div>

               <input
                  type="password"
                  class="join-retry"
                  v-bind:class="{ error: error.password2, complete: !error.password2 && join_pw2.length !== 0 }"
                  v-model="join_pw2"
                  id="password"
                  placeholder="비밀번호를 다시 입력하세요."
               />
               <div class="error-text" v-if="error.password2"><v-icon> mdi-alert-decagram </v-icon> {{ error.password2 }}</div>
            </div>
         </div>
         <div class="feature-wrapper">
            <v-btn id="submit" class="join" color="success" @click="doJoin">회원가입</v-btn>
         </div>
         <br />
         <div class="btn-back">
            <router-link to="Login">뒤로가기</router-link>
         </div>
      </div>
   </div>
</template>
<script>
// import PV from 'password-validator';
import * as EmailValidator from 'email-validator';
import { mapActions } from 'vuex';
import { registerUser } from '@/api/user.js';
import router from '../../router/router';

export default {
   data() {
      return {
         join_email: '',
         join_pw: '',
         join_pw2: '',
         join_nick: '',
         error: {
            email: false,
            password: false,
            password2: false,
         },
      };
   },
   methods: {
      ...mapActions(['doLogin']),

      checkForm() {
         if (this.join_email.length > 0 && !EmailValidator.validate(this.join_email)) {
            this.error.email = '이메일 형식이 아닙니다.';
         } else this.error.email = false; //조건 충족시, 화면 다시 없애도록

         if (this.join_pw.length > 0 && !this.checkPW(this.join_pw)) {
            this.error.password = '영문과 숫자를 섞고, 6-20글자로 해주세요';
         } else this.error.password = false; //조건 충족시, 화면 다시 없애도록
      },

      checkFormPW() {
         if (this.join_pw.length > 0 && this.join_pw !== this.join_pw2) {
            this.error.password2 = '일치하지 않아요. 다시 확인해주세요';
         } else this.error.password2 = false;
      },

      checkPW(str) {
         // 영문, 숫자 혼합 6글자 이내
         var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
         // test()
         if (reg_pwd.test(str) === true) {
            return true;
         } else return false;
      },

      doJoin() {
         if (this.join_email !== '' && this.join_pw !== '' && this.join_pw2 !== '') {
            if (!this.error.email && !this.error.password && !this.error.password2) {
               // 서버에 회원가입 요청하기
               registerUser(
                  {
                     email: this.join_email,
                     password: this.join_pw,
                     nickname: this.join_nick,
                  },
                  () => {
                     // 회원가입에 성공한 경우
                     alert('회원가입이 되었습니다!');
                     router.push({ name: 'JoinSuccess' });
                  },
                  (error) => {
                     // 이미 가입되어 있는 경우
                     if (error.response.status == 409) {
                        alert('이미 가입되어 있는 이메일입니다');
                     }
                  }
               );
            } else {
               alert('입력 정보를 다시 확인해주세요.');
            }
         } else {
            alert('모든 항목을 채워주세요');
         }
      },
   },

   watch: {
      join_email: function() {
         this.checkForm();
      },
      join_pw: function() {
         this.checkForm();
      },
      join_pw2: function() {
         this.checkFormPW();
      },
   },
};
</script>
<style lang="scss" scoped>
@import 'src/css/login';
</style>
