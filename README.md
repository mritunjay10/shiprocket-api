## Shiprocket-API

An Implementation of Shiprocket-API in node.js. Technologies used are Node.js and Express.js, this project is developed to be treated as a micro-service.

## Tools used
#### node.js >= 12.22.6
#### npm >= 6.14.15
#### Redis >= 6.0.6

## Copy .example-env to .env
```bash
cp .example.env .env
```

### Update .env variables
```bash
SHIPROCKET_URL=https://apiv2.shiprocket.in/v1/external/

SHIPROCKET_USER=#
SHIPROCKET_PASSWORD=#

REDIS_BASE_PREFIX=shiprocket-api:
REDIS_SHIPROCKET_KEY=auth-token

COUNTRY_CODE=IN
```

### Install the dependencies
```bash
npm install
```

### Start the app
```bash
npm run start
```