<template>
  <div class="report-wrapper">
    <div class="report-content-wrapper">
      <div class="reporter-creator">
        <div class="reporter">{{ this.reporterNickname }}</div>님의 신고
        <i class="fas fa-hand-point-right"></i>
        <div class="creator">{{ this.creatorNickname }}</div>님의 컨텐츠
      </div>

      <div class="title-wrapper">
        <div class="contents-title nf nf-600">
          {{ this.contents.title }}
        </div>
        <v-btn outlined rounded color="primary" @click="moveContents">
          <v-icon> mdi-content-save-move-outline </v-icon> 컨텐츠 확인
        </v-btn>
      </div>

      <div class="reason nf">신고 사유: {{ this.comment }}</div>

      <!-- 신고 처리 버튼 -->
      <div v-if="done" class="done nf nf-600">
        {{ this.result }} 처리가 완료됐습니다.
      </div>
      <div v-else class="buttons">
        <v-btn outlined rounded small @click="waitContents"> 문제없음 </v-btn>
        <v-btn outlined rounded small @click="warnContents"> 경고 </v-btn>
        <v-btn outlined rounded small @click="deleteContents"> 삭제 </v-btn>
      </div>
      <div class="date">신고 날짜 : {{ this.createdAt | moment('add', '9 hours', 'YYYY-MM-DD HH:mm') }} </div>
    </div>
  </div>
</template>

<script>
import { contentsReportUpdate } from '@/api/admin.js';
export default {
  name: 'ReportListItem',
  props: {
    report: Object,
  },
  data: function() {
    return {
      reportId: 0,
      comment: '',
      status: '',
      reporterId: 0,
      reporterNickname: '',
      creatorNickname: '',
      contents: Object,
      createdAt: '',
      url: '',
      choose: '',
      done: '',
      result: ''
    };
  },
  methods: {
    getReport: function() {
      this.reportId = this.report.id;
      this.comment = this.report.comment;
      this.status = this.report.status;
      this.reporterId = this.report.reporterId;
      this.reporterNickname = this.report.reporterNickname;
      this.creatorNickname = this.report.creatorNickname;
      this.contents = this.report.contents;
      this.createdAt = this.report.createdAt;
      if (this.status == 'WAIT') {
        this.done = false;
      } else {
        this.done = true;
      }
    },
    waitContents: function() {
      var wait = confirm('문제없음 처리 하시겠습니까?');
      if (wait) {
        this.choose = 'CHECK';
      }
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        () => {
          this.done = true;
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
      this.result = '문제없음'
    },
    warnContents: function() {
      var warn = confirm('경고 처리 하시겠습니까?');
      if (warn) {
        this.choose = 'WARN';
      }
      // 게시글 작성자에게 경고 알림 전송
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        () => {
          this.done = true;
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
      this.result = '경고'
    },
    deleteContents: function() {
      var deleteC = confirm('삭제 처리 하시겠습니까?');
      if (deleteC) {
        this.choose = 'DELETE';
      }
      // 게시글 작성자에게 경고 알림 전송
      var data = {
        status: this.choose,
        id: this.reportId,
      };

      contentsReportUpdate(
        data,
        () => {
          this.done = true;
        },
        (fail) => {
          console.log('report 처리 실패', fail);
        }
      );
      this.result = '삭제'
    },
    moveContents: function() {
      this.$router.push({
        name: 'ContentsView',
        params: { id: this.report.contents.id },
      });
    },
  },
  created: function() {
    this.getReport();

    if(this.status == 'CHECK') {
      this.result = '문제없음'
    } else if(this.status == 'WARN') {
      this.result = '경고'
    } else {
      this.result = '삭제'
    }
  },
  watch: {
    choose: function() {
      this.getReport();
    },
  },
  // computed: {
  //     getUrl: function () {
  //         // contentsId 받아서 해당 페이지 로드
  //         this.url = `http://localhost:8080/view/${this.contentsId}`
  //     }
  // }
};
</script>

<style scoped></style>
