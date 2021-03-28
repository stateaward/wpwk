import { instance } from './index.js';

function createContents(param, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .post(`contents`, param, config)
    .then(success)
    .catch(fail);
}
function updateContents(param, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  instance
    .put(`contents`, param, config)
    .then(success)
    .catch(fail)
}

function deleteContents(contentsId, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  instance
    .delete(`contents/${contentsId}`, config)
    .then(success)
    .catch(fail)
}

function createTags(id, param, success, fail) {
  instance
    .post(`tags/contents/${id}`, param)
    .then(success)
    .catch(fail);
}
function updateTags(id, param, success, fail) {
  instance
    .put(`tags/contents/${id}`, param)
    .then(success)
    .catch(fail);
}

function findAllContents(success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents`, config)
    .then(success)
    .catch(fail);
}

function findContentsById(id, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/${id}`, config)
    .then(success)
    .catch(fail);
}

function findContentsItemById(id, success, fail) {
  instance
    .get(`contentsItem/${id}`)
    .then(success)
    .catch(fail);
}

function findContentsByPage(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByTag(tag, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/tags/${tag}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByKeyword(keyword, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/keyword/${keyword}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByFavorites(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/favorites/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsComment(id, success, fail) {
  instance
    .get(`contentsComments/${id}`)
    .then(success)
    .catch(fail);
}

function deleteContentsComment(id, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .delete(`contentsComments/${id}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByCategory(category, page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`contents/category/${category}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function updateContentsComment(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .put(`contentsComments`, data, config)
    .then(success)
    .catch(fail);
}

function favoriteContents(id, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .post(`contents/favorite`, id, config)
    .then(success)
    .catch(fail);
}

function createContentsComment(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .post(`contentsComments`, data, config)
    .then(success)
    .catch(fail);
}

function unFavoriteContents(id, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .delete(`contents/favorite/${id}`, config)
    .then(success)
    .catch(fail);
}

function reportSubmit(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .post('contentsReport', data, config)
    .then(success)
    .catch(fail);
}

function getPopularContents(pageNum, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .get(`contents/likes/page/${pageNum}`, config)
    .then(success)
    .catch(fail)
}

function getMostViewedCountContents(pageNum, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .get(`contents/views/page/${pageNum}`, config)
    .then(success)
    .catch(fail)
}

export {
  createContents,
  updateContents,
  deleteContents,
  createTags,
  updateTags,
  findAllContents,
  findContentsById,
  findContentsByPage,
  findContentsByTag,
  findContentsItemById,
  findContentsByKeyword,
  findContentsByCategory,
  findContentsByFavorites,
  findContentsComment,
  deleteContentsComment,
  updateContentsComment,
  createContentsComment,
  favoriteContents,
  unFavoriteContents,
  reportSubmit,
  getPopularContents,
  getMostViewedCountContents
};
