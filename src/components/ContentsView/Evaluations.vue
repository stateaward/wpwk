<template>
   <div class="ev-container">
      <div class="top-wrapper">
         <img class="ev-bubble" src="@/assets/img/characters/eval_bubble2.png" />
         <img class="ev-wk" src="@/assets/img/characters/eval_wk1.png" />
         <span class="ev-title nf">이번 콘텐츠는 어떻게 보셨나요?</span>
      </div>

      <span class="sub nf">*어떠셨는지 마음껏 선택해주세요</span>
      <eval-buttons :contentsInfo="contentsInfo"></eval-buttons>

      <div class="ev-footer">
         <div class="footer-eval">
            <div class="left-button material-ripple" @click="goReView()">
               <v-icon>mdi-backup-restore</v-icon>
               <span class="cap">다시보기</span>
            </div>
            <div class="middle-button material-ripple" @click="goHome()">
               <v-icon>
                  mdi-home
               </v-icon>
               <span class="cap">홈으로</span>
            </div>
            <div class="right-button material-ripple" @click="$router.push({ name: 'mypage', params: { userId: contentsInfo.userId } })">
               <v-icon>
                  mdi-dots-horizontal-circle-outline
               </v-icon>
               <span class="cap">제작자의 다른 컨텐츠 보러가기</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import EvalButtons from './EvalButtons.vue';

export default {
   name: 'Evaluations',
   components: {
      EvalButtons,
   },
   data: function() {
      return {
         evaluation: false,
      };
   },
   props: {
      contentsInfo: Object,
   },
   methods: {
      goHome: function() {
         this.$router.push({ name: 'Main' });
         this.$router.go(this.$router.currentRoute);
      },
      goReView: function() {
         alert('초기화면으로 돌아갑니다');
         this.evaluation = false;
         this.$emit('evaluationPage', this.evaluation);
      },
   },
};
</script>
