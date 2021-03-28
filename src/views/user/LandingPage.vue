<template>
   <div class="ld-container">
      <div class="wrapper">
         <p>보육 콘텐츠 큐레이션 플랫폼</p>
         <div class="images">
            <img id="charc" src="@/assets/img/landing/ld_main.png" alt="" />
            <!-- <img id="ball" src="@/assets/img/landing/ld_ball.png" alt="" />
             <img id="cube" src="@/assets/img/landing/ld_cube.png" alt="" />
             <img id="stick" src="@/assets/img/landing/ld_stick.png" alt="" /> -->
         </div>
         <!-- <span>가정 보육, 여기서 해결하세요!</span> -->

         <div class="title">
            <!-- <text-anima></text-anima> -->
            <div class="box">
               <div class="text animated wobble nf nf-600">위파위키</div>
               <span class="nf nf-600">with parents with kids</span>
            </div>
         </div>
         <span class="copy">© High5ive</span>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex';
// import TextAnima from '@ /views/user/TextAnima.vue';

export default {
   components: {
      // TextAnima ,
   },
   mounted() {
      let token = window.localStorage.getItem('accessToken');

      setTimeout(() => {
         if (token != null) {
            this.$router.push('/main');
         } else {
            this.$router.push('/login');
         }
      }, 3000);
   },

   computed: {
      ...mapState(['isLogin']),
   },
};
</script>
<style lang="scss" scoped>
.ld-container {
   background-color: #fffedd;

   /* 전체화면 가리기 */
   width: 100%;
   max-width: 100%;
   height: 100%;
   padding: 0px;
   margin: 0px;

   /* 창 덮기 */
   position: fixed;
   top: 0;
   left: 0;
   z-index: 5000;

   .wrapper {
      position: relative;
      margin: 0 auto;
      width: 400px;
      height: 100%;

      p {
         position: absolute;
         top: 19vh;
         left: 50%;
         transform: translate(-50%, 0);

         // background-color: #374857;
         // border-radius: 4px;
         color: #374857;
         // padding: 0px 6px;

         font-size: 9pt;
         font-weight: 600;
      }
      .images {
         img {
            position: absolute;
            top: 0;
            left: 0;
         }

         #charc {
            width: 250px;
            top: 20vh;
            // 가로축 가운데 정렬
            left: 50%;
            transform: translate(-50%, 0);
         }
      }

      .copy {
         position: absolute;
         // 가로축 가운데 정렬
         left: 50%;
         transform: translate(-50%, 0);

         bottom: 20px;
         font-size: 6pt;
      }

      .title {
         position: absolute;
         top: 45vh;

         // 가로축 가운데 정렬
         left: 50%;
         transform: translate(-50%, 0);

         display: flex;
         flex-direction: column;
         align-items: center;

         span {
            font-size: 0.9em;
            color: #374857;
         }

         .box {
            width: 160px;
            height: 100px;
            float: left;
            // background: #347fc3;
            overflow: hidden;
            padding-bottom: 120px;
         }

         .text {
            text-align: center;
            margin-top: 56px;
            color: #374857;
            font-size: 2em;
            font-family: sans-serif;
            text-transform: uppercase;
         }

         .animated {
            animation-duration: 2.5s;
            animation-fill-mode: both;
            animation-iteration-count: infinite;
         }

         @keyframes wobble {
            0% {
               transform: translateX(0%);
            }
            15% {
               transform: translateX(-5%) rotate(-5deg);
            }
            30% {
               transform: translateX(5%) rotate(3deg);
            }
            45% {
               transform: translateX(-3%) rotate(-3deg);
            }
            60% {
               transform: translateX(3%) rotate(2deg);
            }
            75% {
               transform: translateX(-1%) rotate(-1deg);
            }
            100% {
               transform: translateX(0%);
            }
         }
         .wobble {
            animation-name: wobble;
         }
      }
   }
}
</style>
