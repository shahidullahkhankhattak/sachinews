export const validations = {
  REQUIRED: (val) => !!val || 'Field is required',
  URL: (val) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm.test(val) || 'Field must be a valid url',
  HASH_COLOR: (val) => /^#(?:[0-9a-fA-F]{3}){1,2}$/gm.test(val) || 'Field must be valid hex color',
};
