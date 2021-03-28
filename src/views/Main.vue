<template>
   <div class="main-container">
      <div class="noriList-wrapper">
         <div class="nori-wrapper" v-for="(nori, idx) in NoriList" :key="idx">
            <nori-content :sendNori="nori"> </nori-content>
            <br />
         </div>
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
import { findContentsByPage } from '@/api/contents.js';
import { findUserAbility } from '@/api/user.js';
import infiniteLoading from 'vue-infinite-loading';

export default {
   components: {
      NoriContent,
      SpeedDial,
      infiniteLoading,
   },
   data() {
      return {
         NoriList: [],
         abilities: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
         infLoading: false,
         page: 1,
         loading: false,
      };
   },
   created() {
      this.findUserAbility();
   },
   methods: {

      // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
      infiniteHandler($state) {
         findContentsByPage(
            this.page,
            (res) => {
               setTimeout(() => {
                  if (res.data.length) {
                     var noriList = res.data;

                     for (var i = 0; i < noriList.length; i++) {
                        if (noriList[i].ability != null) {
                           let abilityList = [];
                           for (var j = 0; j < noriList[i].ability.length; j++) {
                              if (noriList[i].ability.charAt(j) == '1') {
                                 abilityList.push(this.abilities[j]);
                              }
                           }

                           // 각 컨텐츠마다 지능
                           noriList[i].abilities = abilityList;
                        }
                     }

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
            (error) => {
               console.log(error);
            }
         );
      },
      goCreate: function() {
         this.$router.push({ name: 'ContentsCreate' });
      },
      findUserAbility: function() {
         findUserAbility(
            (success) => {
               this.$store.dispatch('getUsersAbilities', success.data);
            },
            (fail) => {
               console.log(fail);
            }
         );
      },
   },
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

         margin: 10px 5px;

         &.spinner {
            padding-top: 130px;
         }
      }
   }
}
</style>
