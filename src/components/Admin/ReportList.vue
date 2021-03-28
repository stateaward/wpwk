<template>
  <div>
    <ReportListItem
      v-for="(report, idx) in reports"
      :key="idx"
      :report="report"
    />
  </div>
</template>

<script>
import ReportListItem from './ReportListItem';

export default {
  name: 'ReportList',
  components: {
    ReportListItem,
  },
  props: {
    reports: Array,
  },
};
</script>

<style lang=""></style>
