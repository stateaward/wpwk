<template>
  <div class="select-button" @click="buttonSelect"> {{ selectValue }} </div>
</template>
<script>
export default {
  name: "SearchItem",
  data: function () {
    return {
			searchShow: false,
			categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
			wait: true
    }
	},
	props: {
		selectValue: String,
	},
  methods: {
    buttonSelect: function () {
			for(var i=0;i<this.categories.length;i++) {
				if(this.selectValue === this.categories[i]) {
					this.$router.push({name:'SearchResult', params: { searchValue: i + 1, type: "category" }})
					this.wait = false
				}
			}
			if(this.wait) {
				this.$router.push({name:'SearchResult', params: { searchValue: this.selectValue, type: "keyword" }})
			}
      this.$emit('categorySearchShow', this.searchShow)
		},
	}
}
</script>
<style lang="">
  
</style>