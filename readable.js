var version = process.version.match(/v([0-9]+\.[0-9]+)\.[0-9]+/)[1]
if (version == '0.8' || version == '0.9') {
  module.exports = require('readable-stream');
}
else {
  module.exports = require('stream').Readable
}
