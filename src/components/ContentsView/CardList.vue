<template>
   <div class="cl-container">
      <Card :card="card" :pageNum="pageNum" />
      <div class="cl-footer">
         <div class="footer-pagination">
            <!-- <span class="page-count">{{ pageNum }} / {{ this.cards.length }} 페이지</span> -->
            <div class="text-center">
               <v-pagination v-model="pageNum" :length="this.cards.length" circle> </v-pagination>
            </div>
         </div>
         <div class="footer-navi">
            <div class="left-button out material-ripple" v-if="this.pageNum == 1" @click="goHome">
               <v-icon>mdi-backspace-outline</v-icon>
               <span class="cap">홈으로</span>
            </div>
            <div class="left-button material-ripple" v-else @click="[prevPage(), ripple()]">
               <v-icon>mdi-chevron-left</v-icon>
               <span class="cap">이전</span>
            </div>
            <div class="right-button fin material-ripple" v-if="pageNum === this.cards.length" @click="[evaluationValue(), ripple()]">
               <v-icon>
                  mdi-flag
               </v-icon>
               <span class="cap">종료</span>
            </div>
            <div class="right-button material-ripple" v-else @click="[nextPage(), ripple()]">
               <v-icon :disabled="pageNum >= this.cards.length">
                  mdi-chevron-right
               </v-icon>
               <span class="cap">다음</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Card from './Card';

export default {
   name: 'CardList',
   data: function() {
      return {
         pageNum: 1,
         evaluation: false,
         card: {},
         // card: {
         //   description: '',
         //   contentsId: '',
         //   imageAddress: '',
         //   videoAddress: '',
         //   youtubeId: '',
         //   youtubeThumbnail: '',
         //   youtubeTitle: '',
         //   youtubeUrl: '',
         // },
      };
   },
   methods: {
      nextPage() {
         this.pageNum++;
      },
      prevPage() {
         if (this.pageNum <= 1) {
            this.$router.go(-1);
            return;
         }
         this.pageNum--;
      },
      goHome: function() {
         this.$router.push({ name: 'Main' });
         this.$router.go(this.$router.currentRoute);
      },
      evaluationValue() {
         this.evaluation = true;
         this.$emit('evaluationPage', this.evaluation);
      },
      getCard() {
         this.card = this.cards[this.pageNum - 1];
      },
      ripple() {
         // Array.from(document.querySelectorAll('.material-ripple')).forEach((a) => {
         //    a.addEventListener('click', function(e) {
         //       const ripple = document.createElement('div'),
         //          rect = a.getBoundingClientRect();
         //       (ripple.className = 'animate'),
         //          (ripple.style.left = `${e.x - rect.left}px`),
         //          (ripple.style.top = `${e.y - rect.top}px`),
         //          (ripple.style.background = `#${a.dataset.color !== undefined ? a.dataset.color : '14801d73'}`),
         //          ripple.style.setProperty('--material-scale', a.offsetWidth),
         //          a.append(ripple),
         //          setTimeout(function() {
         //             ripple.parentNode.removeChild(ripple);
         //          }, 500);
         //    });
         // });
      },
   },
   components: {
      Card,
   },
   props: ['cards'],
   watch: {
      pageNum: function() {
         this.getCard();
      },
      cards: function() {
         this.getCard();
      },
   },
   mounted() {
      this.ripple();
   },
};
</script>
