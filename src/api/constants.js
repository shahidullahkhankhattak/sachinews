
import { serverBase } from '../config/constants';

const baseUrl = (process.env.DEV && serverBase.local) || serverBase.production;

const apiV1Endpoint = `${baseUrl}/api/v1`;
export const apiEndpoints = {
  LOGIN_ENDPOINT: `${apiV1Endpoint}/login`,
  SOURCE_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source`,
    USER_SOURCE: `${apiV1Endpoint}/source`,
  },
  LANGUAGES_ENDPOITNS: {
    REST: `${apiV1Endpoint}/admin/language`,
    USER_LANGUAGE: `${apiV1Endpoint}/language`,
  },
  CATEGORY_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/category`,
    USER_CATEGORY: `${apiV1Endpoint}/category`,
  },
  SOURCE_LINKS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source-link`,
  },
  SELECTORS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/selector`,
  },
  STORIES_ENDPOINTS: {
    TOP_STORIES: `${apiV1Endpoint}/stories/get-stories`,
    STORY: `${apiV1Endpoint}/stories/get-story/`,
  },
  TRANSLATIONS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/translation`,
    USER_TRANSLATION: `${apiV1Endpoint}/translation`,
  },
  LIKES_ENDPOINTS: {
    REST: `${apiV1Endpoint}/like`,
  },
  COUNTS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/counts`,
  },
  REGIONS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/region`,
    USER_REGION: `${apiV1Endpoint}/region`,
  },
  COUNTRIES_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/country`,
    USER_COUNTRY: `${apiV1Endpoint}/country`,
  },
};
