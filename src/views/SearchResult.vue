<template>
   <div class="main-container">
      <div v-if="loading">
         <loading></loading>
      </div>
      <div v-if="!loading" class="noriList-wrapper">
         <NoriContent class="nori-wrapper" v-for="(nori, idx) in NoriList" :key="idx" :sendNori="nori" />
         <br />
         <div class="nori-wrapper spinner">
            <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
               <div slot="no-more" class="nf">더 이상 컨텐츠가 없어요 :)</div>
            </infinite-loading>
         </div>
      </div>
      <speed-dial></speed-dial>
   </div>
</template>

<script>
import NoriContent from '@/components/main/NoriContent.vue';
import SpeedDial from '@/components/main/SpeedDial.vue';
import Loading from '@/components/main/Loading.vue';
import { findContentsByTag, findContentsByKeyword, findContentsByCategory, findContentsByFavorites } from '@/api/contents.js';
import infiniteLoading from 'vue-infinite-loading';
import { mapState } from 'vuex'

export default {
   name: 'SearchResult',
   data: function() {
      return {         
         NoriList: [],
         abilities: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
         infLoading: false,
         page: 1,
         loading: true,
      };
   },
   components: {
      NoriContent,
      SpeedDial,
      infiniteLoading,
      Loading,
   },
   methods: {
      getAbility: function() {
         for (var i = 0; i < this.NoriList.length; i++) {
            if (this.NoriList[i].ability != null) {
               let abilityList = [];
               for (var j = 0; j < this.NoriList[i].ability.length; j++) {
                  if (this.NoriList[i].ability.charAt(j) == '1') {
                     abilityList.push(this.abilities[j]);
                  }
               }
               // 각 컨텐츠마다 지능
               this.NoriList[i].abilities = abilityList;
            }
         }
      },
      success: function(res) {
            this.NoriList = res.data;
            this.getAbility();
            this.page += 1;
            this.loading = false;
      },
      //   태그 검색 noriList 요청
      getNoriListByTag() {
         this.page = 1;
         findContentsByTag(
            this.$route.params.searchValue,
            this.page,
            (res) => {
               this.success(res);
            },
            (err) => {
               this.error("error : " + err);
            }
         );
      },
      getNoriListByKeyword() {
         this.page = 1;
         findContentsByKeyword(
            this.$route.params.searchValue,
            this.page,
            (res) => {
               this.success(res);
            },
            (err) => {
               this.error("error : " + err);
            }
         );
      },
      getNoriListByCategory() {
         this.page = 1;
         findContentsByCategory(
            this.$route.params.searchValue,
            this.page,
            (res) => {
               this.success(res);
            },
            (err) => {
               this.error("error : " + err);
            }
         );
      },
      getNoriListByFavorites() {
         this.page = 1;
         findContentsByFavorites(
            this.page,
            (res) => {
               this.success(res);
            },
            (err) => {
               this.error("error : " + err);
            }       
         );
      },
      getSearchList() {
         if (this.$route.params.type === 'tag') {
            this.getNoriListByTag();
         } else if (this.$route.params.type === 'keyword') {
            this.getNoriListByKeyword();
         } else if (this.$route.params.type === 'favorites') {
            this.getNoriListByFavorites();
         } else {
            this.getNoriListByCategory();
         }
      },
      // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
      infiniteHandler($state) {
         if (this.$route.params.type === 'tag') {
            findContentsByTag(
               this.$route.params.searchValue,
               this.page,
               (res) => {
                  setTimeout(() => {
                     if (res.data.length) {
                        var noriList = res.data;
                        this.getAbility();
                        this.NoriList = this.NoriList.concat(noriList);
                        $state.loaded();
                        this.page += 1;
                        if (this.NoriList.length / 10 == 0) {
                           $state.complete();
                        }
                     } else {
                        $state.complete();
                     }
                  }, 1000);
               },
               (err) => {
                  console.log(err);
               }
            );
         } else if (this.$route.params.type === 'keyword'){
            findContentsByKeyword(
               this.$route.params.searchValue,
               this.page,
               (res) => {
                  setTimeout(() => {
                     if (res.data.length) {
                        var noriList = res.data;
                        this.getAbility();
                        this.NoriList = this.NoriList.concat(noriList);
                        $state.loaded();
                        this.page += 1;
                        if (this.NoriList.length / 10 == 0) {
                           $state.complete();
                        }
                     } else {
                        $state.complete();
                     }
                  }, 1000);
               },
               (err) => {
                  console.log(err);
               }
            );
         } else if (this.$route.params.type === 'favorites') {
            findContentsByFavorites(
               this.page,
               (res) => {
                  setTimeout(() => {
                     if (res.data.length) {
                        var noriList = res.data;
                        this.getAbility();
                        this.NoriList = this.NoriList.concat(noriList);
                        $state.loaded();
                        this.page += 1;
                        if (this.NoriList.length / 10 == 0) {
                           $state.complete();
                        }
                     } else {
                        $state.complete();
                     }
                  }, 1000);
               },
               (err) => {
                  console.log(err);
               }
            );
         }
         else {
            findContentsByCategory(
               this.$route.params.searchValue,
               this.page,
               (res) => {
                  setTimeout(() => {
                     if (res.data.length) {
                        var noriList = res.data;
                        this.getAbility();
                        this.NoriList = this.NoriList.concat(noriList);
                        $state.loaded();
                        this.page += 1;
                        if (this.NoriList.length / 10 == 0) {
                           $state.complete();
                        }
                     } else {
                        $state.complete();
                     }
                  }, 1000);
               },
               (err) => {
                  console.log(err);
               }
            );
         }
      },
   },
   created: function() {
      this.NoriList = [];
      this.getSearchList()
   },
   computed: {
      ...mapState(["userInfo"])
   },
   watch: {
      $route() {
         this.NoriList = [];
         this.getSearchList()
      }
   }
};
</script>

<style lang="scss">
.main-container {
   padding: 10px 30px 0px 30px;

   .noriList-wrapper {
      // background-color: rgb(254, 227, 227);
      width: 100%;

      // 반응형, 메인 페이지 콘텐츠 다중 노출
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .nori-wrapper {
         // 반응형 풀려면, min-, max- 풀면 됨
         width: 100%;
         min-width: 400px;
         max-width: 500px;
         height: 300px;

         &.spinner {
            padding-top: 130px;
         }
      }
   }
}
</style>
