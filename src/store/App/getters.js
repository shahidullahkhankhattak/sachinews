import { siteDirs, sidebarDirs } from '../../config/constants';

export const locale = ({ config }) => config.locale;
export const country = ({ config }) => config.country;
export const siteDirection = ({ config }) => ((config.locale && config.locale.direction) || siteDirs.LTR);
export const sidebarPosition = ({ config }) => ((config.locale && config.locale.direction === siteDirs.RTL && sidebarDirs.RIGHT) || sidebarDirs.LEFT);
export const counts = ({ counts: _counts }) => _counts;
