# goxstream

[![Dependency Status](https://david-dm.org/ralphtheninja/goxstream.png)](https://david-dm.org/ralphtheninja/goxstream)

A node.js readable stream for mtgox, based on [ws](https://github.com/einaros/ws). Reports ticker, depth, trade and lag data in real time. Supports the [bitcoin](http://bitcoin.org) (BTC) channels from this [list](https://mtgox.com/api/2/stream/list_public). [Namecoin](http://namecoin.info) (NMC) and [litecoin](http://litecoin.org) (LTC) are currently not traded on MtGox but might be in a near future.

## API

### goxstream.createStream([opts])

Creates and returns a readable <i>object</i> stream. The options argument configures what type of data you are interested and have the following properties:

* <b>currency</b> `(string)` E.g `'USD'`, `'EUR'` etc. Default is `'USD'`.
* <b>ticker</b> `(Boolean)` Stream ticker data. Default is `true`.
* <b>depth</b> `(Boolean)` Stream depth data, i.e. buys and sells on the market. Default is `false`.
* <b>trade</b> `(Boolean)` Stream trade data, i.e. actual transactions between buyers and sellers. Default is `false`.
* <b>lag</b> `(Boolean)` Stream lag data. Default is `false`.
* <b>restart_interval</b> `(Number)` Time interval in ms. Restart stream after no new data delay. Default is `30000`.

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

## Install

```bash
npm install goxstream
```

## JSON Format

Here's a brief summary on the different json blobs.

### ticker object

All objects under `'ticker'` have the same properties as `'high'`, e.g. `'value'`, `'value_int'` etc

```js
{
    "channel": "d5f06780-30a8-4a48-a2f8-7ed181b4a13f"
  , "channel_name": "ticker.BTCUSD"
  , "op": "private"
  , "origin": "broadcast"
  , "private": "ticker"
  , "ticker": {
        "high": {
            "value": "115.84000"
          , "value_int": "11584000"
          , "display": "$115.84000"
          , "display_short": "$115.84"
          , "currency": "USD"
        }
      , "low": {}
      , "avg": {}
      , "vwap": {}
      , "vol": {}
      , "last_local": {}
      , "last_orig": {}
      , "last_all": {}
      , "last": {}
      , "buy": {}
      , "sell": {}
      , "item": "BTC"
      , "now": "1368096380598414"
    }
}
```

### depth object

```js
{
    "channel": "24e67e0d-1cad-4cc0-9e7a-f8523ef460fe"
  , "channel_name": "depth.BTCUSD"
  , "op": "private"
  , "origin": "broadcast"
  , "private": "depth"
  , "depth": {
        "price": "92"
      , "type": 2
      , "type_str": "bid"
      , "volume": "14.28693815"
      , "price_int": "9200000"
      , "volume_int": "1428693815"
      , "item": "BTC"
      , "currency": "USD"
      , "now": "1368097807984368"
      , "total_volume_int": "84559126689"
    }
}
```

### trade object

```js
{
    "channel": "dbf1dee9-4f2e-4a08-8cb7-748919a71b21"
  , "channel_name": "trade.BTC"
  , "op": "private"
  , "origin": "broadcast"
  , "private": "trade"
  , "trade": {
        "type": "trade"
      , "date": 1368098037
      , "amount": 1.86011338
      , "price": 111.09999
      , "tid": "1368098037413285"
      , "amount_int": "186011338"
      , "price_int": "11109999"
      , "item": "BTC"
      , "price_currency": "USD"
      , "trade_type": "bid"
      , "primary": "Y"
      , "properties": "market"
    }
}
```

### lag object

```js
{
    "channel": "85174711-be64-4de1-b783-0628995d7914"
  , "channel_name": "trade.lag"
  , "op": "private"
  , "origin": "broadcast"
  , "private": "lag"
  , "lag": {
        "qid": "26dc2324-e790-47e8-aef7-e0a1f0633589"
      , "stamp": "1368098833428529"
      , "age":47058
    }
}
```

## License
MIT
