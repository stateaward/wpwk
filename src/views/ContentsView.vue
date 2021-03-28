<template>
   <div class="cv-container">
      <!-- evaluation값에 따라 페이지 변환 -->
      <!-- 평가페이지 -->
      <div v-if="evaluationValue">
         <Evaluations @evaluationPage="evaluation" :contentsInfo="contents" />
      </div>

      <!-- 카드페이지 -->
      <div v-else class="cv-card-wrapper">
         <div class="card-top-option">
            <div v-if="userInfo.userId == contents.userId || userInfo.status === 2" class="dots" @click="menuToggle">
               <v-icon>mdi-dots-horizontal</v-icon>
            </div>
            <div v-if="menu" aria-expanded="false" class="dropdown-menu" v-click-outside="onClickOutside">
               <div class="menu-detail" @click="editContent">
                  <v-icon>mdi-tooltip-edit-outline</v-icon>
                  <span>노리 수정하기</span>
               </div>
               <div class="menu-detail" @click="deleteContent">
                  <v-icon>mdi-delete-forever</v-icon>
                  <span>노리 삭제하기</span>
               </div>
            </div>

            <button class="share-btn" type="button" v-clipboard:copy="url" v-clipboard:success="onCopy"><v-icon>mdi-share</v-icon></button>
         </div>
         <div class="card-top-wrapper">
            <p class="title">{{ contents.title }}</p>
            <p
               class="writer"
               @click="
                  $router.push({
                     name: 'mypage',
                     params: { userId: contents.userId },
                  })
               "
            >
               {{ contents.nickname }}
            </p>
         </div>

         <CardList :cards="cards" @evaluationPage="evaluation" />
      </div>

      <!-- 댓글창 전체 모달 -->
      <div class="comment-modal" style="position: absolute;">
         <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" style="position: absolute;">
               <!-- 댓글 모달창을 여는 댓글 버튼 -->
               <template v-slot:activator="{ on, attrs }">
                  <v-icon id="btn-comment" v-bind="attrs" v-on="on">
                     mdi-comment-text-multiple-outline
                  </v-icon>
               </template>

               <!-- 화면 전체를 뒤덮는 모달 -->
               <v-card id="comment-box">
                  <img class="wp-face" src="@/assets/img/characters/comment_wp1.png" />
                  <img class="wp-hand" src="@/assets/img/characters/comment_wp2.png" />

                  <div class="cm-wrapper">
                     <ContentsCommentList :comments="comments" @deleteComment="deleteComment" @updateComment="updateComment" />
                  </div>
                  <comment-form-view :contents="contents" @createComment="createComment" @emit-close="closeModal" />
               </v-card>
            </v-dialog>
         </v-row>
      </div>
      <!-- 댓글창 끝 -->
   </div>
</template>

<script>
import CardList from '@/components/ContentsView/CardList';
import Evaluations from '@/components/ContentsView/Evaluations';
import ContentsCommentList from '@/components/Comment/ContentsCommentList';
import CommentFormView from '../components/Comment/CommentForm_view.vue';
import { deleteContentsComment, updateContentsComment, createContentsComment, findContentsById, findContentsComment, findContentsItemById, deleteContents } from '@/api/contents.js';
import { mapState } from 'vuex';
import vClickOutside from 'v-click-outside';

export default {
   name: 'ContentsView',
   components: {
      CardList,
      Evaluations,
      ContentsCommentList,
      CommentFormView,
   },
   directives: {
      clickOutside: vClickOutside.directive,
   },
   data: function() {
      return {
         cards: Array,
         evaluationValue: false,
         dialog: false,
         menu: false,
         comments: [],
         time: {
            hour: 0,
            minute: 0,
         },
         selectedCategories: [],
         hashtags: [],
         contents: Object,
         url: '',
      };
   },
   created() {
      this.url = location.href;
      //컨텐츠 ID 에 맞는 ItemList axios 호출
      this.getContentsItems();
   },
   computed: {
      ...mapState(['userInfo']),
   },
   methods: {
      onClickOutside() {
         this.menu = false;
      },
      evaluation(value) {
         this.evaluationValue = value;
      },
      back: function() {
         this.evaluationValue = false;
         this.$router.go(this.$router.currentRoute);
      },
      deleteComment: function(comment) {
         const deleteId = this.comments.indexOf(comment);
         this.comments.splice(deleteId, 1);

         deleteContentsComment(
            comment.id,
            () => {},
            (fail) => {
               alert('댓글을 삭제 fail.' + fail);
            }
         );
      },
      updateComment: function(comment) {
         var data = {
            commentId: comment.id,
            comment: comment.comment,
         };
         updateContentsComment(
            data,
            () => {},            
            (fail) => {
               console.log(fail);
               alert('댓글을 수정하는데 실패 했습니다.');
            }
         );
      },

      createComment: function(comment) {
         this.comments.unshift(comment);
         createContentsComment(
            comment,
            () => {
               this.findContentsComment();
            },
            (fail) => {
               console.log(fail);
            }
         );
      },
      findContentsComment: function() {
         findContentsComment(
            this.contents.id,
            (success) => {
               this.comments = success.data;
            },
            (fail) => {
               console.log('get Contents Comment fail', fail);
            }
         );
      },

      getContentsItems: function() {
         var contentsId = this.$route.params.id;
         findContentsById(
            contentsId,
            (success) => {
               this.contents = success.data;
            },
            (fail) => {
               console.log(fail);
            }
         );

         findContentsItemById(
            contentsId,
            (success) => {
               this.cards = success.data;
            },
            (fail) => {
               console.log('get ContentsItem fail ', fail);
            }
         );
         findContentsComment(
            contentsId,
            (success) => {
               this.comments = success.data;
            },
            (fail) => {
               console.log('get Contents Comment fail', fail);
            }
         );
      },

      // 현재 떠있는 댓글창을 닫기
      closeModal() {
         this.dialog = false;
      },

      menuToggle: function() {
         this.menu = this.menu == false ? true : false;
      },

      editContent: function() {
         this.$router.push({ name: 'ContentsUpdate', params: this.contents.id });
      },
      deleteContent: function() {
         deleteContents(
            this.contents.id,
            () => {
               alert('노리 삭제가 완료되었습니다.');
               this.$router.push('/main');
            },
            (fail) => {
               console.log(fail);
            }
         );
      },
      onCopy: function() {
         alert('링크가 복사되었습니다');
      },
   },

   watch: {
      evaluationValue: function() {
         this.cards = [];
         this.getContentsItems();
      },
      $route() {
         this.url = location.href;
         this.getContentsItems()
      }
   },
};
</script>

<style lang="scss">
@import 'src/css/contentsView.scss';
</style>
