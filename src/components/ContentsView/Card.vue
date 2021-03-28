<template>
   <div class="card-wrapper">
      <div v-show="this.notOnlyText" class="card-content">
         <div v-if="this.imageAddress">
            <img :src="imageAddress" />
         </div>
         <div v-else-if="this.youtubeId">
            <iframe :src="videoUrl" allowfullscreen> </iframe>
         </div>
      </div>
      <div class="card-desc">
         <div class="desc nf nf-400">{{ description }}</div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Card',
   props: {
      card: Object,
      pageNum: Number,
   },
   data: function() {
      return {
         description: '',
         contentsId: '',
         imageAddress: '',
         videoAddress: '',
         youtubeId: '',
         youtubeThumbnail: '',
         youtubeTitle: '',
         youtubeUrl: '',
         notOnlyText: false,

         nowPage: 0,
      };
   },
   methods: {
      getCard: function() {
         this.description = '';
         this.youtubeId = '';
         this.imageAddress = '';

         this.description = this.card.description;

         if (this.card.youtubeId) {
            this.youtubeId = this.card.youtubeId;
            this.notOnlyText = true;
         } else if (this.card.imageAddress) {
            this.imageAddress = this.card.imageAddress;
            this.notOnlyText = true;
         }
      },
      doEffect: function() {
         var elem = document.querySelector('.card-wrapper');

         if (elem.classList.contains('effect')) {
            elem.classList.remove('effect');
            elem.classList.add('otherEff');
         } else if (elem.classList.contains('otherEff')) {
            elem.classList.remove('otherEff');
            elem.classList.add('effect');
         } else {
            elem.classList.add('effect');
         }
      },
   },
   watch: {
      card: function() {
         this.getCard();
         this.doEffect();
      },
   },
   computed: {
      videoUrl: function() {
         return `https://www.youtube.com/embed/${this.youtubeId}`;
      },
   },
};
</script>

<style lang="scss">
@-webkit-keyframes slide-in-right {
   0% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
   }
   100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
   }
}
@keyframes slide-in-right {
   0% {
      -webkit-transform: translateX(100px);
      transform: translateX(100px);
      opacity: 0;
   }
   100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
   }
}

.effect {
   -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
   animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.otherEff {
   -webkit-animation: slide-in-right2 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
   animation: slide-in-right2 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-right2 {
   0% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
   }
   100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
   }
}
@keyframes slide-in-right2 {
   0% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
   }
   100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
   }
}
</style>
