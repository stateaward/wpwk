<template>
   <div class="lj-container">
      <div class="wrapper">
         <div class="title">
            <img src="@/assets/wpwk_logo.png" />
         </div>
         <div class="input-wrapper">
            <div class="input-email">
               <label for="email">이메일 </label>
               <input
                  type="text"
                  v-bind:class="{
                     error: error.email,
                     complete: !error.email && email.length !== 0,
                  }"
                  v-model="email"
                  id="email"
                  placeholder="이메일을 입력하세요."
                  @keyup.enter="doLogin"
               />
               <div class="error-text" v-if="error.email">
                  <v-icon>
                     mdi-alert-decagram
                  </v-icon>
                  {{ error.email }}
               </div>
            </div>
            <div class="input-password">
               <label for="password">비밀번호 </label>
               <input
                  type="password"
                  v-bind:class="{
                     error: error.password,
                     complete: !error.password && password.length !== 0,
                  }"
                  v-model="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요."
                  @keyup.enter="doLogin"
               />
               <div class="error-text" v-if="error.password"><v-icon> mdi-alert-decagram </v-icon> {{ error.password }}</div>
            </div>
         </div>

         <div class="feature-wrapper">
            <span class="find_pw" @click="clickModal">비밀번호를 잊었나요?</span>
            <br />
            <v-btn id="submit" color="success" @click="doLogin">로그인</v-btn>
            <p style="font-size: 8px;">
               회원이 아니라면,
               <router-link to="Join">5초 회원가입</router-link>
            </p>
         </div>
         <div class="social-wrapper">
            <!-- 네이버 아이디로 로그인 버튼 노출 영역 -->
            <div class="btn-social-group">
               <naver-login class="btn-social"></naver-login>
               <kakao-login class="btn-social"></kakao-login>
            </div>
         </div>

         <!-- 비밀번호 찾기 모달 -->
         <v-dialog v-model="find_modal" persistent max-width="400">
            <v-card>
               <v-card-title class="headline">
                  비밀번호를 초기화합니다.
               </v-card-title>
               <v-card-text>
                  <v-text-field label="Email*" required v-model="email" id="email" placeholder="이메일을 입력하세요."></v-text-field>
                  <div class="error-text" v-if="error.email" style="margin-top:0px">
                     <v-icon>
                        mdi-alert-decagram
                     </v-icon>
                     {{ error.email }}
                  </div>
                  <br />
                  비밀번호 재설정 메일을 발송합니다.
               </v-card-text>

               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="find_modal = false">
                     취소
                  </v-btn>
                  <v-btn color="red darken-1" text @click="find_modal = false">
                     초기화
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </div>
   </div>
</template>
<script>
// import PV from 'password-validator';
import * as EmailValidator from 'email-validator';
import { mapActions } from 'vuex';
import { login } from '@/api/user.js';
import NaverLogin from '@/components/user/NaverLogin.vue';
import KakaoLogin from '@/components/user/KakaoLogin.vue';

export default {
   components: {
      NaverLogin,
      KakaoLogin,
   },
   data() {
      return {
         email: '',
         password: '',
         nickname: '',
         error: {
            nickname: false,
            email: false,
            password: false,
         },
         isSubmit: false,

         find_modal: false,
      };
   },
   methods: {
      ...mapActions(['doLogin']),

      checkForm() {
         if (this.nickname.length <= 0) {
            this.error.nickname = '사용할 닉네임을 설정해주세요';
         } else {
            this.error.nickname = false;
         }

         if (this.email.length > 0 && !EmailValidator.validate(this.email)) {
            this.error.email = '이메일 형식이 아닙니다.';
         } else this.error.email = false; //조건 충족시, 화면 다시 없애도록

         if (this.password.length > 0 && !this.checkPW(this.password)) {
            this.error.password = '영문, 숫자 혼합 6-20을 다시 확인.';
         } else this.error.password = false; //조건 충족시, 화면 다시 없애도록
      },

      clickModal() {
         this.find_modal = true;
      },

      checkPW(str) {
         // 영문, 숫자 혼합 6글자 이내
         var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
         // test()
         if (reg_pwd.test(str) === true) {
            return true;
         } else return false;
      },

      doLogin() {
         // 로그인 요청처리 구현
         localStorage.setItem('accessToken', ''); // 기존 토큰 지우기
         let user = {
            email: this.email,
            password: this.password,
         };
         login(
            user,
            (response) => {
               if (response.status == 201) {
                  let token = response.data['accessToken'];
                  localStorage.setItem('accessToken', token); // 토큰 로컬스토리지에 저장

                  this.$store.dispatch('getUserInfo'); // 토큰을 이용한 유저정보 가져오기
                  this.$router.push('/main');
               } else {
                  alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                  this.isLoginError = true;
               }
            },
            (error) => {
               console.error(error);
            }
         );
      },
   },
   watch: {
      email: function() {
         this.checkForm();
      },
      password: function() {
         this.checkForm();
      },
   },
};
</script>
<style lang="scss" scoped>
@import 'src/css/login';
</style>
