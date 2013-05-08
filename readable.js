if (process.version.match(/v([0-9]+\.[0-9]+)\.[0-9]+/)[1] == '0.8') {
  module.exports = require('readable-stream');
}
else {
  module.exports = require('stream').Readable
}

