<template>
   <div class="sm-container">
      <div class="user-wrapper">
         <img class="corner" src="@/assets/img/characters/corner_wk.png" alt="" />
         <div class="eye1"></div>
         <div class="eye2"></div>
         <div class="user-real-wrapper">
            <div class="first">
               <span>welcome,</span>
               <span>{{ userInfo.nickname }}</span> <span class="admin-badge" v-if="userInfo.status == 2">관리자</span>
            </div>
            <div class="second">
               <span class="mypage" @click="goRouter('mypage')">내 정보 보기</span>
               <span class="logout" @click="$store.dispatch('doLogout')">로그아웃</span>
            </div>
            <span class="admin" v-if="userInfo.status == 2" @click="goRouter('/admin')">관리자 페이지</span>
         </div>
      </div>
      <div class="link-wrapper">
         <div class="img-btn" @click="goRouter('/main')"><img src="@/assets/img/characters/banner-cmmu.png" alt="" /> <span class="nf">노리공간</span></div>
         <div class="img-btn" @click="goRouter('/cmmu')"><img src="@/assets/img/characters/banner-nori.png" alt="" /> <span class="nf">소통공간</span></div>
      </div>
      <div class="ad-wrapper">
         <div class="copyright">
            본 사이트의 저작권은 SSAFY 4기 High5ive팀에게 있습니다.
            <br />Copyright © High5ive All Rights Reserved.
            <br />
            <p style="margin-top:6px; font-weight:600">김한솔 김수연 김수진 민태성 이주상</p>
         </div>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
   computed: {
      ...mapState(['userInfo']),
   },
   methods: {
      goRouter: function(path) {
         var now = document.location.pathname;

         // 마이페이지로 들어온 경우
         if (path == 'mypage') {
            // 본인이 본인을 조회한 경우 -> 새로고침?
            if (now.split('/')[2] == this.userInfo.userId) {
               // 원래 새로고침 해야하는데, 새로고침하면 시청분석이 날라가서 캐치로 받음
               this.$router.push({ name: 'mypage', params: { userId: this.userInfo.userId } }).catch(() => {});
            } else {
               // 그 외엔 다시 내 페이지로 이동
               this.$router.push({ name: 'mypage', params: { userId: this.userInfo.userId } });
            }
            return; //끝내기
         }

         if (path !== now) {
            // 현재 페이지랑 가려는 곳이랑 다를 때 -> 정상 이동
            this.$router.push(path);
         } else {
            // 현재 페이지랑 가려는 곳이랑 같을 때 -> 새로고침?
            this.$router.go(this.$router.currentRoute);
         }
      },
   },
};
</script>
<style lang="scss" scoped>
@import 'src/css/vars';

.sm-container {
   position: relative;
   height: 100%;
   background-color: transparent !important;

   .user-wrapper {
      position: relative;
      text-align: center;
      margin-bottom: 50px;
      padding-top: 56px;
      width: 100%;

      // 코너에 들어가는 캐릭터
      .corner {
         position: absolute;
         top: 0;
         left: 0;
         width: 80px;
         z-index: -10;
      }

      $eye_x: 58px;
      $eye_y: 46px;

      @keyframes eye-move {
         from {
            transform: translate(2px, 0px);
            // opacity: 0;
         }
         to {
            transform: translate(-8px, 2px);
            // opacity: 1;
         }
      }

      .eye1,
      .eye2 {
         position: absolute;
         left: $eye_x;
         top: $eye_y;
         width: 6px;
         height: 8px;
         border-radius: 20px;
         background-color: rgb(38, 38, 38);

         animation: eye-move 4s 1s infinite alternate;
      }

      .eye2 {
         left: calc(#{$eye_x} - 14px);
         top: calc(#{$eye_y} + 1px);
      }

      .user-real-wrapper {
         width: 280px;
         margin: 0 auto;

         .first {
            text-align: left;
            font-size: 20px;
            margin-bottom: 0px;
            font-weight: 600;

            padding: 0px 20px;

            .admin-badge {
               background-color: rgb(206, 21, 21);
               font-size: 4pt;
               font-weight: 600;
               color: white;
               padding: 2px 6px;
               border-radius: 4px;
               margin-left: 2px;
            }

            span:nth-child(1) {
               display: block;
               color: rgb(118, 118, 118);
               padding-bottom: 0px;
               font-size: 16px;
            }
            span:nth-child(2) {
               color: rgb(41, 41, 41);
               font-size: 30px;
            }
         }

         .second {
            display: flex;
            margin-top: 10px;
            margin-left: 24px;

            .mypage {
               cursor: pointer;
               display: inline;
               text-decoration: underline;
               font-size: 11px;
               margin-right: 12px;
            }

            .logout {
               cursor: pointer;
               display: inline;
               text-decoration: underline;
               font-size: 11px;
               color: grey;
            }
         }

         .admin {
            cursor: pointer;
            display: flex;
            margin-top: 4px;
            margin-left: 24px;

            text-decoration: underline;
            font-size: 11px;
            color: rgb(228, 31, 31);
         }
      }
   }

   .link-wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;

      .img-btn {
         cursor: pointer;

         width: 280px;
         height: 180px;
         // border: 1px solid rgb(208, 208, 208);
         text-align: center;
         margin: 10px auto;
         border-radius: 20px;
         border: 1px solid rgb(228, 228, 228);

         &:nth-child(1) {
            background-color: rgb(234, 246, 255);
            &:hover {
               background-color: rgb(207, 228, 244);
            }
         }
         &:nth-child(2) {
            background-color: rgb(255, 248, 216);
            &:hover {
               background-color: rgb(247, 237, 194);
            }
         }

         span {
            display: block;
            position: relative;
            top: -120px;

            color: rgb(53, 53, 53);
            font-size: 25pt !important;
            font-weight: 600;
         }

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: -20px 0px;
            border-radius: 20px;
         }
      }
   }

   .ad-wrapper {
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;

      .ad {
         width: 70%;
         height: 70px;
         border: 1px solid rgb(208, 208, 208);
         margin: 10px auto;

         text-align: center;
         color: rgb(208, 208, 208);
      }

      .copyright {
         width: 70%;
         margin: 0px auto;
         font-size: 8pt !important;
         color: gray;
      }
   }
}
</style>
