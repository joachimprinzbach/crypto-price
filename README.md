# crypto-price

You only need to have node.js (>= 8.4.0) installed.

### Installing node.js:

- [Node.js](http://nodejs.org) >= 8.4.0

### Configure your Binance API access:

Copy the "sample.api.config.json" as "api.config.json". 
Insert your binance API key and API secret.

```json
{
  "binance": {
    "apiKey": "your_api_key",
    "apiSecret": "your_api_secret"
  }
}
```

### Installing dependencies
```sh
$ npm install
```

### Run the application locally
```sh
$ node index
```
