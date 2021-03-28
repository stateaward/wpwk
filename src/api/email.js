import { instance } from './index.js';

function checkEmailAuthReq(uid, verificationKey, success, fail) {
  instance
    .get(`users/confirm?uid=` + uid + `&verificationKey=` + verificationKey)
    .then(success)
    .catch(fail);
}

export {
    checkEmailAuthReq,
};