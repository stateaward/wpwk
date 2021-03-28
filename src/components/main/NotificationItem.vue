<template>
  <div class="icon-message">
      <!-- <v-icon> {{ icon }} </v-icon> -->
      <div class="notification-type">
        <v-icon v-if="type =='ADMIN_MESSAGE'" class='icon1'> mdi-bullhorn </v-icon>
        <v-icon v-else-if="type === 'DELETE'" class='icon2'> mdi-alarm-light </v-icon>
        <v-icon v-else-if="type === 'WARN'" class='icon3'> mdi-alarm-light </v-icon>
        <v-icon v-else-if="type === 'LIKE'" class='icon4'> mdi-account-heart </v-icon>
        <v-icon v-else-if="type === 'COMMENT'" class='icon5'> mdi-comment-edit </v-icon>
        <v-icon v-else class='icon6'> mdi-account-arrow-left </v-icon>
      </div>
      <div class="notification-message">
        <span @click='goMypage'> {{ message }} </span>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NotificationItem',
    data: function () {
        return {
            type: '',
            message: '',
            // icon: '',
        }
    },
    methods: {
        getNotification: function () {
            this.type = this.notification.messageType
            this.message = this.notification.message
        },
        goMypage: function () {
            this.$router.push({ name: 'mypage', params: { userId: this.userInfo.userId }})
        }
    },
    props: {
        notification: Object,
    },
    created: function() {
        this.getNotification()
        // this.getIcon()
    },
    computed: {
      ...mapState(['userInfo']),
   },
}
</script>

<style>

</style>