/* 1. 기본 셋팅
 - npm으로 라우터 설치(모듈 시스템 이용)시, 임포트 후 명시적으로 추가
*/
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// ==============================

/* 2. 컴포넌트 및 views 임포트
 - 컴포넌트 : 모든 사이트에 공통으로 들어가는 놈
 - 뷰 : 화면 바뀌는 녀석들
 */

//사이드 바 import
import SideMenu from '@/components/SideMenu.vue';

//아래 바뀌는 모든 화면단을 import
import Main from '../views/Main.vue';
import SearchResult from '../views/SearchResult.vue';
import Community from '../views/Community.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Mypage from '../views/Mypage.vue';
import ContentsCreate from '../views/ContentsCreate.vue';
import ContentsUpdate from '../views/ContentsUpdate.vue';
import ContentsView from '../views/ContentsView.vue';
import LandingPage from '@/views/user/LandingPage.vue';
import Login from '@/views/user/Login.vue';
import Join from '@/views/user/Join.vue';
import NaverLoginProcess from '@/components/user/NaverLoginProcess.vue';
import KakaoLoginProcess from '@/components/user/KakaoLoginProcess.vue';
import Auth from '@/views/user/Auth.vue';
import JoinSuccess from '@/views/user/JoinSuccess';
import JoinConfirm from '@/views/user/JoinConfirm';
import Admin from '@/views/user/Admin.vue';

const onlyAuthUser = (to, from, next) => {
  if (localStorage.getItem('accessToken') !== null) {
    next();
  } else {
    alert('로그인이 필요한 페이지입니다. ');
    next('/');
  }
};

const onlyNoneAuthUser = (to, from, next) => {
  if (localStorage.getItem('accessToken') === null) {
    next();
  } else {    
    next('/main');
  }
};

// ==============================
// 여러개 태울 때, routes 변수 생성
const routes = [{
    path: '/main',
    name: 'Main',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: Main,
    },
  },
  {
    path: '/search/:searchValue',
    name: 'SearchResult',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: SearchResult,
    },
    props: true,
  },
  {
    path: '/cmmu',
    name: 'Community',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: Community,
    },
    props: true,
  },
  {
    path: '/cmmu/:articleId',
    name: 'ArticleDetail',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: ArticleDetail,
    },
  },
  {
    path: '/mypage/:userId',
    name: 'mypage',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: Mypage,
    },
    props: true,
  },
  {
    path: '/contentsupdate/:id',
    name: 'ContentsUpdate',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: ContentsUpdate,
    },
    props: true,
  },
  {
    path: '/contentscreate',
    name: 'ContentsCreate',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: ContentsCreate,
    },
  },
  {
    path: '/view/:id',
    name: 'ContentsView',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: ContentsView,
    },
    props: true,
  },
  {
    path: '/',
    beforeEnter: onlyNoneAuthUser,
    components: {
      default: LandingPage,
    },
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: onlyNoneAuthUser,
    components: {
      default: Login,
    },
  },
  {
    path: '/join',
    name: 'Join',
    beforeEnter: onlyNoneAuthUser,
    components: {
      default: Join,
    },
  },
  {
    path: '/login/oauth2/code/naver',
    name: 'NaverLoginProcess',
    component: NaverLoginProcess,
  },
  {
    path: '/kakao',
    name: 'KakaoLoginProcess',
    components: {
      default: KakaoLoginProcess,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    components: {
      default: Auth,
    },
  },
  {
    path: '/joinSuccess',
    name: 'JoinSuccess',
    components: {
      default: JoinSuccess,
    },
  },
  {
    path: '/users/confirm',
    name: 'JoinConfirm',
    components: {
      default: JoinConfirm,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: onlyAuthUser,
    components: {
      side: SideMenu,
      default: Admin,
    },
  },
];

const router = new VueRouter({
  mode: 'history', //뒤에 # 을 없애줌
  // base: process.env.BASE_URL,
  routes,
});

export default router;