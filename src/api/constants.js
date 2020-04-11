const apiV1Endpoint = '/api/v1';
export const apiEndpoints = {
  LOGIN_ENDPOINT: `${apiV1Endpoint}/login`,
  SOURCE_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source`,
  },
  CATEGORY_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/category`,
  },
  SOURCE_LINKS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/source_link`,
  },
  SELECTORS_ENDPOINTS: {
    REST: `${apiV1Endpoint}/admin/selector`,
  },
};
