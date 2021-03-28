<template>
   <v-app id="inspire">
      <!-- side menu -->
      <v-navigation-drawer v-model="drawer" app disable-resize-watcher style="z-index: 1000">
         <router-view name="side" class="sidemenu" />
      </v-navigation-drawer>

      <v-app-bar app class="root-header" :class="{ openSide: drawer }">
         <div class="btn-menu" v-if="!isDesk" @click="drawer = !drawer">
            <v-icon>mdi-hamburger</v-icon>
         </div>
         <v-toolbar-title
            ><router-link to="/main"><img src="@/assets/wpwk_logo.png"/></router-link
         ></v-toolbar-title>
         <div class="btn-notification" @click="notificationShow">
            <v-icon>mdi-bell</v-icon>
         </div>
         <!-- <div class="notificationNum"></div> -->
         <div v-if="notifications.length > 0" class="notificationNum"></div>
         <notification v-if="showNotification" v-click-outside="onClickOutsideNotification"></notification>

         <div class="btn-search" @click="showSearch = !showSearch">
            <i class="fas fa-search"></i>
         </div>
         <search v-if="showSearch" @searchShow="searchShow"></search>
      </v-app-bar>

      <v-main id="main-wrapper" :class="{ openSide: drawer }">
         <!-- {{ width }}, {{ height }} -->
         <router-view />
      </v-main>
   </v-app>
</template>

<script>
import Search from '@/components/main/Search.vue';
import Notification from '@/components/main/Notification.vue';
import { confirmNotification, getNotification } from '@/api/user.js';
import { mapState } from 'vuex';
import vClickOutside from 'v-click-outside';

export default {
   name: 'App',
   components: { Search, Notification },
   directives: {
      clickOutside: vClickOutside.directive,
   },
   data: () => ({
      drawer: false,
      showSearch: false,
      showNotification: false,
      notifications: [],
      isDesk: false,

      width: 0,
      height: 0,
   }),
   mounted() {
      window.addEventListener('load', this.handleResize);
      window.addEventListener('resize', this.handleResize);
   },
   beforeDestroy() {
      window.addEventListener('load', this.handleResize);
      window.removeEventListener('resize', this.handleResize);
   },
   updated() {
      window.addEventListener('load', this.handleResize);
   },
   methods: {
      getNotifications() {
         getNotification(
            (res) => {
               this.notifications = res.data;
            },
            (err) => {
               console.log(err);
            }
         );
      },
      notificationShow: function() {
         if (this.showNotification && this.notifications) {
            confirmNotification(
               this.userInfo.userId,
               () => {
                  this.showNotification = !this.showNotification;
               },
               (fail) => {
                  console.log(fail);
               }
            );
         } else {
            this.showNotification = !this.showNotification;
         }
      },
      onClickOutsideNotification() {
         this.showNotification = false;
      },
      searchShow(search) {
         this.showSearch = search;
      },
      goMain: function() {
         this.$router.push('/main');
      },
      handleResize() {
         // $breakpoint-mobile: 375px;
         // $breakpoint-tablet: 600px;
         // $breakpoint-desktop: 1264px;

         this.width = window.innerWidth;

         // 1264px 이상일 경우, 햄버거 버튼 삭제 및 사이드 메뉴 고정
         if (this.width >= 1264) {
            this.isDesk = true;
            this.drawer = true;
         } else {
            this.isDesk = false; //햄버거 버튼 보일지 말지
         }
      },
   },
   computed: {
      ...mapState(['userInfo']),
   },
   watch: {
      showNotification: function() {
         if (this.userInfo) {
            this.getNotifications();
         }
      },
      userInfo: function() {
         if (this.userInfo) {
            this.getNotifications();
         }
      },
   },
   created: function() {
      if (this.userInfo) {
         this.getNotifications();
      }
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

#inspire {
   // position: relative !important;
   // background-color: blue;

   /* 스크롤바 전체 */
   ::-webkit-scrollbar {
      width: 12px;
   } /* 스크롤 바 */

   /* 스크롤 막대 여백(남는거) */
   ::-webkit-scrollbar-track {
      background-color: transparent;
   } /* 스크롤 바 밑의 배경 */

   /* 스크롤 막대 */
   ::-webkit-scrollbar-thumb {
      background: #ffbb0f38;
      border-radius: 10px;

      /* 스크롤바와 남는 여백 사이에 공백을 주고 싶을 때 */
      background-clip: padding-box;
      border: 1px solid transparent;
   } /* 실질적 스크롤 바 */

   ::-webkit-scrollbar-thumb:hover {
      background: #ffbb0f4b;
   } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */

   ::-webkit-scrollbar-thumb:active {
      background: #ffbb0f52;
   } /* 실질적 스크롤 바를 클릭할 때 */

   ::-webkit-scrollbar-button {
      display: none;
   } /* 스크롤 바 상 하단 버튼 */

   font-family: 'Poor Story' sans-serif !important;

   padding-right: 0px !important;

   .v-toolbar__title {
      margin: 0 auto;
      padding-left: 0px !important;
      padding-right: 30px !important;
   }

   .root-header {
      background-color: rgb(250, 250, 250) !important;
      z-index: 200;

      img {
         height: 30px;
      }

      .btn-notification {
         height: 48px;
         width: 48px;
         position: absolute;
         right: 50px;
      }

      .notificationNum {
         width: 10px;
         background-color: red;
         height: 10px;
         line-height: 10px;
         border-radius: 15px;

         position: absolute;
         right: 60px;
         margin: 15px 0 0 30px;
      }

      .btn-search {
         height: 48px;
         width: 48px;
         /* margin-right: -12px; */
         /* background-color: red; */

         position: absolute;
         /* top: -10px; */
         right: 12px;
      }
   }

   .btn-menu i {
      cursor: pointer;
      color: #89ba17;
   }

   .btn-notification i {
      cursor: pointer;
      height: 24px;
      width: 24px;
      color: rgba(255, 180, 0);
      font-size: 23px;

      margin: 10px 0 0 10px;
   }

   .btn-search i {
      cursor: pointer;
      height: 24px;
      width: 24px;
      color: rgba(255, 180, 0);
      font-size: 18px;

      margin: 13px 0 0 13px;
   }

   // 사이드 메뉴
   .v-navigation-drawer.v-navigation-drawer--fixed {
      width: 400px !important;

      //각 디바이스 크기별 동작
      @include mobile {
         width: 70% !important;
         min-width: 300px !important;
      }

      @include tablet {
         // width: 50% !important;
         max-width: 420px;
      }

      @include desktop {
         width: 400px !important;
      }

      .v-navigation-drawer__content {
         .sidemenu {
            overflow: hidden;
         }
      }
   }

   // @responsive 데스크탑일 때, 본문 좌우 여백으로 사이즈 조절
   #main-wrapper {
      position: relative;

      .v-main__wrap .cv-container,
      .v-main__wrap .cc-container,
      .v-main__wrap .cu-container {
         @include desktop {
            padding: 0 20% !important;
         }
      }

      // 반응형에 해당하는 푸터들도 적용
      .cl-footer,
      .ev-footer,
      .af-footer,
      .comment-modal {
         @include desktop {
            padding: 0 20% !important;
         }
      }
   }

   // @responsive 댓글창 모달 부분 absolute로 변경
   .v-dialog__content--active,
   .v-dialog__content,
   .cc-footer,
   .cc-dialog-footer {
      @include desktop {
         margin-left: 400px;
         width: calc(100% - 400px);
         // padding: 0 20% !important;
      }

      .v-dialog--fullscreen {
         overflow: hidden;
         position: absolute !important;
      }
   }
}

// @responsive 사이드 메뉴가 켜졌을 때, v-main, root-header를 우측으로 밀어줌
.openSide {
   // border: 2px solid red !important;

   @include desktop {
      margin-left: 140px !important;
   }
}

.search-container {
   @keyframes slide-in-top {
      0% {
         transform: translateY(-50px);
         opacity: 0;
      }
      100% {
         transform: translateY(0);
         opacity: 1;
      }
   }

   animation: slide-in-top 0.5s;
   // background-color: red !important;
}

.disapper {
   @keyframes slide-out-top {
      0% {
         transform: translateY();
         opacity: 1;
      }
      100% {
         transform: translateY(-50px);
         opacity: 0;
      }
   }
   animation: slide-out-top 1s;
   animation-fill-mode: forwards;
}
</style>
