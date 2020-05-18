module.exports.genSlug = function (text) {
  return text && text.replace(/[~!@#$%^&*()_+ ]/g, '-').toLowerCase();
};
