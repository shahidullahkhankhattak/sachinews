module.exports = {
  params: {
    TOKEN_EXPIRED: 'JWT_EXPIRED',
  },
  serverError: {
    msg: 'There was some temporary problem on server side, please check back later',
  },
  userNotFound: 'Invalid email or password.',
  tokenExpired: 'Session token expired.',
  sourceMsgs: {
    EXISTS: 'Source already exists.',
    CREATED: 'Source added successfully.',
    UPDATED: 'Source updated successfully.',
    DELETED: 'Source deleted successfully.',
    haveNumChildren: ({ linksCount, selectorsCount }) => {
      const selectorMsg = selectorsCount && `${selectorsCount} selector${(selectorsCount > 1 && 's') || ''}`;
      const linksMsg = linksCount && `${linksCount} link${(linksCount > 1 && 's') || ''}`;
      const relativeChildCountMsg = ((linksCount > 1 || selectorsCount > 1) && 'delete them all too') || 'delete it too';
      return {
        msg: `This source have ${(selectorMsg && linksMsg && `${selectorMsg} and ${linksMsg}`) || selectorMsg || linksMsg} are you sure you want to ${relativeChildCountMsg}?`,
      };
    },
  },
  categoryMsgs: {
    EXISTS: 'Category already exists.',
    CREATED: 'Category added successfully.',
    UPDATED: 'Category updated successfully.',
    DELETED: 'Category deleted successfully.',
  },
  sourceLinksMsgs: {
    EXISTS: 'Source link already exists.',
    CREATED: 'Source link added successfully.',
    UPDATED: 'Source link updated successfully.',
    DELETED: 'Source link deleted successfully.',
    INVALID_SOURCE: 'Source does not exists.',
  },
  selectorsMsgs: {
    EXISTS: 'Selector already exists.',
    CREATED: 'Selector added successfully.',
    UPDATED: 'Selector updated successfully.',
    DELETED: 'Selector deleted successfully.',
    INVALID_SOURCE: 'Source does not exists.',
  },
  scrapperMsgs: {
    // SUCCESS: 'Source scrapped successfully.',
  },
};
