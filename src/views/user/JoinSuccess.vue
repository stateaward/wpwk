<template>
   <div class="jc-container">
      <div class="wrapper">
         <div class="texts">
            <p class="nf">인증메일이 전송되었어요</p>
            <p class="nf"><b class="nf">이메일 인증</b> 시, 저희와 함께하실 수 있어요</p>
         </div>
         <img class="bublle" src="@/assets/img/characters/welcome-bubble.png" alt="" />
         <img src="@/assets/img/characters/welcome-box.png" alt="" />

         <v-btn small outlined rounded color="light-blue darken-4" @click="$router.push('/login')">로그인 하기</v-btn>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.jc-container {
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

   background-color: white;

   .wrapper {
      position: relative;
      top: 20vh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .texts {
         text-align: center;
         position: absolute;
         top: 70px;
         font-size: 13pt;

         p {
            margin: 0;
         }
      }

      img {
         width: 200px;
      }

      .bublle {
         width: 300px;
      }

      button {
         margin-top: 30px;
      }
   }
}
</style>
