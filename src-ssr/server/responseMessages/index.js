const ecud = (name) => ({
  EXISTS: `${name} already exists.`,
  CREATED: `${name} added successfully.`,
  UPDATED: `${name} updated successfully.`,
  DELETED: `${name} deleted successfully.`,
});

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
    ...ecud('Source'),
    INVALID_LANGUAGE: 'Language does not exist.',
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
  countryMsgs: {
    ...ecud('Country'),
    INVALID_LANGUAGE: 'Language does not exist.',
    INVALID_REGION: 'Region does not exist.',
    haveNumChildren: ({ linksCount, selectorsCount, storiesCount }) => {
      const selectorMsg = selectorsCount && `${selectorsCount} selector${(selectorsCount > 1 && 's') || ''}`;
      const storyMsg = storiesCount && `${storiesCount} Stor${(storiesCount > 1 && 'ies') || 'y'}`;
      const linksMsg = linksCount && `${linksCount} link${(linksCount > 1 && 's') || ''}`;
      const relativeChildCountMsg = ((linksCount > 1 || selectorsCount > 1 || storiesCount > 1) && 'delete them all too') || 'delete it too';
      const combined = [selectorMsg, storyMsg, linksMsg].filter((c) => c).join(', ');
      return {
        msg: `This country have ${combined} are you sure you want to ${relativeChildCountMsg}?`,
      };
    },
  },
  languageMsgs: {
    ...ecud('Language'),
  },
  translationMsgs: {
    ...ecud('Translation'),
    INVALID_LANGUAGE: 'Language does not exist.',
  },
  likeMsgs: {
    INVALID_STORY: 'Story does not exist.',
  },
  categoryMsgs: {
    ...ecud('Category'),
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
  regionMsgs: {
    ...ecud('Region'),
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
    ...ecud('Source'),
    INVALID_SOURCE: 'Source does not exists.',
  },
  selectorsMsgs: {
    ...ecud('Selector'),
    INVALID_SOURCE: 'Source does not exist.',
  },
  scrapperMsgs: {
    // SUCCESS: 'Source scrapped successfully.',
  },
};
