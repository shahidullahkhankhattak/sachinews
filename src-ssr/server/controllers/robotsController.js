const fs = require('fs');

module.exports.robotsTxt = (_req, res) => {
  const robotsContent = fs.readFileSync('plain/robots.txt').toString('utf-8');
  res.setHeader('content-type', 'text/plain');
  res.send(robotsContent);
  res.end();
};
