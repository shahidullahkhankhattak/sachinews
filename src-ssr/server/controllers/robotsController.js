module.exports.robotsTxt = (_req, res) => {
  res.setHeader('content-type', 'text/plain');
  const val = `User-agent: *
Disallow:
Sitemap: https://www.sachinews.com/en/sitemap.xml
Sitemap: https://www.sachinews.com/ur/sitemap.xml`;
  res.send(val);
  res.end();
};
