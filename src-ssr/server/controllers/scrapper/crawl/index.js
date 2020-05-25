/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const crawlSource = require('./source');
const crawlAll = require('./all');

module.exports.crawlAll = crawlAll;
module.exports.crawlSource = crawlSource;
