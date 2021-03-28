<template>
   <div class="youtube-search-item-wrapper d-flex align-center justify-space-between" style="width: 100%">
      <div class="image-wrapper">
         <img :src="thumbnailSrc" alt="video thumbnail" />
      </div>
      <div class="middle-wrapper">
         <div :title="video.snippet.title | unescape">{{ video.snippet.title | unescape }}</div>
      </div>
      <div class="right-wrapper d-flex justify-center">
         <button @click="onSelectVideo"><v-icon>mdi-check-bold</v-icon></button>
      </div>
   </div>
</template>
<script>
import _ from 'lodash';

export default {
   name: 'YoutubeItem',
   props: {
      video: Object,
   },
   computed: {
      thumbnailSrc: function() {
         // 썸네일 없을시
         if (this.video.snippet.thumbnails.default.url.length == 0) {
            return '@/assets/img/contents-create/yt-img.png';
            //있을시
         } else {
            return `https://img.youtube.com/vi/${this.video.id.videoId}/hqdefault.jpg`;
         }
      },
   },
   filters: {
      unescape: function(text) {
         return _.unescape(text);
      },
   },
   methods: {
      onSelectVideo: function() {
         // 썸네일 없을시
         if (this.video.snippet.thumbnails.default.url.length == 0) {
            const video = {
               thumbnailSrc: '@/assets/img/contents-create/yt-img.png',
               videoId: this.video.id.videoId,
               videoCaption: this.video.snippet.description,
            };
            this.$emit('select-video', video);
            //있을시
         } else {
            const video = {
               thumbnailSrc: `https://img.youtube.com/vi/${this.video.id.videoId}/hqdefault.jpg`,
               videoId: this.video.id.videoId,
               videoCaption: this.video.snippet.description,
            };
            this.$emit('select-video', video);
         }
      },
   },
};
</script>
<style></style>
