<template>
   <!-- 커뮤니티 디테일 안에 들어가는 댓글창 -->
   <div class="comment-cmmu-footer">
      <div class="close-btn" @click="$router.push('/cmmu')">
         <v-icon>mdi-arrow-left</v-icon>
      </div>
      <input @keypress.enter="createComment" class="input-box" type="text" v-model="comment" placeholder="댓글을 작성해주세요." />
      <button @click="createComment" class="btn-send"><v-icon>mdi-send</v-icon></button>
   </div>
</template>

<script>
export default {
   name: 'CommentFormCmmu',
   data: function() {
      return {
         comment: '',
      };
   },
   methods: {
      createComment: function() {
         if (this.comment == '') {
            alert('내용을 입력해주세요');
            return;
         }

         // 임의의 사용자 이름 설정
         const comment = {
            comment: this.comment,
         };
         this.$emit('createComment', comment);
         this.comment = '';
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

.comment-cmmu-footer {
   position: fixed;
   z-index: 100;
   left: 0;
   bottom: 0px;
   // transform: translateX(-50%);

   height: 50px;
   width: 100%;

   @include desktop {
      margin-left: 400px;
      width: calc(100% - 400px);
   }

   background-color: white;

   display: flex;

   .close-btn {
      border-radius: 0px;
      // position: fixed;
      // z-index: 110;
      // bottom: 0px;

      text-align: center;
      line-height: 45px;

      width: 60px;
      height: 50px;

      background-color: rgb(247, 179, 179);
      cursor: pointer;
      // border-right: 1px solid $main-green;

      i {
         color: white;
      }

      &:focus {
         outline: none;
      }
   }

   .input-box {
      width: 100%;
      // background-color: blue;
      padding: 20px;
      border: 1px solid $main-green;

      &:focus {
         outline: none;
      }

      font-size: 10pt;
   }

   .btn-send {
      width: 60px;
      background-color: $main-green;

      i {
         color: white;
      }

      &:focus {
         outline: none;
      }
   }
}
</style>
