require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log('\x1b[1m\x1b[32m', `*** listening on port ${port} ***`, '\x1b[0m')
);
