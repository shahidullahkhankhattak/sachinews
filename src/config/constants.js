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
    INCOMPLETE: 417,
  },
  SESSION_EXPIRED: 'JWT_EXPIRED',
};

export const serverBase = {
  local: 'http://localhost:8080',
  dev: 'http://dev.sachinews.com',
  production: 'https://sachinews.com',
};

export const axiosConfig = {
  noLoader: {
    headers: {
      noLoader: true,
    },
  },
};
