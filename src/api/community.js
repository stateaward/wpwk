import { instance } from "./index.js";

function createBoard(data, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .post(`boards`, data, config)
    .then(success)
    .catch(fail);
}

// 커뮤니티 내 모든 게시글(Board)를 조회
function findAllBoards(success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards`, config)
    .then(success)
    .catch(fail);
}

// 아이디를 이용한 게시글 조회
function findBoardsById(id, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/${id}`, config)
    .then(success)
    .catch(fail);
}

// 게시글 조회
function findBoardsByPage(page, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/page/${page}`, config)
    .then(success)
    .catch(fail);
}

// 주제별 게시글 조회
function findBoardsByCategory(category, page, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/category/${category}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

// 좋아요 올리기
function updateLikes(id, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .post(`boards/like`, id, config)
    .then(success)
    .catch(fail);
}

// 좋아요 취소
function cancelLikes(id, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .delete(`boards/like/${id}`, config)
    .then(success)
    .catch(fail);
}

// 아이디를 이용한 게시글 조회
function deleteById(id, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .delete(`boards/${id}`, config)
    .then(success)
    .catch(fail);
}

// 게시글 수정
function modifyBoard(board, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .put(`boards`, board, config)
    .then(success)
    .catch(fail);
}

export {
  findAllBoards,
  findBoardsByPage,
  findBoardsByCategory,
  createBoard,
  findBoardsById,
  deleteById,
  updateLikes,
  cancelLikes,
  modifyBoard,
};
