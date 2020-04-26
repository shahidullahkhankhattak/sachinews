/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const SourceLink = require('../../../db/models/SourceLink');
const Selector = require('../../../db/models/Selector');
const Source = require('../../../db/models/Source');
const { adminEvents: { ADMIN_SCRAP_NEWS_ITEM } } = require('../../../../../src/sockets/constants');

const options = { waitUntil: 'load', timeout: 0 };
module.exports.test = async function ({ form: { source, link, numItems } }, socket) {
  try {
    const { url } = await SourceLink.findOne({ _id: link });
    const { name: sourceName } = await Source.findOne({ _id: source });
    const selectors = (await Selector.find({ source }).exec()).map(({
      name, selector, type, filter, source,
    }) => {
      const [sel, valSelector] = selector.split('->'); // get val selector
      const selects = sel.split('|');
      const filters = (filter && filter.split('|')) || [];
      return {
        selectors: selects, valSelector, name, type, source, filters,
      };
    });
    const linkSel = selectors.find((sel) => sel.name === '*');
    const titleSel = selectors.find((sel) => sel.name === 'title');
    const descriptionSel = selectors.find((sel) => sel.name === 'description');
    const mediaSel = selectors.find((sel) => sel.name === 'media');
    const bodySel = selectors.find((sel) => sel.name === 'body');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, options);
    const links = await page.evaluate(({ selectors, valSelector }) => Array.from(document.querySelectorAll(selectors[0])).map((item) => item[valSelector]), linkSel);
    const loopTo = ((numItems > links.length && links.length) || numItems);
    for (let i = 0; i < loopTo; i += 1) {
      const link = links[i];
      await page.goto(link, options);
      const crawled = await page.evaluate(({
        titleSel, descriptionSel, mediaSel, bodySel, sourceName,
      }) => {
        let title; let description; let media; let body;
        if (titleSel) {
          titleSel.selectors.forEach((sel) => {
            const attrib = titleSel.valSelector || (titleSel.type === 'string' && 'innerText') || (titleSel.type === 'html' && 'innerHTML');
            if (document.querySelector(sel)) { title = document.querySelector(sel)[attrib]; }
          });
        }
        if (descriptionSel) {
          descriptionSel.selectors.forEach((sel) => {
            const attrib = descriptionSel.valSelector || (descriptionSel.type === 'string' && 'innerText') || (descriptionSel.type === 'html' && 'innerHTML');
            if (document.querySelector(sel)) { description = document.querySelector(sel)[attrib]; }
          });
        }
        if (mediaSel) {
          mediaSel.selectors.forEach((sel) => {
            const attrib = mediaSel.valSelector || (mediaSel.type === 'string' && 'innerText') || (mediaSel.type === 'html' && 'innerHTML');
            if (document.querySelector(sel)) { media = document.querySelector(sel)[attrib]; }
          });
        }
        if (bodySel) {
          let bodyDom;
          const attrib = bodySel.valSelector || (bodySel.type === 'string' && 'innerText') || (bodySel.type === 'html' && 'innerHTML');
          bodySel.selectors.forEach((sel) => {
            if (document.querySelector(sel)) { bodyDom = document.querySelector(sel); }
          });
          bodySel.filters.forEach((filter) => {
            bodyDom.querySelectorAll(filter).forEach((item) => item.remove());
          });
          body = bodyDom[attrib];
        }

        return {
          title, description, media, body, sourceName,
        };
      }, {
        titleSel, descriptionSel, mediaSel, bodySel, sourceName,
      });
      socket.emit(ADMIN_SCRAP_NEWS_ITEM, crawled);
    }
    await browser.close();
  } catch (ex) {
    console.log(ex);
  }
};