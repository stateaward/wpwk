<template>
   <div class="cgt-wrapper">
      <div @click="onNextClicked">
         <v-icon>
            mdi-chevron-right
         </v-icon>
         <span class="cap">다음</span>
      </div>
      <v-row justify="center">
         <v-dialog id="cc-dialog" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile class="card">
               <div v-if="isLoading">
                  <loading />
               </div>
               <v-card-text id="cc-card-text" v-if="!isLoading">
                  <div class="cc-dialog-top-wrapper">
                     <div class="top-left">
                        <v-icon>
                           mdi-alarm
                        </v-icon>
                     </div>
                     <div class="top-right">
                        <v-select class="select-input" :items="hours" label="시간" color="#f4b740" v-model="time.hour"></v-select>
                        <v-select class="select-input" :items="minutes" label="분" color="#f4b740" v-model="time.minute"></v-select>
                     </div>
                  </div>
                  <div class="cc-dialog-middle-wrapper">
                     <div v-for="(category, idx) in categories" :key="idx" class="category-wrapper">
                        <div @click="onCategorySelect(category)">{{ category }}</div>
                     </div>
                  </div>
                  <div class="cc-dialog-bottom-wrapper">
                     <div class="bottom-top">
                        <div class="upper">
                           <v-icon>mdi-pound</v-icon>
                           <div class="hashtag-search" @keyup.down="selectValue('down')" @keyup.up="selectValue('up')">
                              <v-text-field
                                 id="hashtagInput"
                                 label="해시태그 추가(선택)"
                                 outlined
                                 class="hashtagInput"
                                 color="#f4b740"
                                 maxlength="10"
                                 @input="filterList"
                                 v-model.trim="hashtag"
                                 @keypress.enter="addHashtag"
                                 style="padding: 0; margin: 0;"
                                 autocomplete="off"
                              ></v-text-field>
                              <ul v-if="hashtagResult.length" class="hashtag-list" tabindex="0" @mouseover="removeValue">
                                 <li v-for="tag in hashtagResult" :key="tag.id" @click="changeValue(tag)" @keyup.enter="selectValue('enter', tag)" tabindex="-1">
                                    <span>{{ tag.name }}</span>
                                 </li>
                              </ul>
                           </div>

                           <v-icon @click="addHashtag">mdi-plus-circle</v-icon>
                        </div>
                     </div>
                     <div class="bottom-bt">
                        <span v-for="(tag, idx) in hashtags" :key="idx" class="hashtag">
                           #{{ tag }}
                           <v-icon @click="deleteTag(idx)">mdi-close</v-icon>
                        </span>
                     </div>
                  </div>

                  <div class="cc-dialog-footer d-flex justify-space-between">
                     <div class="dialog-footer-button d-flex justify-center">
                        <div class="dialog-footer-left" @click="dialog = false">
                           <v-icon>
                              mdi-chevron-left
                           </v-icon>
                           <span class="cap">이전</span>
                        </div>
                        <div class="dialog-footer-right fin" @click="createOrUpdate"><v-icon>mdi-pencil</v-icon> <span class="cap">글작성</span></div>
                     </div>
                  </div>
               </v-card-text>
            </v-card>
         </v-dialog>
      </v-row>
   </div>
</template>
<script>
// import CategoryItem from "./CategoryItem.vue";
import { createContents } from '@/api/contents.js';
import { updateContents } from '@/api/contents.js';
import { createTags } from '@/api/contents.js';
import { updateTags } from '@/api/contents.js';
import { recommendTags } from '@/api/tags.js';
import firebase from 'firebase';
import Loading from '@/components/main/Loading.vue';

export default {
   name: 'CategoryAndTimeInfo',
   components: {
      Loading,
   },
   props: {
      title: String,
      itemList: Array,
      cateInfo: Array,
      timeInfo: Object,
      tagList: Array,
      isEdit: Boolean,
      userId: Number,
      contentsId: Number,
   },
   data: function() {
      return {
         // contentsId: '',
         dialog: false,
         time: {
            hour: 0,
            minute: 0,
         },
         selectedCategories: [0, 0, 0, 0, 0, 0, 0, 0],
         hashtagResult: [],
         hashtag: '',
         hashtagId: '',
         isActive: false,
         hashtags: [],
         sendHashtags: [],
         // 임시 데이터(나중에는 vuex사용하기..?)
         hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
         minutes: [0, 10, 20, 30, 40, 50],
         categories: ['언어지능', '논리수학지능', '음악지능', '신체운동지능', '공간지능', '자연지능', '대인지능', '개인내지능'],
         sendItemList: [],
         uploadValue: 0,
         imageAddressList: [],
         imageCnt: 0,
         isLoading: false,
      };
   },
   methods: {
      createOrUpdate: function() {
         if (this.isEdit == true) {
            this.updateContent();
         } else {
            this.createContent();
         }
      },
      onNextClicked: function() {
         if (this.itemList.length > 0 && this.title.length > 0) {
            this.dialog = true;
            this.getContentsInfo();
         } else {
            alert('내용을 작성해 주세요.');
         }
      },
      // 해시태그 특수문자에는 반응하지 않도록 필터링후 서버에 요청
      filterList: function() {
         const isValid = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(this.hashtag);
         if (isValid === false) {
            this.isActive = true;
            this.searchTag(this.hashtag);
         } else {
            this.isActive = false;
         }
      },
      // 목록에서 해시태그를 선택했을 때
      changeValue: function(tag) {
         this.isActive = false;
         this.hashtagId = tag.id;
         this.hashtag = tag.name;
         this.addHashtag();
         this.hashtagResult = [];
         document.querySelector('#hashtagInput').focus();
      },
      removeValue: function() {
         if (document.querySelector('.hashtag-list').classList.contains('key')) {
            document.querySelector('.hashtag-list').classList.remove('key');
            document.querySelector('.hashtag-list li.sel').classList.remove('sel');
         }
      },
      // 해시태그 목록에서 위아래버튼 및 엔터버튼 눌렸을때 (해시태그 선택할 때)
      selectValue: function(keycode, tag) {
         if (this.isActive === true) {
            const hasClass = document.querySelector('.hashtag-list').classList.contains('key');
            if (keycode === 'down') {
               if (!hasClass) {
                  const thisEl = document.querySelectorAll('.hashtag-list li')[0];
                  document.querySelector('.hashtag-list').classList.add('key');
                  thisEl.classList.add('sel');
                  thisEl.focus();
               } else {
                  const lastEl = document.querySelector('.hashtag-list li:last-child');
                  const thisEl = document.querySelector('.hashtag-list li.sel');
                  const nextEl = thisEl.nextElementSibling;
                  if (!lastEl.classList.contains('sel')) {
                     thisEl.classList.remove('sel');
                     nextEl.classList.add('sel');
                     nextEl.focus();
                  }
               }
            }
            if (keycode === 'up' && hasClass) {
               const firstEl = document.querySelectorAll('.hashtag-list li')[0];
               const thisEl = document.querySelector('.hashtag-list li.sel');
               const prevEl = thisEl.previousElementSibling;
               if (!firstEl.classList.contains('sel')) {
                  thisEl.classList.remove('sel');
                  prevEl.classList.add('sel');
                  prevEl.focus();
               } else {
                  document.querySelector('#hashtagInput').focus();
               }
            }
            if (keycode === 'enter' && hasClass) {
               this.changeValue(tag);
            }
         }
      },
      addHashtag: function() {
         const newTag = this.hashtag.replaceAll(' ', '_');
         var newTagId = '';
         if (this.hashtagId != '') {
            newTagId = ':'.concat(this.hashtagId);
         }

         if (this.hashtags.indexOf(newTag) >= 0) {
            alert('이미 추가된 해시태그입니다');
         } else if (this.hashtag.length == 0) {
            alert('내용을 적어주세요');
         } else {
            if (this.hashtags.length < 12) {
               this.hashtags.push(newTag);
               if (newTagId != '') {
                  // 기존의 태그를 사용하는 경우
                  this.sendHashtags.push(newTagId);
               } else {
                  // 새로운 태그를 만들어 사용하는 경우
                  this.sendHashtags.push(newTag);
               }
            } else {
               alert('해시태그는 최대 10개까지 적을 수 있습니다.');
            }
         }
         this.hashtag = '';
         this.hashtagId = '';
      },
      /**
       * 해시태그 검색 요청 구현
       */
      searchTag(tag) {
         if (tag.length === 0) {
            this.hashtagResult = [];
            return;
         }
         recommendTags(
            tag,
            (res) => {
               this.hashtagResult = res.data;
            },
            (error) => {
               console.log(error);
            }
         );
      },
      onCategorySelect: function(category) {
         const selectedCateLen = this.selectedCategories.reduce((a, b) => a + b);
         const targetIndex = this.categories.indexOf(category);
         const targetDiv = document.querySelectorAll('.category-wrapper')[targetIndex];
         if (selectedCateLen < 2 && this.selectedCategories[targetIndex] == 0) {
            targetDiv.classList.add('selected-cate');
            this.selectedCategories[targetIndex] = 1;
         } else if (this.selectedCategories[targetIndex] == 1) {
            this.selectedCategories[targetIndex] = 0;
            targetDiv.classList.remove('selected-cate');
         } else {
            alert('카테고리는 총 2개까지 선택 가능합니다.');
         }
      },

      deleteTag: function(index) {
         this.hashtags.splice(index, 1);
         this.sendHashtags.splice(index, 1);
      },
      uploadFiles: function() {
         for (var i = 0; i < this.sendItemList.length; i++) {
            if (this.sendItemList[i].type === 'photo' && this.sendItemList[i].photo.file !== 0) {
               const storageRef = firebase
                  .storage()
                  .ref(`${this.sendItemList[i].photo.file.name}`)
                  .put(this.sendItemList[i].photo.file);
               storageRef.on(
                  `state_changed`,
                  (snapshot) => {
                     this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  },
                  (error) => {
                     console.log(error.message);
                  },
                  () => {
                     storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.imageAddressList.push(url);
                     });
                  }
               );
            }
         }
      },
      createContent: function() {
         if ((this.time.minute !== 0 || this.time.hour !== 0) && this.selectedCategories.reduce((a, b) => a + b) >= 1) {
            this.isLoading = true;
            this.sendItemList = this.itemList;
            this.getImageCnt();

            // 파이어베이스 파일업로드
            this.uploadFiles();

            setTimeout(() => {
               this.setImageAddressList();

               let cnt = 1;
               for (let i = 0; i < this.sendItemList.length; i++) {
                  this.sendItemList[i].pageNo = cnt++;
               }

               var abilitiesStr = '';
               for (let i = 0; i < this.selectedCategories.length; i++) {
                  abilitiesStr = abilitiesStr.concat(this.selectedCategories[i]);
               }

               const content = {
                  title: this.title,
                  contentsItemList: this.sendItemList,
                  spendTime: this.time.hour + ':' + this.time.minute + ':00',
                  ability: abilitiesStr,
               };

               //contents.js 안의 정의 되어있는 axios 호출
               const tags = {
                  tagList: this.sendHashtags,
               };

               createContents(
                  content,
                  (success) => {
                     const contentsId = success.data;

                     //컨텐츠 제작후 태그 제작 요청
                     createTags(
                        contentsId,
                        tags,
                        () => {
                           this.isLoading = false;
                           this.dialog = false;
                           this.$router.push('/main');
                        },
                        (error) => {
                           console.log('error tag msg ', error);
                           this.dialog = false;
                        }
                     );
                  },
                  (error) => {
                     console.log('create contents err msg', error);
                     alert('컨텐츠 제작에 실패 했습니다.');
                     this.dialog = false;
                     // contentsCreate에서 itemList가 새롭게 추가되는 버그 있음
                  }
               );
            }, 2000);
         } else {
            alert('필수정보(시간, 카테고리)를 입력해 주십시오.');
         }
      },
      //컨텐츠 수정요청
      updateContent: function() {
         if ((this.time.minute !== 0 || this.time.hour !== 0) && this.selectedCategories.reduce((a, b) => a + b) >= 1) {
            this.isLoading = true;
            this.sendItemList = this.itemList;
            this.getImageCnt();

            // 파이어베이스 파일업로드
            this.uploadFiles();

            setTimeout(() => {
               this.setImageAddressList();

               let cnt = 1;
               for (let i = 0; i < this.sendItemList.length; i++) {
                  this.sendItemList[i].pageNo = cnt++;
               }

               var abilitiesStr = '';
               for (let i = 0; i < this.selectedCategories.length; i++) {
                  abilitiesStr = abilitiesStr.concat(this.selectedCategories[i]);
               }

               const content = {
                  id: this.contentsId,
                  userId: this.userId,
                  title: this.title,
                  contentsItemList: this.sendItemList,
                  spendTime: this.time.hour + ':' + this.time.minute + ':00',
                  ability: abilitiesStr,
               };

               //contents.js 안의 정의 되어있는 axios 호출
               const tags = {
                  tagList: this.sendHashtags,
               };
               updateContents(
                  content,
                  () => {
                     //컨텐츠 제작후 태그 제작 요청
                     updateTags(
                        this.contentsId,
                        tags,
                        () => {
                           this.isLoading = false;
                           this.dialog = false;
                           this.$router.push('/main');
                        },
                        (error) => {
                           console.log('error tag msg ', error);
                           this.dialog = false;
                        }
                     );
                  },
                  (error) => {
                     console.log('create contents err msg', error);
                     alert('컨텐츠 제작에 실패 했습니다.');
                     this.dialog = false;
                     // contentsCreate에서 itemList가 새롭게 추가되는 버그 있음
                  }
               );
            }, 2500);
         } else {
            alert('필수정보(시간, 카테고리)를 입력해 주십시오.');
         }
      },
      // item type중 photo인것 갯수
      getImageCnt: function() {
         for (var i = 0; i < this.sendItemList.length; i++) {
            if (this.sendItemList[i].type === 'photo') {
               this.imageCnt++;
            }
         }
      },
      setImageAddressList() {
         // 개수 확인
         if (this.imageAddressList.length === this.imageCnt) {
            this.uploadValue = 100;
            var idx = 0;
            for (var i = 0; i < this.sendItemList.length; i++) {
               if (this.sendItemList[i].type === 'photo') {
                  this.sendItemList[i].imageAddress = this.imageAddressList[idx++];
               }
            }
         }
      },

      getContentsInfo: function() {
         this.time = this.timeInfo;
         this.selectedCategories = this.cateInfo;
         setTimeout(() => {
            var elems = document.querySelectorAll('.category-wrapper');
            for (let i = 0; i < 8; i++) {
               if (this.selectedCategories[i] === 1) {
                  const targetDiv = elems[i];
                  targetDiv.classList.add('selected-cate');
               }
            }
         }, 100);
         for (let i = 0; i < this.tagList.length; i++) {
            if (this.hashtags.indexOf(this.tagList[i].name) === -1) {
               this.hashtags.push(this.tagList[i].name);
               this.sendHashtags.push(':' + this.tagList[i].id);
            }
         }
      },
   },
};
</script>
<style lang="scss">
@import 'src/css/common.scss';
#cc-card-text {
   position: relative;
   @include desktop {
      max-width: 500px;
      left: 50%;
      margin-left: -250px;
   }
   @include tablet {
      max-width: 500px;
      left: 50%;
      margin-left: -250px;
   }
}
.v-dialog {
   margin-top: 55px;
   border: 0;
   box-shadow: none;
   .card {
      .v-card__text {
         width: 100%;
         padding: 0;
         .cc-dialog-top-wrapper {
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-left {
               width: 10%;
               text-align: center;
               margin-bottom: 10px;
               i {
                  font-size: 25pt;
                  color: #a2d646;
               }
            }
            .top-right {
               width: 90%;
               display: flex;
               justify-content: space-between;

               .select-input {
                  margin-left: 10px;
                  margin-right: 10px;
               }
            }
         }
         .cc-dialog-middle-wrapper {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .category-wrapper {
               cursor: pointer;
               width: 110px;
               margin: 10px;
               padding: 5px;
               border: lightgray 5px solid;
               border-radius: 20px;
               text-align: center;
               font-size: 12pt;
               font-weight: 900;
               color: rgb(159, 158, 158);
               // box-shadow: 0 4px 4px lightgray;
            }
            .selected-cate {
               color: #a2d646;
               border: #a2d646 5px solid;
            }
         }
         .cc-dialog-bottom-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            .bottom-top {
               width: 100%;
               display: flex;
               flex-direction: column;
               align-items: center;
               .upper {
                  width: 70%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .v-icon {
                     margin: 0 5px;
                  }
               }
               .hashtag-search {
                  width: 200px; // 반응형 수정 필요

                  .v-input__control {
                     position: relative;
                     padding-top: 25px;
                     // margin-left: 10px;
                     // margin-right: 10px;
                  }
                  .hashtag-list {
                     // display: none;
                     list-style: none;
                     padding-left: 0px;
                     z-index: 10;
                     // margin-left: -1px;
                     margin-top: -40px;
                     position: absolute;
                     // margin-left: 10px;
                     border-left: #f4b740 solid 2px;
                     border-bottom: #f4b740 solid 2px;
                     border-right: #f4b740 solid 2px;
                     border-radius: 0 0 8px 8px;
                     background-color: #ffffff;
                     width: 200px; // 반응형 수정 필요
                     li {
                        font-size: 12pt;
                        padding: 8px 12px;

                        &:hover,
                        &.sel {
                           background-color: #f4b8407f;
                           color: black;
                        }
                        &:focus,
                        &.sel:focus {
                           outline: none;
                        }
                     }
                  }
               }
            }
            .bottom-bt {
               border-radius: 10px;
               width: 100%;
               padding: 0 20px;
               display: flex;
               justify-content: center;
               flex-wrap: wrap;
               .hashtag {
                  width: initial;
                  border: #f4b740 solid 3px;
                  margin: 5px;
                  text-align: center;
                  padding: 3px;
                  border-radius: 25px;
                  .v-icon {
                     font-size: 12pt;
                     margin-bottom: 2px;
                  }
               }
            }
         }
         .cc-dialog-footer {
            //@responsive 콘텐츠 제작 마지막 페이지 푸터 10%로 줄이기
            @include desktop {
               padding: 0 10% !important;
            }
            // @include tablet {
            //    width: 500px;
            // }

            width: 100%;
            z-index: 100;
            position: fixed;
            bottom: 0;
            left: 0px;
            height: 50px;

            .dialog-footer-button {
               width: 100%;

               i {
                  color: $navi-main;
               }

               .cap {
                  padding: 0;
                  display: block;
                  font-size: 8pt;
                  font-weight: 600;
                  color: $navi-cap;
               }

               .dialog-footer-left {
                  cursor: pointer;
                  position: relative;
                  height: 50px;
                  width: 50%;
                  text-align: center;

                  &::after {
                     content: '';
                     width: 1px;
                     height: 20px;
                     position: absolute;
                     top: 12px;
                     right: -1px;
                     background-color: rgb(223, 223, 223);
                  }

                  &.out {
                     i,
                     .cap {
                        cursor: pointer;
                        color: rgb(75, 23, 22);
                     }
                  }
               }
               .dialog-footer-right {
                  
                  width: 50%;
                  text-align: center;

                  &.fin {
                     
                     i,
                     .cap {
                        cursor: pointer;
                        color: $navi-success;
                     }
                  }
               }
            }
         }
      }
   }
}
.hashtag {
   /* display: inline !important; */
   width: 300px;
   margin-right: 10px;
   font-weight: 700;
}
</style>
