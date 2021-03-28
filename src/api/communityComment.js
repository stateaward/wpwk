import { instance } from "./index.js";

// 게시글 댓글 가져오기
function findBoardCommentsByBoardId(boardId, page, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boardComments/boards/${boardId}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

// 게시글 댓글 작성
function createBoardComment(boardId, comment, success, fail) {
    let token = window.localStorage.getItem("accessToken");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    instance
    .post(`boardComments/${boardId}`, comment, config)
    .then(success)
    .catch(fail);
}

// 게시글 댓글 삭제
function removeBoardComment(id, boardId, success, fail) {
    let token = window.localStorage.getItem("accessToken");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    instance
    .delete(`boardComments/${id}/boards/${boardId}`, config)
    .then(success)
    .catch(fail);
}

// 게시글 댓글 삭제
function modifyComment(boardComment, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
  .put(`boardComments`, boardComment, config)
  .then(success)
  .catch(fail);
}

export {
  findBoardCommentsByBoardId,
  createBoardComment,
  removeBoardComment,
  modifyComment,
};
