"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContents = createContents;
exports.createTags = createTags;
exports.findAllContents = findAllContents;
exports.findContentsById = findContentsById;
exports.findContentsByPage = findContentsByPage;
exports.findContentsByTag = findContentsByTag;
exports.findContentsItemById = findContentsItemById;
exports.findContentsByKeyword = findContentsByKeyword;
exports.findContentsByCategory = findContentsByCategory;
exports.findContentsComment = findContentsComment;
exports.deleteContentsComment = deleteContentsComment;
exports.updateContentsComment = updateContentsComment;
exports.createContentsComment = createContentsComment;
exports.favoriteContents = favoriteContents;
exports.unFavoriteContents = unFavoriteContents;

var _index = require("./index.js");

function createContents(param, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.post("contents", param, config).then(success)["catch"](fail);
}

function createTags(id, param, success, fail) {
  _index.instance.post("tags/contents/".concat(id), param).then(success)["catch"](fail);
}

function findAllContents(success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents", config).then(success)["catch"](fail);
}

function findContentsById(id, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents/".concat(id), config).then(success)["catch"](fail);
}

function findContentsItemById(id, success, fail) {
  _index.instance.get("/contentsItem/".concat(id)).then(success)["catch"](fail);
}

function findContentsByPage(page, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents/page/".concat(page), config).then(success)["catch"](fail);
}

function findContentsByTag(tag, page, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents/tags/".concat(tag, "/page/").concat(page), config).then(success)["catch"](fail);
}

function findContentsByKeyword(keyword, page, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents/keyword/".concat(keyword, "/page/").concat(page), config).then(success)["catch"](fail);
}

function findContentsComment(id, success, fail) {
  _index.instance.get("contentsComments/".concat(id)).then(success)["catch"](fail);
}

function deleteContentsComment(id, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance["delete"]("contentsComments/".concat(id), config).then(success)["catch"](fail);
}

function findContentsByCategory(category, page, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.get("contents/category/".concat(category, "/page/").concat(page), config).then(success)["catch"](fail);
}

function updateContentsComment(data, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.put("contentsComments", data, config).then(success)["catch"](fail);
}

function favoriteContents(id, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.post("contents/favorite", id, config).then(success)["catch"](fail);
}

function createContentsComment(data, success, fail) {
  var token = window.localStorage.getItem('accessToken');
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance.post("contentsComments", data, config).then(success)["catch"](fail);
}

function unFavoriteContents(id, success, fail) {
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };

  _index.instance["delete"]("contents/favorite/".concat(id), config).then(success)["catch"](fail);
}