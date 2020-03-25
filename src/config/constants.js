export const lang = {
  ENGLISH: 'english',
  URDU: 'urdu',
};

export const siteDirs = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const sidebarDirs = {
  RIGHT: 'right',
  LEFT: 'left',
};

const apiEndpoint = 'https://addictivebulletin.com/api/';
export const server = {
  API: {
    HOME: `${apiEndpoint}english?page=1`,
  },
};

export const roles = {
  ADMIN: 'admin',
};

export const localStorageKeys = {
  JWT_AUTH: 'jwtAuth',
};

export const responseTypes = {
  statusCodes: {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
  },
  SESSION_EXPIRED: 'JWT_EXPIRED',
};
