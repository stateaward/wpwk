<template>
   <div>
      <v-card id="create">
         <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
            <template v-slot:activator>
               <v-btn id="main-dial" @click="checkDial" v-model="fab" color="blue darken-2" dark fab>
                  <v-icon v-if="fab"> mdi-close </v-icon>
                  <v-icon v-else> mdi-plus </v-icon>
                  <!-- <img v-else src="@/assets/c_wk.png" style="width:35px" /> -->
               </v-btn>
            </template>
            <v-btn class="sub-btns" fab dark small color="green" @mouseover="ttHover">
               <router-link to="/ContentsCreate"><span class="my-tooltip">노리 콘텐츠 제작</span><v-icon>mdi-baby-bottle</v-icon></router-link>
            </v-btn>
            <v-btn class="sub-btns" fab dark small color="yellow darken-1" @click="changeCommuModal(true)" @mouseover="ttHover">
               <span class="my-tooltip">커뮤니티 글 작성</span><v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="sub-btns" fab dark small color="red" @click="getFavorites" @mouseover="ttHover"> <span class="my-tooltip">즐겨찾기 이동</span><v-icon>mdi-heart</v-icon> </v-btn>
            <v-btn class="sub-btns" fab dark small color="indigo" @click="scrollTop" @mouseover="ttHover"> <span class="my-tooltip">맨 위로 이동</span><v-icon>mdi-chevron-up</v-icon> </v-btn>
         </v-speed-dial>
      </v-card>

      <!-- 커뮤니티 글 작성 모달 -->
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
         <v-card>
            <v-btn icon dark @click="dialog = false">
               <v-icon>mdi-close</v-icon>
            </v-btn>

            <article-form @emit-close="changeCommuModal" />
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import ArticleForm from '@/components/Community/ArticleForm';

export default {
   data: () => ({
      direction: 'top',
      fab: false, //스피드 다이얼용 변수
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',

      dialog: false, //모달용 변수
   }),
   components: { ArticleForm },
   computed: {
      activeFab() {
         switch (this.tabs) {
            case 'one':
               return { class: 'purple', icon: 'account_circle' };
            case 'two':
               return { class: 'red', icon: 'edit' };
            case 'three':
               return { class: 'green', icon: 'keyboard_arrow_up' };
            default:
               return {};
         }
      },
   },
   watch: {
      top(val) {
         this.bottom = !val;
      },
      right(val) {
         this.left = !val;
      },
      bottom(val) {
         this.top = !val;
      },
      left(val) {
         this.right = !val;
      },
   },

   methods: {
      scrollTop: function() {
         this.intervalId = setInterval(() => {
            if (window.pageYOffset === 0) {
               clearInterval(this.intervalId);
            }
            window.scroll(0, window.pageYOffset - 50);
         }, 0.001);
      },
      scrollListener: function() {
         this.visible = window.scrollY > 150;
      },

      //글 작성 여부에 따른 작성 폼 모달 오픈/닫기 제어
      changeCommuModal: function(state) {
         this.dialog = state;
      },

      // n초 뒤 툴팁 사라지도록
      checkDial() {
         if (this.fab) {
            setTimeout(() => {
               var tooltip = document.querySelectorAll('.my-tooltip');

               tooltip.forEach((item) => {
                  item.classList.add('disabled');
               });
            }, 2500);
         }
      },

      // 마우스 오버시 툴팁 재오픈
      ttHover() {
         var tooltip = document.querySelectorAll('.my-tooltip');

         tooltip.forEach((item) => {
            item.classList.remove('disabled');
            item.classList.add('tt-hover');
         });
      },

      getFavorites() {
         this.$router.push({
            name: 'SearchResult',
            params: { searchValue: "favorites", type: 'favorites' },
         });
      }
   },
   mounted: function() {
      window.addEventListener('scroll', this.scrollListener);
   },
   beforeDestroy: function() {
      window.removeEventListener('scroll', this.scrollListener);
   },
};
</script>

<style lang="scss" scoped>
@import 'src/css/vars';
@import 'src/css/compo/tooltip';
@import 'src/css/common';

#create .v-speed-dial {
   position: fixed;
   bottom: 40px;
   right: 30px;
   z-index: 5;

   button {
      &#main-dial {
         width: 7.5vh;
         height: 7.5vh;
         background-color: white !important;
         // border: 2px white solid !important;

         i {
            font-size: 2.5em;
            background: linear-gradient(90deg, rgba(37, 143, 37, 1) 0%, rgba(25, 191, 156, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
         }
         @include desktop {
            &:hover {
               background: linear-gradient(90deg, rgba(37, 143, 37, 1) 0%, rgba(25, 191, 156, 1) 100%);
            }
            &:hover i {
               background: none;
               color: #fff;
               -webkit-text-fill-color: #fff;
            }

         }

         @include tablet {
            &:hover {
               background: linear-gradient(90deg, rgba(37, 143, 37, 1) 0%, rgba(25, 191, 156, 1) 100%);
            }
            &:hover i {
               background: none;
               color: #fff;
               -webkit-text-fill-color: #fff;
            }
         }
      }

      &.v-btn--active {
         // background-color: red !important;
      }
   }
   a {
      color: white !important;
      text-decoration: none !important;
   }

   button.sub-btns.v-btn {
      min-width: 40px !important;
      min-height: 40px !important;

      width: 4vh !important;
      height: 4vh !important;
   }
}

#create .v-btn--floating {
   position: relative;
}

.v-card,
v-sheet,
theme--light {
   // background-color: blue !important;
   height: 100%;
   overflow: hidden;
}

//=========== 툴팁 ============

.my-tooltip {
   position: absolute;
   right: 68px; //좌측 툴팁

   text-overflow: ellipsis;
   padding: 1ch 1.5ch;
   border-radius: 3px;
   box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.461);
   background: rgb(50, 50, 50);
   color: rgb(242, 242, 242);

   & {
      top: 50%;
      right: calc(0em+100px);
      transform: translate(-0.5em, -50%);
   }

   &::before,
   &::after {
      text-transform: none; /* opinion 2 */
      font-size: 0.9em; /* opinion 3 */
      line-height: 1;
      user-select: none;
      pointer-events: none;
      position: absolute;
      overflow: hidden;

      // display: none;
      // opacity: 0;
   }
   &::before {
      content: '';
      border: 5px solid transparent; /* opinion 4 */
      z-index: 1001; /* absurdity 1 */
      top: 50%;
      border-right-width: 0;
      border-left-color: rgb(50, 50, 50);
      right: calc(0em - 5px);
      transform: translate(-0.5em, -50%);
   }

   &,
   &::before {
      @keyframes tooltips-vert {
         to {
            opacity: 1;
            transform: translate(-50%, 0);
         }
      }

      @keyframes tooltips-horz {
         to {
            opacity: 1;
            transform: translate(0, -50%);
         }
      }

      animation: tooltips-vert 400ms ease-out forwards;
      animation: tooltips-horz 400ms ease-out forwards;
   }
}

.tt-hover {
   @keyframes fadein {
      from {
         opacity: 0;
         transform: translate(0em, -50%);
      }
      to {
         opacity: 1;
         transform: translate(-0.5em, -50%);
      }
   }
   animation: fadein 1s;
}

.disabled {
   @keyframes fadeout {
      from {
         opacity: 1;
         transform: translate(0em, -50%);
      }
      to {
         opacity: 0;
         transform: translate(-0.5em, -50%);
      }
   }
   animation: fadeout 1s;
   animation-fill-mode: forwards;
}
</style>
