module.exports.genSlug = function (text) {
  return text && text.replace(/ /g, '-').toLowerCase();
};
