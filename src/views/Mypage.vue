<template>
   <div class="mp-container d-flex flex-column align-center">
      <div class="top-wrapper">
         <div class="user-info-wrapper">
            <img src="@/assets/img/characters/mypage_bg3.png" alt="" />
            <div class="in-bubble">
               <!-- 나중에는 페이지 들어오기전에 유저정보(id, 별명, 작성글 목록 등) 요청 후 응담 내용으로 보여주기-->
               <span class="username nf nf-600">{{ userNickname }}</span>
               <!-- 팔로우 버튼 (타유저프로필일때) -->
               <!-- 언팔로우 버튼 (타유저 구독한 상태일때) -->
            </div>
            <div v-if="$route.params.userId === userInfo.userId" class="user-action-wrapper">
               <a class="user-action" href="#" @click="dialog = true">비밀번호 변경</a>
               <a class="user-action" href="#" @click="dialog2 = true">회원탈퇴</a>
            </div>
            <div class="mp-top-right">
               <div class="user-info">
                  <div class="user-info-item" @click="dialogFollower = true">
                     <span class="nf nf-600 f-number">{{ followers }}</span>
                     <span class="nf nf-600 f-text">팔로워</span>
                  </div>
                  <div class="user-info-item" @click="dialogFollowing = true">
                     <span class="nf nf-600 f-number">{{ followings }}</span>
                     <span class="nf nf-600 f-text">팔로잉</span>
                  </div>
               </div>
            </div>
            <div v-if="$route.params.userId !== userInfo.userId" class="follow-buttons">
               <button @click="followSomeone" v-if="isfollowed" class="infos-button unfollow-button">
                  <v-icon>
                     mdi-account-check
                  </v-icon>
                  <span>
                     구독 취소
                  </span>
               </button>
               <button @click="followSomeone" v-if="!isfollowed" class="infos-button follow-button">
                  <v-icon>
                     mdi-account-plus
                  </v-icon>
                  구독
               </button>
            </div>
         </div>
      </div>
      <div class="middle d-flex justify-space-around">
         <div class="asset-navi" :class="{ 'selected-navi': showValue === 1 }" @click="switchValue(1)">
            <span class="as-top">작성 글</span>
            <span v-if="showValue == 1" class="as-bottom">{{ personsAssets.length }}</span>
         </div>
         <div class="divider"></div>
         <div class="asset-navi" :class="{ 'selected-navi': showValue === 2 }" @click="switchValue(2)">
            <span class="as-top">댓글단 글</span>
            <span v-if="showValue == 2" class="as-bottom">{{ personsAssets.length }}</span>
         </div>
         <div class="divider"></div>
         <div class="asset-navi" :class="{ 'selected-navi': showValue === 3 }" @click="switchValue(3)">
            <span class="as-top">작성 노리</span>
            <span v-if="showValue == 3" class="as-bottom">{{ personsAssetsWithPhoto.length }}</span>
         </div>
         <div class="divider"></div>
         <div class="asset-navi" :class="{ 'selected-navi': showValue === 4 }" @click="switchValue(4)">
            <span class="as-top">관심 노리</span>
            <span v-if="showValue == 4" class="as-bottom">{{ personsAssetsWithPhoto.length }}</span>
         </div>
         <div class="divider" v-if="$route.params.userId === userInfo.userId"></div>
         <div v-if="$route.params.userId === userInfo.userId" class="asset-navi" :class="{ 'selected-navi': showValue === 5 }" @click="showValue = 5">
            <span class="as-top">시청 분석</span>
            <v-icon v-if="showValue == 5" class="as-bottom">mdi-television-classic</v-icon>
         </div>
      </div>
      <div :class="{ bottom: showValue == 5 || ((showValue === 1 || showValue === 2) && personsAssets.length > 0) || ((showValue === 3 || showValue === 4) && personsAssetsWithPhoto.length > 0) }">
         <persons-assets v-if="showValue === 1 || showValue === 2" :showValue="showValue" :personsAssets="personsAssets" />
         <persons-assets-with-photo v-if="showValue === 3 || showValue === 4" :showValue="showValue" :personsAssetsWithPhoto="personsAssetsWithPhoto" />
         <chart v-if="showValue == 5" />
      </div>
      <img
         class="mp-default-img"
         v-if="(personsAssets.length == 0 && (showValue == 1 || showValue == 2)) || (personsAssetsWithPhoto.length == 0 && (showValue == 3 || showValue == 4)) || showValue == 0"
         src="@/assets/img/characters/mypage-box.png"
         alt=""
      />
      <!-- 팔로잉리스트모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialogFollowing" persistent max-width="330px">
               <v-card id="follow-modal" class="seccesion-modal">
                  <v-card-title class="nf"> {{ userNickname }}님의 팔로잉 </v-card-title>
                  <div class="followList">
                     <div class="followListitems" v-for="(following, idx) in followingList" :key="idx" @click="toPersonsPage(following.id)">
                        {{ following.nickname }}
                        <!-- <div class="follow-list-item" :class="{'for-stripe': idx / 2 !== 0}">
                        {{ following.nickname }}
                     </div> -->
                     </div>
                  </div>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="error" text @click="dialogFollowing = false"> 닫기 </v-btn>
                  </v-card-actions>
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 팔로워리스트모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialogFollower" persistent max-width="330px">
               <v-card id="follow-modal" class="seccesion-modal">
                  <v-card-title class="nf"> {{ userNickname }}님의 팔로워 </v-card-title>
                  <div class="followList">
                     <div class="followListitems" v-for="(follower, idx) in followedList" :key="idx">
                        <div @click="toPersonsPage(follower.id)" class="follow-list-item" :class="{ 'for-stripe': idx / 2 !== 0 }">
                           {{ follower.nickname }}
                        </div>
                     </div>
                  </div>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="error" text @click="dialogFollower = false"> 닫기 </v-btn>
                  </v-card-actions>
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 회원탈퇴 모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="330px">
               <v-card id="seccesion-modal" class="seccesion-modal">
                  <v-card-title class="nf">
                     정말로 탈퇴하시겠습니까? 😭
                  </v-card-title>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="green darken-1" text @click="dialog2 = false">
                        취소
                     </v-btn>
                     <v-btn color="error" text @click="secession"> 탈퇴하기 </v-btn>
                  </v-card-actions>
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 비밀번호 변경 모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="330px">
               <v-card id="report-modal" class="pwd-modal">
                  <v-card-title class="nf"> 비밀번호 변경하기 </v-card-title>
                  <!-- 나중에 input으로 바꿀 수 있음 일단 기본적인 내용만 -->
                  <div class="input-wrapper">
                     <v-text-field
                        label="현재 비밀번호"
                        v-model="curPwd"
                        :rules="[rules.required]"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        counter
                        @click:append="show3 = !show3"
                     ></v-text-field>
                     <v-text-field
                        label="새 비밀번호"
                        v-model="newPwd1"
                        :rules="[rules.min, rules.vali]"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        hint="영문과 숫자를 포함해 6-20자 여야 합니다"
                        counter
                        @click:append="show1 = !show1"
                     ></v-text-field>
                     <v-text-field
                        label="새 비밀번호"
                        v-model="newPwd2"
                        :rules="[rules.correspond]"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        hint="새 비밀번호를 다시 입력해 주십시오."
                        counter
                        @click:append="show2 = !show2"
                     ></v-text-field>
                  </div>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="error" text @click="dialog = false"> 취소 </v-btn>
                     <v-btn color="green darken-1" text @click="changePassword"> 변경하기 </v-btn>
                  </v-card-actions>
               </v-card>
               <img class="modal-right-hand" src="@/assets/img/characters/modal_right_hand.png" />
               <img class="modal-left-hand" src="@/assets/img/characters/modal_left_hand.png" />
               <img class="modal-foot" src="@/assets/img/characters/modal_foot.png" />
            </v-dialog>
         </v-row>
      </div>
   </div>
</template>
<script>
import { deleteUser } from '@/api/user.js';
import { changePwd } from '@/api/user.js';
import { getUserInfo } from '@/api/user.js';
import { follow } from '@/api/user.js';
import { getFollowList } from '@/api/user.js';
import { getFollowingList } from '@/api/user.js';
import { findMyContents } from '@/api/myPage.js';
import { findMyBoard } from '@/api/myPage.js';
import { findContentsByFavorite } from '@/api/myPage.js';
import { findBoardsByComments } from '@/api/myPage.js';
import { mapState } from 'vuex';
import Chart from '@/components/mypage/Chart.vue';
import personsAssets from '@/components/mypage/personsAssets.vue';
import personsAssetsWithPhoto from '@/components/mypage/personsAssetsWithPhoto.vue';

var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
export default {
   name: 'Mypage',
   components: {
      Chart,
      personsAssets,
      personsAssetsWithPhoto,
   },
   data: function() {
      return {
         //modal control(비밀번호 변경)
         userId: 0,
         dialog: false,
         dialog2: false,
         dialogFollower: false,
         dialogFollowing: false,
         show1: false,
         show2: false,
         show3: false,
         followers: 0,
         followings: 0,
         userNickname: '',
         isfollowed: '',
         followedList: [],
         followingList: [],
         curPwd: '',
         newPwd1: '',
         newPwd2: '',
         error: {
            newPwd1: false,
            newPwd2: false,
         },
         rules: {
            required: (value) => !!value || '필수 값입니다.',
            vali: (v) => reg_pwd.test(v) || '영문과 숫자를 포함해 6-20자 여야 합니다',
            min: (v) => v.length >= 6 || '비밀번호가 너무 짧습니다.',
            correspond: (v) => v === this.newPwd1 || '비밀번호가 일치하지 않습니다.',
         },
         // showValue(1 작성한글, 2 댓글단 글, 3 작성 노리, 4 관심 노리, 5 시청분석)
         showValue: 0,
         personsAssets: [], // 글(사진 없는)
         personsAssetsWithPhoto: [], //노리(사진 있는)
      };
   },
   created() {
      this.getUserInfo();
      this.isMypage();
   },
   methods: {
      isMypage: function() {
         if (this.$route.params.userId === this.userInfo.userId) {
            this.showValue = 5;
            return true
         } else {
            this.showValue = 0;
            return false
         }
      },
      getUserInfo: function() {
         const targetUser = {
            targetId: this.$route.params.userId,
         };
         const targetUserFollowed = {
            userId: this.$route.params.userId,
            option: 'followed',
         };
         const targetUserFollowing = {
            userId: this.$route.params.userId,
            option: 'following',
         };
         getUserInfo(
            targetUser,
            (success) => {
               this.userNickname = success.data.findUser.nickname;
               this.isfollowed = success.data.isFollowed;
               this.followers = success.data.findUser.followed;
               this.followings = success.data.findUser.following;
               this.userId = success.data.findUser.id;
               getFollowList(
                  targetUserFollowed,
                  (success) => {
                     this.followedList = success.data;
                     getFollowingList(targetUserFollowing, (success) => {
                        this.followingList = success.data;
                        this.isMypage()
                     });
                  },
                  (fail) => {
                     console.log(fail);
                  }
               );
            },
            (fail) => {
               console.log(fail);
            }
         );
      },
      //팔로우 요청
      followSomeone: function() {
         const targetUser = {
            targetId: this.$route.params.userId,
         };
         const targetUserFollowed = {
            userId: this.$route.params.userId,
            option: 'followed',
         };
         if (Number(targetUser.targetId) !== this.userInfo.userId) {
            follow(
               targetUser,
               () => {
                  this.isfollowed = !this.isfollowed;
                  if (this.isfollowed == false) {
                     this.followers--;
                  } else {
                     this.followers++;
                  }
                  getFollowList(
                     targetUserFollowed,
                     (success) => {
                        this.followedList = success.data;
                     },
                     (fail) => {
                        console.log(fail);
                     }
                  );
               },
               (error) => {
                  console.log(error);
               }
            );
         }
      },
      //비밀번호 변경 validation
      checkPW(str) {
         // 영문, 숫자 혼합 6글자 이내
         var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
         // test()
         if (reg_pwd.test(str) === true && str.length < 6) {
            return true;
         } else return false;
      },
      // 비밀번호 변경요청
      changePassword: function() {
         if (this.curPwd.length > 0 && !this.checkPW(this.newPwd1) && this.newPwd1 === this.newPwd2) {
            const passwords = {
               curPassword: this.curPwd,
               newPassword: this.newPwd1,
            };
            changePwd(
               passwords,
               (res) => {
                  // 기존 비밀번호가 일치하지 않는 경우
                  if(res.status === 204) {
                     alert('현재 비밀번호가 일치하지 않습니다.');
                  }                  
                  if(res.status === 200) {
                     alert('비밀번호 변경이 완료되었습니다.');
                     this.$store.dispatch('doLogout')
                     this.$router.push('/');
                  }
                  this.curPwd = '';
                  this.newPwd1 = '';
                  this.newPwd2 = '';
                  this.dialog = false;
               },
               (error) => {
                  console.log(error);
                  alert('비밀번호 변경에 실패했습니다.');

                  this.dialog = false;
               }
            );
         }
      },
      // showValue값에 따라 보여주는 값 달라짐
      switchValue: function(num) {
         var page = 1;
         if (num == 1) {
            findMyBoard(
               this.userId,
               page,
               (success) => {
                  this.showValue = 1;
                  this.personsAssets = success.data;
               },
               (fail) => {
                  console.log(fail);
               }
            );
         } else if (num == 2) {
            findBoardsByComments(
               this.userId,
               page,
               (success) => {
                  this.personsAssets = success.data;
                  this.showValue = 2;
               },
               (fail) => {
                  console.log(fail);
               }
            );
         } else if (num == 3) {
            findMyContents(
               this.userId,
               page,
               (success) => {
                  this.personsAssetsWithPhoto = success.data;
                  this.showValue = 3;
               },
               (fail) => {
                  console.log(fail);
               }
            );
         } else {
            findContentsByFavorite(
               this.userId,
               page,
               (success) => {
                  this.personsAssetsWithPhoto = success.data;
                  this.showValue = 4;
               },
               (fail) => {
                  console.log(fail);
               }
            );
         }
      },
      //회원 탈퇴 요청
      secession: function() {
         deleteUser(
            () => {
               // 로그아웃 추가
               alert("회원탈퇴가 완료되었습니다")
               this.$store.dispatch('doLogout')
               this.$router.push('/');
            },
            (error) => {
               console.log(error);
            }
         );
      },
      toPersonsPage: function(userId) {
         this.$router.push({ name: 'mypage', params: { userId: userId } }).catch();
         this.dialogFollower = false;
         this.dialogFollowing = false;
      },
   },
   computed: {
      ...mapState(['userInfo']),
   },
   watch: {
      $route() {
         this.getUserInfo();
         this.isMypage();
      },
   },
};
</script>
<style lang="scss">
@import '@/css/compo/modal.scss';
@import 'src/css/common.scss';

.mp-container {
   // max-width: 500px;
   background-color: #fffedd;

   // overflow: hidden !important;
   position: relative;
   height: 100%;
   //   border: red dashed 1px;
   width: 100%;
   .mp-default-img {
      margin-top: 100px;
      width: 200px;
   }
   .top-wrapper {
      height: 20%;
      position: relative;
      height: 150px;
      .user-info-wrapper {
         img {
            position: absolute;
            left: -180px;
            top: 15px;
            width: 350px;
            height: 150px;
            // height: 150px;
            transform: rotateY(180deg);
         }
         .in-bubble {
            white-space: nowrap;
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            left: -130px;
            top: 50px;
            .username {
               display: inlnine;
               font-size: 22pt;
               font-weight: 600;
            }
         }
         .user-action-wrapper {
            top: 100px;
            left: -160px;
            width: 150px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 9pt;
            .user-action {
               color: gray;
               margin: 0 5px;
            }
         }
         .mp-top-right {
            // background-color: #f2f1f2;
            // border-left: lightgray 1px solid;
            // border-radius: 20px;
            padding: 10px;
            position: absolute;
            left: -10px;
            width: 140px;
            top: -10px;
            display: flex;
            height: 120px;
            align-items: center;
            justify-content: center;
            .user-info {
               width: 100%;
               display: flex;
               justify-content: space-around;
               .user-info-item {
                  cursor: pointer;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  .f-number {
                     font-size: 15pt;
                  }
                  .f-text {
                     font-size: 9pt;
                  }
               }
            }
         }
         .follow-buttons {
            position: absolute;
            top: 95px;
            left: -138px;
            .follow-button {
               $color1: rgb(30, 111, 14);
               border: 2px solid $color1;
               color: $color1;
               i {
                  color: $color1;
               }
            }
            .unfollow-button {
               $color2: rgb(96, 96, 96);
               border: 2px solid $color2;
               color: $color2;
               i {
                  color: $color2;
               }
            }
            .infos-button {
               font-size: 9pt;
               border-radius: 15px;
               padding: 3px 0px;
               width: 85px;
               i {
                  font-size: 14pt;
               }
               &:focus {
                  outline: none;
               }
            }
         }
      }
   }
   .middle {
      border: rgb(52, 52, 52) 2.5px solid;
      background-color: white;
      margin-top: 30px;
      height: 80px;
      width: 90%;
      display: flex;
      align-items: center;
      padding: 10px 5px;
      // box-shadow: 0 4px 4px lightgray;
      border-radius: 10px;
      .divider {
         width: 0px;
         border-left: lightgray 1px solid;
         height: 35px;
      }

      .asset-navi {
         cursor: pointer;

         .as-top {
            font-size: 11pt;
         }
         .as-bottom {
            font-size: 11pt;
            background-color: #f4b740;
            color: white;
            border-radius: 20px;
            padding: 0 10px;
         }
         .v-icon {
            font-size: 13pt;
            background-color: #f4b740;
            color: white;
            border-radius: 20px;
            padding: 4px 10px;
         }
         width: 20%;
         height: 60px;
         padding: 5px;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         padding-bottom: 5px;
      }
      .selected-navi {
         border-bottom: #f4b740 5px solid;
         padding-bottom: 0;
      }
   }
   .bottom {
      border: rgb(52, 52, 52) 2.5px solid;
      background-color: white;
      //   max-height:calc(100%-20%-80px) !important;
      position: fixed;
      // background-color: red;
      position: relative;
      @include desktop {
         max-height: 350px !important;
      }
      @include tablet {
         max-height: 350px !important;
      }
      max-height: 465px !important;
      overflow: scroll;
      border-radius: 10px;
      margin-top: 20px;
      width: 90%;
      &::-webkit-scrollbar {
         display: none;
      }
      .article-wrapper {
         width: 100%;
         .for-stripe {
            background-color: #f2f1f2;
         }
         .as-item-box {
            cursor: pointer;

            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            .as-left {
               display: flex;
               flex-direction: column;
               width: 80%;
               .as-info {
                  color: gray;
               }
            }
            //   .as-right {
            //     width: 40px;
            //     border: lightgray 1px solid;
            //     // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
            //     height: 40px;
            //     line-height: 40px;
            //     border-radius: 25px;
            //     text-align: center;
            //   }
         }
      }
      .nori-wrapper {
         // height: 100% !important;
         width: 100%;
         .for-stripe {
            background-color: #f2f1f2;
         }
         .item-box {
            cursor: pointer;

            display: block;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px;
            .asp-left {
               width: 40%;
               img {
                  width: 100%;
                  max-height: 80px;
                  object-fit: cover;
               }
            }
            .asp-middle {
               width: 45%;
               .asp-info {
                  color: gray;
               }
            }
            .asp-right {
               width: 40px;
               border: lightgray 1px solid;
               // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
               height: 40px;
               line-height: 40px;
               border-radius: 25px;
               text-align: center;
            }
         }
      }
      .as-chart {
         padding: 0 10px;
         @include desktop {
            width: 400px;
            margin-left: 400px;
         }
         @include tablet {
            width: 400px;
            margin-left: 25%;
         }
         
      }
   }
}
#follow-modal {
   .followList {
      width: 80%;
      margin: 20px 30px;
      border-radius: 20px;
      border: lightgray 1px solid;
      overflow: hidden;
      .followListitems {
         cursor: pointer;
         width: 100%;
         padding: 10px 20px;

         &:nth-child(2n) {
            background-color: #f2f1f2;
         }
         &:nth-child(2n + 1) {
            background-color: #ffffff;
         }
         // &:last-child{
         // border-radius: 0px 0px 20px 20px;
         // }
         // &:first-child{
         // border-radius: 20px 20px 0px 0px ;
         // background-color: #ff5151;
         // }

         // .follow-list-item {

         // }
         // .for-stripe {
         // background-color: #f2f1f2;

         // }
         // &:nth-last-child(){
         //    border-radius: 0px 0px 20px 20px;

         // }
      }
   }
}
</style>
