<template>
  <div class="ad-container">
    <div class="article-wrapper">
      <div class="content-wrapper">
        <div class="at-category-time">
          <span class="at-category">{{ article.category }}</span>
          <span class="at-timeinfo">{{
            article.createdAt | moment("add", "9 hours", "YYYY.MM.DD H:mm")
          }}</span>
        </div>
        <div
          v-if="userInfo.userId == article.userId"
          class="dots"
          @click="menuToggle"
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </div>
        <div v-if="menu" aria-expanded="false" class="dropdown-menu">
          <div class="menu-detail" @click="editDialog = true">
            <v-icon>mdi-tooltip-edit-outline</v-icon>
            <span>게시글 수정하기</span>
          </div>
          <div class="menu-detail" @click="removeBoard">
            <v-icon>mdi-delete-forever</v-icon>
            <span>게시글 삭제하기</span>
          </div>
        </div>
        <div
          class="nickname"
          @click="
            $router.push({ name: 'mypage', params: { userId: article.userId } })
          "
        >
          {{ article.writer }}
        </div>
        <div class="content" v-html="content"></div>

        <div v-if="itemList.length">
          <div v-for="(item, idx) in itemList" :key="idx">
            <article-detail-photo :item="item" :idx="idx" class="photo" />
          </div>
        </div>
      </div>

      <div class="feature-wrapper">
        <div class="likes-btn" @click="getLike">
          <v-icon v-if="article.liked" color="red">
            mdi-heart-multiple
          </v-icon>
          <v-icon v-else color="red">
            mdi-heart-multiple-outline
          </v-icon>
          <span> 좋아요! </span>
        </div>
        <div class="info-btn">
          <v-icon color="#a2d646">
            mdi-comment-multiple-outline
          </v-icon>
          <div class="comment">
            <div v-if="comments">댓글 {{ comments.length }}</div>
            <div v-else>
              댓글쓰기
            </div>
          </div>
          <v-icon style="color:rgb(255, 101, 101)">
            mdi-account-heart
          </v-icon>
          <span>{{ article.likes }} </span>
        </div>
      </div>
    </div>
    <div class="comment-box">
      <comment-list :comments="comments" @deleteComment="deleteComment" />
    </div>
    <comment-form-cmmu @createComment="createComment" />

    <div>
      <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="330px">
          <v-card id="report-modal" class="pwd-modal">
            <v-card-title>
              <span class="headline">게시물 수정</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <span>{{ article.writer }}</span>
                </v-row>
                <v-row>
                  <v-textarea v-model="editContent" no-resize> </v-textarea>
                </v-row>
                <v-row>
                  <v-select
                    :items="subjects"
                    label="카테고리"
                    required
                    v-model="editCategory"
                  ></v-select>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="editDialog = false">
                닫기
              </v-btn>
              <v-btn color="green darken-1" text @click="editBoard">
                저장하기
              </v-btn>
            </v-card-actions>
          </v-card>

          <img
            class="modal-right-hand"
            src="@/assets/img/characters/modal_right_hand.png"
          />
          <img
            class="modal-left-hand"
            src="@/assets/img/characters/modal_left_hand.png"
          />
          <img
            class="modal-foot"
            src="@/assets/img/characters/modal_foot.png"
          />
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArticleDetailPhoto from "@/components/Community/ArticleDetailPhoto";
import CommentFormCmmu from "@/components/Comment/CommentForm_cmmu.vue";
import CommentList from "@/components/Comment/CommentList.vue";
import {
  findBoardsById,
  deleteById,
  updateLikes,
  cancelLikes,
  modifyBoard,
} from "@/api/community.js";
import {
  findBoardCommentsByBoardId,
  createBoardComment,
  removeBoardComment,
} from "@/api/communityComment.js";

export default {
  name: "ArticleDetail",
  components: {
    ArticleDetailPhoto,
    CommentList,
    CommentFormCmmu,
  },
  data: function() {
    return {
      itemList: [],
      comments: [],
      likeList: [],
      article: "",
      page: 1,
      menu: false,
      editDialog: false,
      editContent: "",
      editCategory: "",
      subjects: [
        "맛집정보 나눔",
        "교육정보 나눔",
        "육아정보 나눔",
        "요리정보 나눔",
        "생활정보 나눔",
        "잡담",
      ],
      comment: "",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    content: function() {
      if (this.article.content) {
        return this.article.content.replace(/(?:\r\n|\r|\n)/g, "<br />");
      }
      return "";
    },
  },
  methods: {
    getArticle: function() {
      findBoardsById(
        this.$route.params.articleId,
        (res) => {
          this.article = res.data;

          this.editContent = this.article.content;
          this.editCategory = this.article.category;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getArticleComments: function() {
      this.comments = [];
      findBoardCommentsByBoardId(
        this.$route.params.articleId,
        this.page,
        (res) => {
          this.comments = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getLike: function() {
      if (!this.article.liked) {
        updateLikes(
          { id: this.$route.params.articleId },
          () => {
            this.article.liked = true;
            this.article.likes += 1;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.article.liked = true;
        cancelLikes(
          this.$route.params.articleId,
          () => {
            this.article.liked = false;
            this.article.likes -= 1;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    deleteComment: function(comment) {
      removeBoardComment(
        comment.id,
        this.$route.params.articleId,
        () => {
          this.getArticleComments();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    createComment: function(comment) {
      createBoardComment(
        this.$route.params.articleId,
        comment,
        () => {
          this.getArticleComments();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    removeBoard: function() {
      if (confirm("정말로 삭제하시겠습니까") === false) {
        return;
      }

      deleteById(
        this.$route.params.articleId,
        () => {
          alert("게시물이 삭제되었습니다.");
          this.$router.push("/cmmu");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    editBoard: function() {
      this.article.content = this.editContent;
      this.article.category = this.editCategory;

      modifyBoard(
        this.article,
        () => {
          alert("게시물이 수정되었습니다.");
          this.editDialog = false;
          this.$router.push("/cmmu");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    menuToggle: function() {
      this.menu = this.menu == false ? true : false;
    },
  },
  created: function() {
    this.getArticle();
    this.getArticleComments();
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/articleDetail.scss";
</style>
