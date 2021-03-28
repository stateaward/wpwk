<template>
   <div class="search-container">
      <div class="search-wrapper" v-click-outside="onClickOutsideSearch">
         <div class="search">
            <v-text-field v-model="searchValue" @keypress.enter="search" label="" hint="ex) 종이접기, 놀이"></v-text-field>
            <v-btn outlined rounded color="blue" @click="search">Search</v-btn>
         </div>
         <div class="category-wrapper">
            <p class="nf">카테고리 검색</p>
            <div class="category">
               <SearchItem v-for="(selectValue, idx) in categories1" :key="idx" :selectValue="selectValue" @categorySearchShow="categorySearchShow" />
            </div>
            <div class="category">
               <SearchItem v-for="(selectValue, idx) in categories2" :key="idx" :selectValue="selectValue" @categorySearchShow="categorySearchShow" />
            </div>
         </div>
         <div class="record-wrapper">
            <div class="popularity-wrapper">
               <p class="nf">인기 콘텐츠</p>
               <div class="popularity nf">
                  <search-item-popular-most-viewed v-for="(selectValue, idx) in popularContents" :key="idx" :selectValue="selectValue" @onContentClick="categorySearchShow"/>
               </div>
            </div>
            <div class="recommend-wrapper">
               <p class="nf">추천 콘텐츠</p>
               <div class="popularity nf">
                  <search-item-popular-most-viewed v-for="(selectValue, idx) in mostViewedContents" :key="idx" :selectValue="selectValue" @onContentClick="categorySearchShow"/>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import SearchItem from './SearchItem.vue';
import SearchItemPopularMostViewed from './SearchItemPopularMostViewed.vue';
import { getPopularContents } from '@/api/contents.js'
import { getMostViewedCountContents } from '@/api/contents.js'
import vClickOutside from 'v-click-outside';

export default {
   name: 'Search',
   components: {
      SearchItem,
      SearchItemPopularMostViewed,
   },
   directives: {
      clickOutside: vClickOutside.directive,
   },
   data: function() {
      return {
         searchValue: '',
         searchShow: false,
         categories1: ['언어지능', '논리수학지능', '공간지능', '개인내지능'],
         categories2: ['음악지능', '신체운동지능', '자연지능', '대인지능'],
         popularContents: [],
         mostViewedContents: [],
      };
   },
   methods: {
      onClickOutsideSearch: function () {
         this.$emit('searchShow', this.searchShow);
      },
      search: function() {
         this.$router.push({
            name: 'SearchResult',
            params: { searchValue: this.searchValue, type: 'keyword' },
         });
         this.$emit('searchShow', this.searchShow);
      },
      categorySearchShow(search) {
         this.$emit('searchShow', search);
      },
      getPopularContent: function () {
         getPopularContents(
            1,
            (success) => {
               this.popularContents = success.data.slice(0, 3)
            },
            (fail) => {
               console.log(fail)
            }
         )
      },
      getMostViewedCountContent: function () {
         getMostViewedCountContents(
            1,
            (success) => {
               this.mostViewedContents = success.data.slice(0, 3)
            },
            (fail) => {
               console.log(fail)
            }
         )
      }
   },
   created: function () {
      this.getPopularContent()
      this.getMostViewedCountContent()
   }
};
</script>

<style lang="scss">
@import 'src/css/search.scss';
</style>
