<template>
   <div class="text-item-wrapper d-flex justify-center align-center">
      <span class="text nf nf-600" @click="onEdit" v-if="item.description && editInput == false">{{ item.description }}</span>
      <textarea
         cols="12"
         rows="3"
         v-if="item.description == ''"
         @keypress.enter="onItemChange"
         @change="onItemChange"
         v-model="description"
         class="nf nf-600"
         maxlength="200"
         placeholder="내용을 적어주세요."
      ></textarea>
      <textarea cols="12" rows="3" v-if="editInput" @keypress.enter="onItemChange" @change="onItemChange" v-model="description" class="nf nf-600" maxlength="200"></textarea>
   </div>
</template>
<script>
export default {
   name: 'ContentsTextItem',
   props: {
      item: Object,
      idx: Number,
   },
   data: function() {
      return {
         description: '',
         editInput: false,
      };
   },
   methods: {
      onItemChange: function() {
         this.$emit('item-change', [this.description, this.idx]);
         this.editInput = false;
      },
      onEdit: function() {
         this.editInput = true;
      },
   },
};
</script>
<style></style>
