<template>
  <div class="notification-container">
    <div v-if="notifications.length" class="notification-wrapper">
      <div class="notification">
        <NotificationItem
          :class="{ 'for-stripe': !isEven(idx) }"
          v-for="(notification, idx) in notifications"
          :key="idx"
          :notification="notification"
        />
      </div>
    </div>
    <div v-else class="notification-wrapper">
      <div class="notificationEmpty nf">알림이 없습니다.</div>
    </div>
  </div>
</template>

<script>
import { getNotification } from "@/api/user.js";
import NotificationItem from "./NotificationItem.vue";

export default {
  name: "Notification",
  data: function() {
    return {
      notifications: [],
    };
  },
  components: {
    NotificationItem,
  },
  methods: {
    isEven: function(idx) {
      if (idx % 2) {
        return false;
      } else {
        return true;
      }
    },
    getNotifications() {
      getNotification(
        (res) => {
          this.notifications = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created: function() {
    this.getNotifications()
  },
};
</script>

<style lang="scss">
@import "src/css/notification.scss";
</style>
