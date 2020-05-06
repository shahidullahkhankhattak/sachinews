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
    INVALID_LANGUAGE: 'Language does not exist.',
    EXISTS: 'Source already exists.',
    CREATED: 'Source added successfully.',
    UPDATED: 'Source updated successfully.',
    DELETED: 'Source deleted successfully.',
    haveNumChildren: ({ linksCount, selectorsCount, storiesCount }) => {
      const selectorMsg = selectorsCount && `${selectorsCount} selector${(selectorsCount > 1 && 's') || ''}`;
      const storyMsg = storiesCount && `${storiesCount} Stor${(storiesCount > 1 && 'ies') || 'y'}`;
      const linksMsg = linksCount && `${linksCount} link${(linksCount > 1 && 's') || ''}`;
      const relativeChildCountMsg = ((linksCount > 1 || selectorsCount > 1 || storiesCount > 1) && 'delete them all too') || 'delete it too';
      const combined = [selectorMsg, storyMsg, linksMsg].filter((c) => c).join(', ');
      return {
        msg: `This source have ${combined} are you sure you want to ${relativeChildCountMsg}?`,
      };
    },
  },
  languageMsgs: {
    EXISTS: 'Language already exists.',
    CREATED: 'Language added successfully.',
    UPDATED: 'Language updated successfully.',
    DELETED: 'Language deleted successfully.',
  },
  translationMsgs: {
    INVALID_LANGUAGE: 'Language does not exist.',
    EXISTS: 'Translation already exists.',
    CREATED: 'Translation added successfully.',
    UPDATED: 'Translation updated successfully.',
    DELETED: 'Translation deleted successfully.',
  },
  likeMsgs: {
    INVALID_STORY: 'Story does not exist.',
  },
  categoryMsgs: {
    EXISTS: 'Category already exists.',
    CREATED: 'Category added successfully.',
    UPDATED: 'Category updated successfully.',
    DELETED: 'Category deleted successfully.',
    haveNumChildren: ({ linksCount, storiesCount }) => {
      const storyMsg = storiesCount && `${storiesCount} Stor${(storiesCount > 1 && 'ies') || 'y'}`;
      const linksMsg = linksCount && `${linksCount} link${(linksCount > 1 && 's') || ''}`;
      const relativeChildCountMsg = ((linksCount > 1 || storyMsg > 1) && 'delete them all too') || 'delete it too';
      const combined = [storyMsg, linksMsg].filter((c) => c).join(', ');
      return {
        msg: `This category have ${combined} are you sure you want to ${relativeChildCountMsg}?`,
      };
    },
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
    INVALID_SOURCE: 'Source does not exist.',
  },
  scrapperMsgs: {
    // SUCCESS: 'Source scrapped successfully.',
  },
};
