"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAllBoards = findAllBoards;
exports.updateLikes = updateLikes;

var _index = require("./index.js");

var instance = (0, _index.createInstance)(); // 커뮤니티 내 모든 게시글(Board)를 조회

function findAllBoards(success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };
  instance.get("boards", config).then(success)["catch"](fail);
} // 좋아요 올리기


function updateLikes(id, params, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };
  instance.put("boards/".concat(id, "/likes"), JSON.stringify(params), config).then(success)["catch"](fail);
}