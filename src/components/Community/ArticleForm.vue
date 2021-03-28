<template>
  <div class="af-container">
    <div class="category-wrapper">
      <v-select
        :items="subjects"
        dense
        outlined
        label="주제"
        v-model="subject"
      ></v-select>
    </div>

    <div class="input-wrapper">
      <textarea
        class="article-content"
        v-model="content"
        placeholder="글을 작성해주세요."
      />
    </div>

    <!-- 이미지 추가 -->
    <!-- <div class="add-img-btn" @click="axiosFileSelect"><v-icon> mdi-image-multiple </v-icon>&nbsp;add</div>
      <input type="file" id="fileUpload" ref="files" style="display:none" @change="axiosFileChange" multiple />

      <div class="photo-wrapper">
         <div class="photo-item" v-for="(item, idx) in itemList" :key="idx">
            <ArticlePhotoItem :item="item" :idx="idx" @deleteItem="deleteItem" />
            <button @click="deleteItem(idx)">
               <v-icon>mdi-trash-can</v-icon>
            </button>
         </div>
      </div> -->

    <div class="af-footer">
      <div class="left-button" @click="closeModal">
        <v-icon>mdi-close</v-icon> <span class="cap">종료</span>
      </div>
      <div class="middle-button" @click="reset">
        <v-icon>mdi-eraser</v-icon> <span class="cap">지우기</span>
      </div>
      <div class="right-button" @click="createArticle">
        <v-icon>mdi-pencil</v-icon> <span class="cap">글작성</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createBoard } from "@/api/community.js";

export default {
  name: "ArticleForm",
  data: function() {
    return {
      user: "",
      subject: "",
      itemList: [],
      content: "",
      subjects: [
        "맛집정보 나눔",
        "교육정보 나눔",
        "육아정보 나눔",
        "요리정보 나눔",
        "생활정보 나눔",
        "잡담",
      ],
      subject_final: "",
    };
  },
  components: {
    // ArticlePhotoItem,
  },
  methods: {
    axiosFileSelect: function() {
      var elem = document.getElementById("fileUpload");
      elem.click();
    },
    axiosFileChange: function() {
      this.axiosFileUpload();
    },
    axiosFileUpload: function() {
      //  하나의 배열로 넣기
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const photoFile = {
          //실제 파일
          file: this.$refs.files.files[i],
          //이미지 프리뷰
          preview: URL.createObjectURL(this.$refs.files.files[i]),
        };
        this.createItemPhoto(photoFile);
      }
    },
    createItemPhoto: function(p) {
      const newItem = {
        photo: p,
      };
      if (this.itemList.length <= 9) {
        this.itemList.push(newItem);
      } else {
        alert("항목은 최대 10개 까지 넣을 수 있습니다.");
      }
    },
    deleteItem: function(index) {
      this.itemList.splice(index, 1);
    },
    getSubject: function() {
      this.subject_final = this.subject;
    },

    //부모에게 모달 닫으라고 전달
    closeModal() {
      this.content = "";
      this.itemList = [];
      this.subject = "";
      this.$emit("emit-close", false);
    },

    //입력 폼 초기화
    reset() {
      this.content = "";
      this.itemList = [];
      this.subject = ""; //초기화 시 v-select도 초기화되어야 하는데 미동작
    },

    createArticle: function() {
      if (this.subject === "") {
        alert("카테고리를 선택해 주세요");
        return;
      }

      if (this.content === "") {
        alert("내용을 입력해주세요");
        return;
      }

      const article = {
        category: this.subject,
        itemList: this.itemList,
        content: this.content,
      };
      // 글 작성 텍스트 인풋에서 포커스아웃시킴
      // completeBtn.focus()

      createBoard(
        article,
        () => {
          alert("게시 글 등록이 완료되었습니다.");
          if(this.$router.currentRoute.name !== 'Community') {
            this.$router.push('/cmmu');
            return
          }
          this.$router.go(this.$router.currentRoute);
        },
        (error) => {
          console.log(error);
        }
      );

      this.content = "";
      this.itemList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/common.scss";
//v-select 했을 때, 세부 선택 박스 하단으로 붙이기
.v-list.v-select-list.v-sheet.theme--light {
  margin-top: 40px;
}

.af-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: lightblue;

  .category-wrapper {
    height: 40px; //v-select의 높이 조절
    width: 90% !important;

    .v-input {
      // background-color: red;
      padding: 0px 40px;
      // margin-bottom: 0px !important;
    }
  }

  .input-wrapper {
    // background-color: red;
    min-height: 100px;
    height: 50%;
    width: 80%;
    margin: 20px;
    padding: 20px;
    border: 1px solid rgb(165, 165, 165);
    border-radius: 20px;

    input {
      // background-color: blue;
      width: 100%;
      height: 100%;
      text-align: center;

      font-size: 12pt;

      &:focus {
        outline: none;
      }
    }
  }

  .add-img-btn {
    display: inline;
    background-color: white;
    padding: 15px;
    border-radius: 30px;
    box-shadow: 0px 9px 20px 0px #56565629;

    font-size: 10pt;
    color: rgb(70, 70, 70);
    font-weight: 600;
  }

  .photo-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    margin-top: 20px;

    white-space: nowrap;
    overflow-x: scroll;

    .photo-item {
      display: inline-block;
      // transform: rotate(-1deg);
      border: 1px solid rgb(223, 223, 223);
      box-shadow: 0px 9px 20px 0px #56565629;

      margin-right: 10px;

      //사진을 감싸고 있는 녀석
      width: 200px;
      height: 200px;
      padding: 10px 10px 30px 10px;

      //삭제 버튼
      button {
        margin-top: 5px;
        margin-right: 2px;
        float: right;

        &:focus {
          outline: none;
        }
      }
    }
  }

  // 최하단 좌우 이동 버튼
  .af-footer {
    display: flex;
    position: absolute;
    z-index: 100;
    bottom: 30px;
    margin-bottom: 25px;
    padding: 0 10%;

    height: 50px;
    width: 100%;

    .cap {
      padding: 0;
      display: block;
      font-size: 8pt;
      font-weight: 600;
      color: $navi-cap;
    }

    i {
      color: $navi-main;
    }

    .left-button {
      cursor: pointer;
      height: 50px;
      width: 30%;
      text-align: center;
      position: relative;

      i,
      .cap {
        color: $navi-danger;
      }

      &::after {
        content: "";
        width: 1px;
        height: 20px;
        position: absolute;
        top: 12px;
        right: -1px;
        background-color: rgb(223, 223, 223);
      }
    }

    .middle-button {
      cursor: pointer;
      height: 50px;
      width: 30%;
      text-align: center;
      position: relative;

      &::after {
        content: "";
        width: 1px;
        height: 20px;
        position: absolute;
        top: 12px;
        right: -1px;
        background-color: rgb(223, 223, 223);
      }
    }

    .right-button {
      cursor: pointer;
      width: 40%;
      text-align: center;

      i,
      .cap {
        color: $navi-success;
      }
    }
  }
}

.article-content {
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
}
</style>
