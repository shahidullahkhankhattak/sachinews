/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const SourceLink = require('../../../db/models/SourceLink');
const Selector = require('../../../db/models/Selector');
const Story = require('../../../db/models/Story');
const { genSlug } = require('../../../utils/slug');
const { tagsKeywords } = require('../../../config');

const searchTags = (search, target) => {
  if (typeof search === 'object') {
    let found = true;
    search.forEach((keyword) => {
      if (!target.includes(keyword)) {
        found = false;
      }
    });
    return found;
  }
  return target.includes(search);
};

const options = { waitUntil: 'load', timeout: 0 };
module.exports.crawl = async function (source) {
  const stories = [];
  try {
    const urls = await SourceLink.find({ source });
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
    for (let urli = 0; urli < urls.length; urli += 1) {
      const { url, source: urlSource, category: urlCategory } = urls[urli];
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.goto(url, options);
      const links = await page.evaluate(({ selectors, valSelector }) => Array.from(document.querySelectorAll(selectors[0])).map((item) => item[valSelector]), linkSel);
      for (let i = 0; i < links.length; i += 1) {
        const link = links[i];
        await page.goto(link, options);
        const crawled = await page.evaluate(({
          titleSel, descriptionSel, mediaSel, bodySel,
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
            if (bodyDom) {
              bodySel.filters.forEach((filter) => {
                const filterDom = bodyDom.querySelectorAll(filter);
                if (filterDom && filterDom.length) filterDom.forEach((item) => item.remove());
              });
              body = bodyDom[attrib];
            }
          }

          return {
            title, description, media, body,
          };
        }, {
          titleSel, descriptionSel, mediaSel, bodySel,
        });
        const story = {
          ...crawled,
          source: urlSource,
          category: urlCategory,
          url: link,
          tags: '',
          author: '',
          slug: genSlug(crawled.title),
        };
        const exists = await Story.findOne({ title: story.title });
        if (!exists && story.body) {
          const tags = [];
          tagsKeywords.important.forEach((keyword) => {
            if (searchTags(keyword, story.body)) {
              tags.push('important');
            }
          });
          await Story.create({ ...story, tags });
          stories.push(story);
        }
      }
    }
    await browser.close();
    return stories;
  } catch (ex) {
    console.log(ex);
  }
};
