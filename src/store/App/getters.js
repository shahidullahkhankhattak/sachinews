import { lang, siteDirs, sidebarDirs } from '../../config/constants';

export const locale = ({ config }) => config.locale;
export const isSidebarOpen = ({ config }) => config.isSidebarOpen;
export const siteDirection = ({ config }) => ((config.locale === lang.ENGLISH && siteDirs.LTR) || siteDirs.RTL);
export const sidebarPosition = ({ config }) => ((config.locale === lang.ENGLISH && sidebarDirs.left) || sidebarDirs.RIGHT);
