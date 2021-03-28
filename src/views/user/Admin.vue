<template>
  <div class="ad-container nf nf-600">
    <div class="ad-top-wrapper">
      <p>전체 공지사항 등록</p>
      <div class="noti-wrapper">
        <input @keypress.enter="createNotification" class="noti-input-box nf" type="text" v-model="broadcastNotification" placeholder="공지사항을 작성해주세요." />
        <button @click="createNotification"><v-icon>mdi-send</v-icon></button>
      </div>
    </div>
    <div class="ad-bottom-wrapper">
      <p>신 고 목 록</p>
      <ReportList :reports="reports" />
    </div>
  </div>
</template>

<script>
import ReportList from '@/components/Admin/ReportList.vue';
import { findAllReports, notificationBroadcast } from '@/api/admin.js';
import { mapState } from 'vuex';
export default {
  name: 'Admin',
  components: {
    ReportList,
  },
  data: function() {
    return {
      reports: [],
      broadcastNotification: '',
    };
  },
  created() {
    this.findAllReports();
    this.isAdmin();
  },
  methods: {
    findAllReports: function() {
      findAllReports(
        (success) => {
          this.reports = success.data;
        },
        (fail) => {
          console.log(fail);
        }
      );
    },

    isAdmin: function() {
      if (this.userInfo.status != 2) {
        alert('접근할 수 없는 페이지입니다');
        this.$router.push('/main');
      }
    },
    createNotification: function() {
      var data = {
          message: this.broadcastNotification
      };

      notificationBroadcast(
        data,
        () => {
        },
        (err) => {
          console.log(err)
        }
      );
      this.broadcastNotification = ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style lang="scss">
@import 'src/css/admin.scss';
</style>
