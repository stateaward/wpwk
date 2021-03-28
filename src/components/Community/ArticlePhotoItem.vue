<template>
   <div style="height:140px">
      <img :src="item.photo.preview" />
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
<style scoped>
img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: 0px 0px;
}
</style>
