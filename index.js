#!/usr/bin/env node

var Readable  = require('stream').Readable
var Websocket = require('ws')
var inherits  = require('util').inherits

module.exports = {
    createStream: createStream
  , currencies: currencies
}

function createStream(currency) {
  return new MtGoxStream(currency)
}

function MtGoxStream(currency) {
  if (!currency) currency = 'USD'

  Readable.call(this, { objectMode: true })

  var ws = null

  this._read = function () {
    var self = this
    if (!ws) {
      ws = new Websocket('wss://websocket.mtgox.com')

      ws.on('open', function() {
        subscribe('ticker.BTC' + currency)
        subscribe('depth.BTC' + currency)
        subscribe('trade.BTC')
        subscribe('trade.lag')
      })

      ws.on('message', function(data) {
        try {
          var obj = JSON.parse(data)
          if (obj.channel) {
            self.push(data)
          }
        } catch (err) {
          console.log('invalid json data', data)
        }
      })

    }
  }

  function subscribe(channel) {
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
  var usd = new MtGoxStream('USD')
  usd.pipe(process.stdout)
  var eur = new MtGoxStream('EUR')
  eur.pipe(require('fs').createWriteStream('EUR'))
}
