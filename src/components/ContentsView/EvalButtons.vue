<template lang="">
   <div class="eb-wrapper">
      <!-- {{ evaluationCal }} -->
      <div class="eval-group">
         <div class="ev-row">
            <v-btn outlined rounded @click="eval2" :class="{ selected: ev2 }"><span class="emoji">&#128118;</span>아이가 너무 좋아해요</v-btn>
            <v-btn outlined rounded @click="eval5" :class="{ selected: ev5 }"><span class="emoji">&#128525;</span>더 놀자고 해요</v-btn>
         </div>
         <div class="ev-row">
            <v-btn outlined rounded @click="eval4" :class="{ selected: ev4 }"><span class="emoji">&#128176;</span>재료 준비하기 쉬워요</v-btn>
            <v-btn outlined rounded @click="eval6" :class="{ selected: ev6 }"><span class="emoji">&#127960;</span>어디서든 할 수 있어요</v-btn>
         </div>
         <div class="ev-row">
            <v-btn outlined rounded @click="eval7" :class="{ selected: ev7 }"><span class="emoji">&#128079;</span>호기심이 해결됐어요</v-btn>
            <v-btn outlined rounded @click="eval8" :class="{ selected: ev8 }"><span class="emoji">&#127891;</span>교육적이에요!</v-btn>
         </div>
         <!-- <v-btn outlined rounded @click="eval1" :class="{ selected: ev1 }"><span>&#128277;</span>층간 소음이 없어요</v-btn> -->
         <!-- <v-btn outlined rounded @click="eval3" :class="{ selected: ev3 }"><span>&#128558;</span>유익한 내용이에요</v-btn> -->
         <!-- <v-btn outlined rounded @click="eval9" :class="{ selected: ev9 }"><span>&#128378;</span>아이가 한참 놀아도 안질려해요</v-btn> -->
      </div>
      <div class="btn-group">
         <v-btn id="submit" :class="{ possible: evaluationCal != '', disable: evaluationCal.length == '' }" outlined rounded @click="submit">평가하기</v-btn>
         <v-btn id="report" outlined rounded @click="dialog = true">신고</v-btn>
      </div>

      <!-- 신고하기 모달 -->
      <div>
         <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="330px">
               <v-card id="report-modal">
                  <v-card-title class="nf">
                     해당 컨텐츠를 신고하시겠습니까?
                  </v-card-title>
                  <!-- 나중에 input으로 바꿀 수 있음 일단 기본적인 내용만 -->
                  <div class="textarea-wrapper">
                     <v-textarea solo name="input-7-4" label="신고 이유를 적어주세요 (선택사항)" v-model="reportComment"></v-textarea>
                  </div>
                  <v-card-text>신고 내용은 운영진에게 전달됩니다.</v-card-text>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="green darken-1" text @click="dialog = false">
                        아니요
                     </v-btn>
                     <v-btn color="error" text @click="reportSubmit"> 신고하기 </v-btn>
                  </v-card-actions>
               </v-card>
               <img class="modal-right-hand" src="@/assets/img/characters/modal_right_hand.png" />
               <img class="modal-left-hand" src="@/assets/img/characters/modal_left_hand.png" />
               <img class="modal-foot" src="@/assets/img/characters/modal_foot.png" />
            </v-dialog>
         </v-row>
      </div>
      <!-- 신고하기 모달 -->
   </div>
</template>
<script>
import { contentsEvaluations } from '@/api/user.js';
import { reportSubmit } from '@/api/contents.js';
export default {
   name: 'EvalButtons',
   data: function() {
      return {
         ev1: false,
         ev2: false,
         ev3: false,
         ev4: false,
         ev5: false,
         ev6: false,
         ev7: false,
         ev8: false,
         ev9: false,

         fun: 0,
         acs: 0,
         edu: 0,
         evaluationCal: '',
         reportComment: '',
         dialog: false, //모달용 변수
      };
   },
   props: {
      contentsInfo: Object,
   },
   methods: {
      eval1: function() {
         this.ev1 = !this.ev1;
      },
      eval2: function() {
         this.ev2 = !this.ev2;
      },
      eval3: function() {
         this.ev3 = !this.ev3;
      },
      eval4: function() {
         this.ev4 = !this.ev4;
      },
      eval5: function() {
         this.ev5 = !this.ev5;
      },
      eval6: function() {
         this.ev6 = !this.ev6;
      },
      eval7: function() {
         this.ev7 = !this.ev7;
      },
      eval8: function() {
         this.ev8 = !this.ev8;
      },
      eval9: function() {
         this.ev9 = !this.ev9;
      },

      submit: function() {
         this.fun = this.ev2 + this.ev5 + this.ev9;
         this.acs = this.ev1 + this.ev4 + this.ev6;
         this.edu = this.ev3 + this.ev7 + this.ev8;

         this.fun = this.fun * 1; //문자 -> 숫자 변환
         this.acs = this.acs * 1;
         this.edu = this.edu * 1;

         const data = {
            ability: this.contentsInfo.ability,
            contentsId: this.contentsInfo.id,
            evalEdu: this.edu,
            evalFun: this.fun,
            evalAcs: this.acs,
         };

         contentsEvaluations(
            data,
            () => {
               alert('평가가 완료되었습니다.');
            },
            (error) => {
               alert('평가가 실패되었습니다.');
               console.log('error msg', error);
            }
         );
      },
      reportSubmit: function() {
         var data = {
            contentsId: this.contentsInfo.id,
            comment: this.reportComment,
         };
         reportSubmit(
            data,
            () => {
               alert('해당 컨텐츠의 신고가 정상적으로 접수 되었습니다.');
            },
            (fail) => {
               alert('해당 컨텐츠의 신고가 실패했습니다.');
               console.log(fail);
            }
         );
         this.dialog = false;
      },
   },
};
</script>
<style lang="scss">
@import 'src/css/compo/modal.scss';

.selected {
   background-color: rgb(255, 246, 180);
   border: rgb(237, 230, 177) 1px solid !important;
}

#report-modal.v-card.v-sheet {
   // background-color: red !important;
   display: flex;
   flex-direction: column;
   align-items: center;

   height: 400px;
   padding-top: 20px;
   border-radius: 50px;

   .textarea-wrapper {
      // background-color: blue;
      width: 80%;

      textarea {
         width: 100%;
         height: 100%;
         padding: 8px;
         background-color: #ffffff4e;
         // background-color: red;
         // box-shadow: 0 4px 4px lightgray;
         resize: none;
         font-size: 1pt !important;

         &:focus {
            outline: none;
         }

         &::placeholder {
            color: rgb(184, 184, 184);
            font-style: italic;
         }
      }
   }
}
</style>
