<template>
   <!-- 노리 제작 헤더 -->
   <div class="cc-container">
      <v-text-field id="input-title" v-model="title" label="제목" hint="ex) [11세]집에서 할 수 있는 축구게임"></v-text-field>
      <guideline class="guide" style="margin-right: 10px" />
      <v-divider></v-divider>
      <!-- 노리의 항목들 -->
      <draggable :list="itemList" :options="{ animation: 300 }" class="contents">
         <div v-for="(item, idx) in itemList" :key="idx" class="div-wrapper d-flex align-center justify-space-between">
            <!-- 노리의 유튜브 항목 -->
            <div class="circle">{{ idx + 1 }}</div>
            <div class="item-wrapper d-flex align-center justify-space-between" :class="{ 'text-wrapper': isText(item), 'youtube-wrapper': isYoutube(item), 'photo-wrapper': isPhoto(item) }">
               <span class="left-wrapper">
                  <img src="@/assets/img/contents-create/yt_img.png" alt="" v-if="item.type === 'youtube'" />
                  <img src="@/assets/img/contents-create/photo_img.png" alt="" v-if="item.type === 'photo'" />
                  <img src="@/assets/img/contents-create/text_img.png" alt="" v-if="item.type === 'text'" />
               </span>
               <div class="middle-wrapper">
                  <contents-youtube-item v-if="item.type == 'youtube'" :item="item" :idx="idx" @delete-item="deleteItem" @item-change="onItemChange" />
                  <!-- 노리의 사진항목 -->
                  <contents-photo-item v-else-if="item.type == 'photo'" :item="item" :idx="idx" @delete-item="deleteItem" @item-change="onItemChange" />
                  <!-- 노리의 텍스트 항목 -->
                  <contents-text-item v-else :item="item" :idx="idx" @delete-item="deleteItem" @item-change="onItemChange" />
               </div>
               <div class="right-wrapper d-flex flex-column justify-space-between">
                  <button @click="deleteItem(idx)">
                     <v-icon>mdi-close</v-icon>
                  </button>
                  <div :class="{ 'text-rightbottom': isText(item), 'youtube-rightbottom': isYoutube(item), 'photo-rightbottom': isPhoto(item) }"></div>
               </div>
            </div>
         </div>
      </draggable>
      <!-- 항목 추가 위한 버튼들 -->
      <div class="cc-footer d-flex flex-column">
         <div class="footer-buttons d-flex justify-center align-center">
            <div class="btn-wrapper">
               <YoutubeCreate @select-video="onSelectVideo" class="footerButtons" />
            </div>
            <div class="btn-wrapper">
               <v-icon @click="axiosFileSelect" class="footer-button-photo">
                  mdi-image-multiple
               </v-icon>
            </div>
            <div class="btn-wrapper">
               <v-icon @click="createTextItem" class="footer-button-text">mdi-note-text-outline</v-icon>
               <input type="file" id="fileUpload" ref="files" accept="image/*" style="display:none" @change="axiosFileChange" multiple />
            </div>
         </div>
         <div class="footer-navi d-flex justify-space-between">
            <div @click="cancleCreate" class="left-button out">
               <v-icon>mdi-close</v-icon>
               <span class="cap">취소</span>
            </div>
            <div class="right-button fin">
               <category-and-time-info :contentsId="contentsId" :userId="userId" :isEdit="isForEdit" :cateInfo="selectedCategories" :timeInfo="time" :tagList="hashtags" :title="title" :itemList="itemList" />
            </div>
         </div>
         <div v-if="itemList.length === 0" class="background-text">
            <p class="nf nf-600">
               아래 버튼을 눌러 <br />
               컨텐츠를 추가해주세요!
            </p>
            <v-icon>mdi-hand-pointing-down</v-icon>
         </div>
      </div>
   </div>
</template>

<script>
import draggable from 'vuedraggable';
import YoutubeCreate from '@/components/contents-create/YoutubeCreate.vue';
import ContentsYoutubeItem from '@/components/contents-create/ContentsYoutubeItem.vue';
import ContentsTextItem from '@/components/contents-create/ContentsTextItem.vue';
import ContentsPhotoItem from '@/components/contents-create/ContentsPhotoItem.vue';
import Guideline from '@/components/contents-create/Guideline.vue';
import CategoryAndTimeInfo from '@/components/contents-create/CategoryAndTimeInfo.vue';

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
      YoutubeCreate,
      ContentsYoutubeItem,
      ContentsTextItem,
      ContentsPhotoItem,
      Guideline,
      CategoryAndTimeInfo,
   },
   data: function() {
      return {
         contentsId: 0,
         title: '',
         itemList: [],
         uploadPercentage: 0,
         selectedCategories: [0, 0, 0, 0, 0, 0, 0, 0],
         time: {
            hour: 0,
            minute: 0,
         },
         userId: 0,
         hashtags: [],
         isForEdit: false,
      };
   },
   methods: {
      isText: function(item) {
         if (item.type == 'text') {
            return true;
         } else {
            return false;
         }
      },
      isYoutube: function(item) {
         if (item.type == 'youtube') {
            return true;
         } else {
            return false;
         }
      },
      isPhoto: function(item) {
         if (item.type == 'photo') {
            return true;
         } else {
            return false;
         }
      },
      axiosFileSelect: function() {
         var elem = document.getElementById('fileUpload');
         elem.click();
      },

      axiosFileChange: function() {
         this.axiosFileUpload();
      },

      // 파일 업로드 기능 + 업로드 되자마자 item 만들기
      axiosFileUpload: function() {
         //하나의 배열로 넣기
         for (let i = 0; i < this.$refs.files.files.length; i++) {
            const photoFile = {
               //실제 파일
               file: this.$refs.files.files[i],
               //이미지 프리뷰
               preview: URL.createObjectURL(this.$refs.files.files[i]),
            };
            this.uploadPercentage = parseInt(Math.round((ProgressEvent.loded / ProgressEvent.total) * 100));
            this.createItemPhoto(photoFile);
         }
      },

      // 사진 업로드 시 itemList에 넣기
      createItemPhoto: function(p) {
         const newItem = {
            type: 'photo',
            youtube: {},
            photo: p,
            video: '',
            description: '',
            imageAddress: '',
         };
         if (this.itemList.length <= 9) {
            this.itemList.push(newItem);
         } else {
            alert('항목은 최대 10개 까지 넣을 수 있습니다.');
         }
      },
      // 항목 삭제
      deleteItem: function(index) {
         this.itemList.splice(index, 1);
      },
      // 유튜브 추가
      onSelectVideo: function(video) {
         // 새 아이템 생성
         const newItem = {
            type: 'youtube',
            youtube: video,
            youtubeThumbnail: video.thumbnailSrc,
            youtubeId: video.videoId,
            youtubeTitle: video.title,
            photo: {},
            description: '',
         };
         if (this.itemList.length <= 9) {
            this.itemList.push(newItem);
         } else {
            alert('항목은 최대 10개 까지 넣을 수 있습니다.');
         }
      },
      // 텍스트 추가
      createTextItem: function() {
         const newItem = {
            type: 'text',
            youtube: {},
            photo: {},
            video: '',
            description: '',
         };
         if (this.itemList.length <= 9) {
            this.itemList.push(newItem);
         } else {
            alert('항목은 최대 10개 까지 넣을 수 있습니다.');
         }
      },
      // 유튜브나 사진 설명 및 텍스트 내용 바뀌면 적용
      onItemChange: function(itemInfo) {
         this.itemList[itemInfo[1]].description = itemInfo[0];
      },
      cancleCreate: function() {
         this.$router.push('/main');
      },
   },
};
</script>

<style lang="scss">
@import 'src/css/common.scss';

// 트렐로 배경색 : rgb(235,236,240)
.cc-container {
   // @include desktop {
   //    max-width: 500px;
   //    left: 50%;
   //    margin-left: -250px;
   // }
   // @include tablet {
   //    max-width: 500px;
   //    left: 50%;
   //    margin-left: -250px;
   // }
   padding: 0 10px;
   position: relative;

   .guide {
      position: absolute;
      top: 10px;
      right: 10px;

      @include desktop {
         // top: 10%;
         right: 20%;
      }
   }

   .v-input.v-text-field {
      margin-top: 20px;
      #input-title {
         margin-top: 0px !important;
      }
   }

   .contents {
      margin-bottom: 100px;
   }
   .div-wrapper {
      // animation: 0.3s ease-out 0s 1 slideInFromBottom;
      // @keyframes slideInFromBottom {
      //   0% {
      //     transform: translateY(30px);
      //     opacity: 0;
      //   }
      //   100% {
      //     transform: translateY(0);
      //     opacity: 1;
      //   }
      // }
      .circle {
         width: 30px;

         // line-height와 height를 일치시키면, 텍스트 한줄 중앙 정렬
         height: 30px;
         line-height: 30px;

         background-color: lightgray;
         border-radius: 25px;
         text-align: center;
         color: white;
         margin-right: 10px;

         padding-right: 0px !important;
      }
      .text-wrapper {
         background-color: #fff8d7;
      }
      .youtube-wrapper {
         background-color: #ffe6e6;
      }
      .photo-wrapper {
         background-color: #dae6fc;
      }
      .item-wrapper {
         // border: 1px solid gray;
         z-index: 50;
         width: 95%;
         height: 150px;
         padding: 10px;
         margin-top: 10px;
         margin-bottom: 10px;
         // border-radius: 5px;

         // background-color: rgb(247, 247, 247);
         // box-shadow: 0 4px 4px lightgray;

         .left-wrapper {
            width: 10%;
            img {
               width: 35px;
               height: 100%;
            }
         }

         .middle-wrapper {
            // background-color: red;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80%;
            height: 100%;

            .text-item-wrapper {
               width: 80%;
               height: 80%;
               // background-color: yellow;
               .text {
                  cursor: pointer;
                  max-height: 100%;
                  width: 100%;
                  text-align: center;
                  overflow: scroll;
                  font-size: 11pt;
               }
               .text::-webkit-scrollbar {
                  display: none;
               }
               textarea {
                  cursor: auto;
                  width: 100%;
                  height: 100%;
                  padding: 8px;
                  background-color: #ffffff4e;
                  // box-shadow: 0 4px 4px lightgray;
                  resize: none;
                  font-size: 11pt;
               }
               textarea:focus {
                  outline: none;
               }

               textarea::placeholder {
                  color: rgb(171, 171, 171);
                  font-style: italic;
                  font-size: 11pt;
                  text-align: center;
               }
            }
            .photo-item-wrapper {
               height: 100%;
               // background-color: red;
               .image-wrapper {
                  width: 50%;
                  height: 90%;
                  img {
                     width: 100%;
                     height: 100%;
                     object-fit: cover;
                  }
               }
               .desc-wrapper {
                  width: 40%;
                  height: 70%;
                  textarea {
                     cursor: auto !important;
                     width: 100%;
                     height: 100%;
                     padding: 8px;
                     background-color: #ffffff4e;
                     // box-shadow: 0 4px 4px lightgray;
                     resize: none;
                     font-size: 11pt;
                  }
                  textarea:focus {
                     outline: none;
                  }
                  .text {
                     cursor: pointer;
                     text-align: center;
                     width: 100%;
                     max-height: 100%;
                     overflow: scroll;
                     font-size: 11pt;
                  }
                  .text::-webkit-scrollbar {
                     display: none;
                  }
                  
               }
            }
         }

         .right-wrapper {
            height: 100%;
            width: 15px;
            text-align: center;
            // background-color: yellow;
            button:focus {
               outline: none;
            }
            .v-icon {
               position: relative;
               top: -5px;
               right: 5px;
               color: gray;
            }
            .text-rightbottom {
               margin-bottom: -10.2px;
               margin-right: -15px;
               border-left: 25px solid #fcf592;
               border-bottom: 25px solid #ffffff;
            }
            .youtube-rightbottom {
               margin-bottom: -10.2px;
               margin-right: -15px;
               border-left: 25px solid #f1afad;
               border-bottom: 25px solid #ffffff;
            }
            .photo-rightbottom {
               margin-bottom: -10.2px;
               margin-right: -15px;
               border-left: 25px solid #a8c7f1;
               border-bottom: 25px solid #ffffff;
            }
         }
      }
   }
   // 잡힌거
   .sortable-chosen {
      // transform: rotate(-4deg);
      // z-index: 500;
      opacity: 1;
      // background-color: red;
   }
   // 뒤에거
   .sortable-ghost {
      // transform: rotate(0deg);
      opacity: 0;
      // z-index: 500;
   }

   .cc-footer {
      //@responsive 콘텐츠 제작 10% 마진처리
      @include desktop {
         padding: 0 10% !important;
      }

      width: 100%;
      z-index: 100;
      position: fixed;
      bottom: 0px;
      left: 0px;
      display: flex;
      direction: column;
      justify-content: center;
      align-items: center;

      .footer-buttons {
         height: 50px;
         width: 200px;

         margin: 0 auto;
         padding-left: 20px;
         margin-bottom: 30px;

         border-radius: 30px;
         background-color: #ffffff;
         box-shadow: 0px 9px 20px 0px #56565664;

         $btn-color: rgb(85, 85, 85);

         .row.footerButtons {
            // background-color: red !important;

            width: 30px;
            height: 30px;
            margin-right: 18px !important;
            margin-left: 0px !important;

            .mdi-youtube {
               font-size: 20pt;
               color: $btn-color;
               &:hover {
                  color: #ab0f0a;
               }
            }
         }
         .footer-button-photo {
            font-size: 20pt;
            // margin-left: 20px;
            margin-right: 18px;
            color: $btn-color;
            &:hover {
               color: #0e4ba0;
            }
         }
         .footer-button-text {
            font-size: 20pt;
            // margin-left: 20px;
            margin-right: 18px;
            color: $btn-color;
            &:hover {
               color: #edc112;
            }
         }
      }
      .footer-navi {
         width: 100%;
         margin-top: 20px;
         height: 50px;
         box-shadow: 0px -16px 20px 0px #5656560a;

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

         .left-button {
            cursor: pointer;
            position: relative;
            height: 50px;
            width: 50%;
            text-align: center;
            background-color: white;

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
                  color: rgb(75, 23, 22);
               }
            }
         }
         .right-button {
            cursor: pointer;
            width: 50%;
            text-align: center;
            background-color: white;

            &.fin {
               i,
               .cap {
                  color: $navi-success;
               }
            }
         }
      }

      .background-text {
         // background-color: red;
         pointer-events: none;
         width: 100% !important;
         margin-left: -10px !important;
         position: absolute;
         bottom: 180px;
         text-align: center;
         width: 80%;
         /* left, right는 해당 요소의 위치 시작점을 결정한다. 그런데, 이때, margin의 양 값을 auto로 줌으로써 마진을 주어 해당 요소의 양 끝 위치를 각각 0으로 만들어준다. */
         margin: 0 auto;
         animation: 1s ease-out 0s 1 slideInFromTop;
         @keyframes slideInFromTop {
            0% {
               transform: translateY(-30px);
               opacity: 0;
            }
            100% {
               transform: translateY(0);
               opacity: 1;
            }
         }
         p {
            font-size: 16pt;
            color: rgb(179, 179, 179);
         }

         i.v-icon {
            color: rgb(179, 179, 179);
            font-size: 30pt;
         }
         // z-index: -1;
      }
   }
}
</style>
