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

### Run the server locally
```sh
$ npm start
```

### Run the application locally (run in another console instance than server api)
```sh
$ npm run client
```

Open Browser at [http://localhost:8080](http://localhost:8080) to see the app in action.
