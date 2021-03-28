import Vue from 'vue'
import vueMoment from 'vue-moment';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store/store"
import router from './router/router'
import firebase from "firebase"
import VueClipboard from 'vue-clipboard2'

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.use(VueClipboard)

Vue.filter('truncate', filter);

Vue.use(router)

Vue.use(vueMoment)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
})

new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    this.$store.dispatch("getUserInfo") //새로고침하더라도 항상 유지하도록 설정
  },
  render: h => h(App)
}).$mount('#app')