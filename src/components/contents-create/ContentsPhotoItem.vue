<template lang="">
   <div class="photo-item-wrapper d-flex align-center justify-space-around">
      <div class="image-wrapper">
         <img :src="item.photo.preview" />
      </div>
      <div class="desc-wrapper d-flex align-center justify-center">
         <div class="text nf nf-600" @click="onEdit" v-if="item.description&&editInput==false">{{ item.description }}</div>
         <textarea 
            cols="12" 
            rows="3"
            v-if="item.description==''"
            @keypress.enter="onItemChange"
            @change="onItemChange"
            v-model="description"
            maxlength="200"
            class="text nf nf-600"
            placeholder="사진에 대한 설명을 적어주세요"
         ></textarea>
         <textarea 
            cols="12" 
            rows="3"
            v-if="editInput"
            @keypress.enter="onItemChange" 
            @change="onItemChange"
            v-model="description"
            class="text nf nf-600"
            maxlength="200"
         ></textarea>
      </div>
   </div>
</template>
<script>
export default {
   name: 'ContentsPhotoItem',
   props: {
     item: Object,
     idx: Number,
  },
   data: () => {
      return {
         description: '',
         editInput: false
      }
   },
   methods: {
      onItemChange: function () {
         this.$emit('item-change', [this.description, this.idx])
         this.editInput = false
      },
      onEdit: function () {
         this.editInput = true
      }
   },
};
</script>
<style>
</style>
