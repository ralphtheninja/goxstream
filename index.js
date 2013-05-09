#!/usr/bin/env node

var Readable  = require('./readable')
var Websocket = require('ws')
var xtend     = require('xtend')
var inherits  = require('util').inherits

module.exports = {
    createStream: createStream
  , currencies: currencies
}

var defaultOptions = {
        currency: 'USD'
      , ticker: true
      , depth: false
      , trade: false
      , lag: false
    }

function createStream(options) {
  return new MtGoxStream(options)
}

function MtGoxStream(options) {
  options = xtend(defaultOptions, options)

  Readable.call(this, { objectMode: true })

  var self = this
  var ws = null

  this._read = function () {
    if (ws) return

    var url = 'wss://websocket.mtgox.com'
    ws = new Websocket(url)

    ws.on('open', function() {
      console.log('connected to:', url)
      if (options.ticker) subscribe('ticker.BTC' + options.currency)
      if (options.depth) subscribe('depth.BTC' + options.currency)
      if (options.trade) subscribe('trade.BTC')
      if (options.lag) subscribe('trade.lag')
    })

    ws.on('message', function(data) {
      if (isValid(data)) output(data)
    })
  }

  function isValid(data) {
    try {
      var obj = JSON.parse(data)
      if (obj.channel && obj.channel_name) {
        if ('trade.BTC' !== obj.channel_name) {
          return true
        }
        return obj.trade.price_currency === options.currency
      }
    } catch (err) {
      console.log('invalid json data', data)
    }
    return false
  }

  function output(data) {
    self.push(data)
    self.push('\n')
  }

  function subscribe(channel) {
    console.log('subscribing to channel:', channel)
    ws.send(JSON.stringify({ op: 'mtgox.subscribe', channel: channel }))
  }
}

inherits(MtGoxStream, Readable)

function currencies() {
  return [
      'USD'
    , 'AUD'
    , 'CAD'
    , 'CHF'
    , 'CNY'
    , 'DKK'
    , 'EUR'
    , 'GBP'
    , 'HKD'
    , 'JPY'
    , 'NZD'
    , 'PLN'
    , 'RUB'
    , 'SEK'
    , 'SGD'
    , 'THB'
  ]
}

if (!module.parent) {
  var usd = new MtGoxStream()
  usd.pipe(process.stdout)
  var eur = new MtGoxStream({ currency: 'EUR', ticker: false, depth: true })
  eur.pipe(require('fs').createWriteStream('EUR'))
}
