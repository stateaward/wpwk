"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.findById = findById;
exports.registerUser = registerUser;
exports.naverLogin = naverLogin;
exports.kakaoLogin = kakaoLogin;
exports.deleteUser = deleteUser;
exports.changePwd = changePwd;
exports.follow = follow;
exports.contentsEvaluations = contentsEvaluations;

var _index = require("./index.js");

// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };
function registerUser(user, success, fail) {
  _index.instance.post("users", JSON.stringify(user)).then(success)["catch"](fail);
}

function login(user, success, fail) {
  var body = {
    email: user.email,
    password: user.password
  };

  _index.instance.post("login", JSON.stringify(body)).then(success)["catch"](fail);
}

function follow(userId, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.post("users/following/".concat(userId), config).then(success)["catch"](fail);
}

function changePwd(param, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.put("users/changePassword", param, config).then(success)["catch"](fail);
}

function deleteUser(success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance["delete"]("users", config).then(success)["catch"](fail);
}

function findById(userId, success, fail) {
  var token, config;
  return regeneratorRuntime.async(function findById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = window.localStorage.getItem('accessToken');
          config = {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(_index.instance.get("loginUser/".concat(userId), config).then(success)["catch"](fail));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function naverLogin(token, success, fail) {
  _index.instance.get("login/process/naver/" + token).then(success)["catch"](fail);
}

function kakaoLogin(code, success, fail) {
  _index.instance.get("kakao/" + code).then(success)["catch"](fail);
}

function contentsEvaluations(data, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.put("users/contentsEnd", data, config).then(success)["catch"](fail);
}