# goxstream

A node.js readable stream for mtgox, based on [ws](https://github.com/einaros/ws). Reports ticker, depth, trade and lag data in real time. Supports the [bitcoin](http://bitcoin.org) (BTC) channels from this [list](https://mtgox.com/api/2/stream/list_public). [Namecoin](http://namecoin.info) (NMC) and [litecoin](http://litecoin.org) (LTC) are currently not traded on MtGox but might be in a near future.

## API

### goxstream.createStream([options])

Creates and returns a readable <i>object</i> stream. The options argument configures what type of data you are interested in and uses the following properties:

* <b>currency</b> `(string)` E.g `'USD'`, `'EUR'` etc. Default is `'USD'`.
* <b>ticker</b> `(Boolean)` Stream ticker data. Default is `true`.
* <b>depth</b> `(Boolean)` Stream depth data, i.e. buys and sells on the market. Default is `false`.
* <b>trade</b> `(Boolean)` Stream trade data, i.e. actual transactions between buyers and sellers. Default is `false`.
* <b>lag</b> `(Boolean)` Stream lag data. Default is `false`.

### goxstream.currencies()

Returns an array of currencies that are available on MtGox.

## Examples

Pipe `'USD'` ticker data to stdout:

```js
var gox = require('goxstream')
gox.createStream().pipe(process.stdout)
```

Pipe `'EUR'` depth data to file:

```js
var gox = require('goxstream')
var fs  = require('fs')
var options = { currency: 'EUR', ticker: false, depth: true }
gox.createStream(options).pipe(fs.createWriteStream('./EUR'))
```

## License
MIT