# goxstream

A node.js readable stream for mtgox, based on [ws](https://github.com/einaros/ws). Reports ticker, depth, trade and lag data in real time.

## API

### goxstream.createStream(currency)

Creates a readable stream. Supports the [bitcoin](http://bitcoin.org) (BTC) channels from this [list](https://mtgox.com/api/2/stream/list_public). [Namecoin](http://namecoin.info) (NMC) and [litecoin](http://litecoin.org) (LTC) are currently not traded on MtGox but might be in a near future.

* <b>currency</b> (String) `'USD'`, `'EUR'` etc

### goxstream.currencies()

Returns an array of currencies that are available on MtGox.

## Example

Create two different streams. Pipe one of them to stdout and one to file.

```js
var gox = require('goxstream')
var fs  = require('fs')
gox.createStream('USD').pipe(process.stdout)
gox.createStream('EUR').pipe(fs.createWriteStream('./EUR'))
```

## License
MIT