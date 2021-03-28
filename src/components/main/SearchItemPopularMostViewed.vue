<template>
  <div class="select-button" @click="toContentsView">
   {{ selectValue.title }}
  </div>
</template>
<script>
export default {
  name: 'SearchItemPopularMostViewed',
  props: {
    selectValue: Object
  },
  data: function () {
    return {
      searchShow: false
    }
  },
  methods: {
    toContentsView: function () {
      this.$router.push({name: 'ContentsView', params: {id: this.selectValue.id}})
      this.$emit('onContentClick', this.searchShow)
    }
  }
}
</script>
<style>
  
</style>