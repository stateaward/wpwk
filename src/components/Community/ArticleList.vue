<template>
   <div>
      <div v-if="subject_select">
         <Article v-for="(article, idx) in selected_articles" :key="idx" :article="article" :subject_select="subject_select" />
      </div>
      <div v-else>
         <Article v-for="(article, idx) in articles" :key="idx" :article="article" />
      </div>
   </div>
</template>

<script>
import Article from './Article';

export default {
   name: 'ArticleList',
   props: {
      articles: Array,
      subject_select: String,
   },
   data: function() {
      return {
         selected_articles: [],
      };
   },
   components: {
      Article,
   },
   methods: {
      getSelectedArticles: function() {
         if (this.subject_select === "전체보기") {
            this.selected_articles = this.articles;
         } else {
            for (var i = 0; i < this.articles.length; i++) {
               if (this.articles[i].category === this.subject_select) {
                  this.selected_articles.push(this.articles[i]);
               }
            }
         }
      },
   },
   // created: function () {
   //   this.getArticles()
   // },
   watch: {
      subject_select: function() {
         this.selected_articles = [];
         this.getSelectedArticles();
      },
      articles: function() {
         this.selected_articles = [];
         // this.getArticles()
         this.getSelectedArticles();
      },
   },
};
</script>

<style></style>
