<template>
   <!-- 콘텐츠 뷰 안에 들어가는 댓글창 -->
   <div>
      <div class="comment-view-footer">
         <div class="close-btn" @click="closeModal">
            <v-icon>mdi-close</v-icon>
         </div>
         <input @keypress.enter="createComment" class="input-box" type="text" v-model="comment" placeholder="댓글을 작성해주세요." />
         <button @click="createComment" class="btn-send">
            <v-icon>mdi-send</v-icon>
         </button>
      </div>
   </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
   name: 'CommentFormView',
   data: function() {
      return {
         comment: '',
         editDialog: false,
      };
   },
   props: {
      contents: Object,
   },
   methods: {
      createComment: function() {
         if (this.comment == '') {
            alert('내용을 입력해주세요');
            return;
         }

         const now = moment().format('YYYY-MM-DD HH:mm:ss');
         const comment = {
            comment: this.comment,
            nickname: this.userInfo.nickname,
            contentsId: this.contents.id,
            userId: this.userInfo.userId,
            createdAt: now,
         };
         this.$emit('createComment', comment);
         this.comment = '';
      },

      // 현재 댓글 창을 닫기
      closeModal() {
         this.$emit('emit-close');
      },
   },
   computed: {
      ...mapState(['userInfo']),
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

.comment-view-footer {
   position: fixed;
   z-index: 100;
   // left: 0;
   bottom: 0;
   // transform: translateX(-50%);

   height: 50px;
   width: 100%;

   @include desktop {
      // margin-left: 400px;
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
