<template>
   <div>
      <v-img class="white--text align-end" :src="item.photo.preview" />
      <br />
   </div>
</template>

<script>
export default {
   name: 'ArticlePhotoItem',
   props: {
      item: Object,
      idx: Number,
   },
};
</script>
<style scoped></style>
