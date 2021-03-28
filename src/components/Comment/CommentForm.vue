<template>
  <div class="comment-footer">
    <div class="dummy-icon">
      <i class="fas fa-comment-medical"></i>
    </div>
    <input
      @keypress.enter="createComment"
      class="input-box nf"
      type="text"
      v-model="comment"
      placeholder="댓글을 작성해주세요."
    />
    <button @click="createComment" class="btn-send">
      <v-icon>mdi-send</v-icon>
    </button>
  </div>
</template>

<script>
import moment from 'moment';

import { mapState } from 'vuex';
export default {
  name: 'CommentForm',
  data: function() {
    return {
      comment: '',
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
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style lang="scss">
@import 'src/css/comment.scss';
</style>
