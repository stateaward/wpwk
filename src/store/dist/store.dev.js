"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _router = _interopRequireDefault(require("../router/router"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    // 컴포넌트 간에 공유할 data
    isLogin: false,
    // 로그인 여부
    userInfo: null
  },
  mutations: {
    // state의 변화를 일으키는 곳, state 조작은 여기서만 하길 권장
    //로그인 성공 시
    loginSuccess: function loginSuccess(state, payload) {
      state.isLogin = true;
      state.userInfo = payload;
    },
    // 로그인이 실패했을 때
    loginError: function loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    //로그아웃 시
    logout: function logout(state) {
      // localStorage.removeItem('accessToken');
      localStorage.clear;
      state.isLogin = false;
      state.userInfo = null;
    }
  },
  actions: {
    doLogout: function doLogout(_ref) {
      var commit = _ref.commit;
      commit('logout');
      alert('정상적으로 로그아웃 되었습니다');
      localStorage.removeItem('accessToken');

      _router["default"].push({
        path: '/'
      }); // axios.defaults.headers.common["auth-token"] = undefined;

    },
    //비동기로 받은 데이터에 닉네임이 있는지 판별
    //있다면 메인으로, 없다면 최초 별명 설정 페이지로 이동
    checkNickName: function checkNickName(param) {
      if (param.nickname !== '') {
        _router["default"].push({
          name: 'Main'
        });
      } else {// 별명 설정 페이지로 이동
      }
    },
    getUserInfo: function getUserInfo(_ref2) {
      var commit = _ref2.commit;
      var token = localStorage.getItem('accessToken');

      if (token != null) {
        var decode = (0, _jwtDecode["default"])(token);
        var userInfo = {
          userId: decode.userId,
          nickname: decode.nickname
        };
        commit('loginSuccess', userInfo);
      }
    },
    expired: function expired(_ref3) {
      var commit = _ref3.commit;
      alert('세션이 만료되었습니다.');
      commit('logout');

      _router["default"].push({
        name: 'Login'
      });
    }
  }
});

exports["default"] = _default;