import { instance } from './index.js';

// const instance = createInstance();
// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };

function findMyContents(id, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/contents/${id}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findMyBoard(id, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/board/${id}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByFavorite(id, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/favoriteContents/${id}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findBoardsByComments(id, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/commentBoard/${id}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

export {
  findMyContents,
  findMyBoard,
  findContentsByFavorite,
  findBoardsByComments,
};
