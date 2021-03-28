import { instance } from './index.js';

function recommendTags(tag, success, fail) {
  instance
    .post(`tags/search`, tag)
    .then(success)
    .catch(fail);
}

export {
  recommendTags,
};