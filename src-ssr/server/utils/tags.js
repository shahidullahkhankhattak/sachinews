module.exports.searchTags = (search, target) => {
  if (typeof search === 'object') {
    let found = true;
    search.forEach((keyword) => {
      if (!target.includes(keyword)) {
        found = false;
      }
    });
    return found;
  }
  return target.includes(search);
};
