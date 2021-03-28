<template>
  <div class="comment-wrapper">
    <contents-comment-list-item
      v-for="(comment, idx) in comments"
      :key="idx"
      :comment="comment"
      @deleteComment="deleteComment"
      @updateComment="updateComment"
    />
  </div>
</template>

<script>
import ContentsCommentListItem from './ContentsCommentListItem.vue';

export default {
  name: 'CommentList',
  props: {
    comments: Array,
  },
  components: {
    ContentsCommentListItem,
  },
  methods: {
    deleteComment: function(comment) {
      this.$emit('deleteComment', comment);
    },
    updateComment: function(comment) {
      this.$emit('updateComment', comment);
    },
  },
};
</script>

<style lang="scss">
@import 'src/css/comment.scss';
</style>
