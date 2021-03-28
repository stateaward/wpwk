<template>
  <div>
    <div class="nori-wrapper">
      <div
        :class="{ 'for-stripe': !isEven(idx) }"
        class="item-box"
        v-for="(nori, idx) in personsAssetsWithPhoto"
        :key="idx"
        @click="moveContents(idx)"
      >
        <div class="asp-left">
          <img v-if="typeof(nori.thumb) === 'string' " :src="nori.thumb" alt="" />
          <img v-if="typeof(nori.thumb) === 'object' " src="@/assets/img/characters/wpwk-default.png" alt="" />
        </div>
        <div class="asp-middle">
          <div>{{ nori.title | truncate(10, '...') }}</div>
          <span v-if="showValue === 4" class="asp-info">{{ nori.nickname }}</span>
          <div class="asp-info">{{ nori.createdAt | moment('add', '9 hours', 'YYYY.MM.DD')}} 조회 {{ nori.views }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'personsAssetsWithPhoto',
  props: {
    personsAssetsWithPhoto: Array,
    showValue: Number,
  },
  methods: {
    // 짝수인지(스트라이프 스타일링)
    isEven: function(idx) {
      if (idx % 2) {
        return false;
      } else {
        return true;
      }
    },
    moveContents: function(idx) {
      this.$router.push({
        name: 'ContentsView',
        params: {
          id: this.personsAssetsWithPhoto[idx].id,
        },
      });
    },
  },
  
};
</script>
<style lang=""></style>
