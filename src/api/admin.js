import { instance } from './index.js';

function findAllReports(success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .get(`contentsReport`, config)
    .then(success)
    .catch(fail);
}

function contentsReportUpdate(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .put(`contentsReport`, data, config)
    .then(success)
    .catch(fail);
}

function notificationBroadcast(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .post(`notifications/broadcast`, data, config)
    .then(success)
    .catch(fail);
}

export { findAllReports, contentsReportUpdate, notificationBroadcast };
