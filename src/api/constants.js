
import { serverBase } from '../config/constants';

const baseUrl = (process.env.DEV && serverBase.local) || serverBase.production;

const apiV1Endpoint = `${baseUrl}/api/v1`;
export const apiEndpoints = {
  LOGIN_ENDPOINT: `${apiV1Endpoint}/login`,
  SOURCE_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source`,
  },
  CATEGORY_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/category`,
  },
  SOURCE_LINKS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source-link`,
  },
  SELECTORS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/selector`,
  },
  STORIES_ENDPOINTS: {
    TOP_STORIES: `${apiV1Endpoint}/stories/top-stories`,
  },
};
