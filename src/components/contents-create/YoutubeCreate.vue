<template>
   <v-row class="modal">
      <v-icon @click="onYoutubeClick">mdi-youtube</v-icon>

      <v-dialog transition="dialog-bottom-transition" v-model="dialog" class="dialog" persistent max-width="600px" @click.stop="dialog = true">
         <!-- 영상 추가하기 버튼 -->
         <v-card class="card">
            <v-card-title class="modal-header-wrapper justify-space-between">
               <span class="headline">
                  유튜브 영상 추가하기
               </span>
               <v-btn color="#F47E9B" class="header-button" text @click="onCancel">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
            </v-card-title>
            <v-card-text>
               <v-container>
                  <v-row>
                     <!-- 검색창 -->
                     <div class="searchbar-wrapper d-flex align-center justify-space-around" style="width: 100%">
                        <v-text-field v-model="query" @keypress.enter="onSearchInput" style="margin-right: 30px;"></v-text-field>
                        <v-btn outlined rounded color="blue" @click="onSearchInput">Search</v-btn>
                     </div>
                     <!-- 검색 결과 하위 컴포넌트로 보내줌 -->
                     <YoutubeItem
                        v-for="(video, idx) in videos"
                        :key="idx"
                        :video="video"
                        @select-video="onSelectVideo"
                        class="youtube-result-basic"
                        v-bind:class="{ 'youtube-result': isEven(idx) }"
                     />
                     <infinite-loading v-if="infLoading" spinner="spiral" @infinite="infiniteHandler"></infinite-loading>
                  </v-row>
               </v-container>
            </v-card-text>
         </v-card>
      </v-dialog>
   </v-row>
</template>

<script>
import axios from 'axios';
import infiniteLoading from 'vue-infinite-loading';
import YoutubeItem from './YoutubeItem.vue';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

export default {
   name: 'YoutubeCreate',
   components: {
      YoutubeItem,
      infiniteLoading,
   },
   data: function() {
      return {
         dialog: false,
         infLoading: false,
         videos: [],
         query: '',
         nextPageToken: '',
      };
   },
   methods: {
      onSearchInput: function() {
         axios
            .get(YOUTUBE_API_URL, {
               params: {
                  key: YOUTUBE_API_KEY,
                  part: 'snippet',
                  type: 'video',
                  maxResults: 5,
                  q: this.query,
               },
            })
            .then((res) => {
               this.videos = res.data.items;
               this.nextPageToken = res.data.nextPageToken;
               this.infLoading = true;
            })
            .catch((err) => console.log(err));
      },

      onSelectVideo: function(video) {
         this.$emit('select-video', video);
         this.dialog = false;
         this.infLoading = false;
         this.query = '';
         this.videos = [];
      },

      onCancel: function() {
         this.dialog = false;
         this.infLoading = false;
         this.query = '';
         this.videos = [];
      },
      isEven: function(idx) {
         if (idx % 2) {
            return false;
         } else {
            return true;
         }
      },
      onYoutubeClick: function() {
     
         this.dialog = true;

      },

      // 무한 스크롤 (다음 페이지에 있는 요청결과 가져와서 원래 video list 와 합치기)
      infiniteHandler($state) {
         axios
            .get(YOUTUBE_API_URL, {
               params: {
                  key: YOUTUBE_API_KEY,
                  part: 'snippet',
                  type: 'video',
                  maxResults: 5,
                  q: this.query,
                  pageToken: this.nextPageToken,
               },
            })
            .then((res) => {
               setTimeout(() => {
                  if (res.data.items.length) {
                     this.nextPageToken = res.data.nextPageToken;
                     this.videos = this.videos.concat(res.data.items);
                     $state.loaded();
                  }
                  if (this.videos.length == 20) {
                     $state.complete();
                  }
               }, 1000);
            });
      },
   },
};
</script>
<style lang="scss">
.v-dialog {
   .card {
      .modal-header-wrapper {
         .headline {
            font-size: 14pt !important;
            font-weight: 600;
         }
         .header-button {
            font-size: 12pt;
         }
      }
      .v-card__text {
         height: 60vh;

         .container {
            width: 90%;
            padding: 10px;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;

            .youtube-result-basic {
               padding: 12px;
            }
            .youtube-result {
               background-color: #f2f1f2;
            }
            .row {
               position: relative;
               .infinite-loading-container {
                  margin-top: 10px;
                  width: 100%;
               }

               .searchbar-wrapper {
                  width: 100%;
                  padding: 0px 20px;

                  .v-input__slot::before {
                     border-bottom: 2px solid rgba(0, 0, 0, 0.87) !important;
                  }

                  .v-btn {
                     color: #f2f1f2;
                     border: none;
                     font-size: 12pt;
                     font-weight: 600;
                     color: rgb(33, 33, 33) !important;
                  }
               }
               .youtube-search-item-wrapper {
                  width: 100%;
                  height: 100%;
                  // border-bottom: 1px solid gray;
                  .image-wrapper {
                     border: 1px rgb(199, 199, 199) solid;
                     width: 40%;
                     img {
                        width: 100%;
                        height: 100px;
                        object-fit: cover;
                     }
                  }
                  .middle-wrapper {
                     width: 40%;
                     div {
                        height: 40%;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;

                        font-weight: 600;
                        color: rgb(46, 46, 46);
                     }
                  }
                  .right-wrapper {
                     width: 15%;
                     button {
                        background-color: #3cc45c;
                        // white-space: nowrap;
                        padding: 5px;
                        border-radius: 30px;
                        box-shadow: 0 4px 4px lightgray;

                        i {
                           font-size: 16pt;
                           color: white;
                        }
                     }
                  }
               }
            }
         }
      }
   }
}
</style>
