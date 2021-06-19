# N26 Assignement

The task is to create a RESTful API for statistics. The main use case for the API is
to calculate real-time statistics for the last 60 seconds of transactions.

## Requirements

Make sure to have node.js installed.

## Installation

Use npm to install the project and its dependencies.
In the project folder run :

```bash
npm install
```

## Usage

Run npm start to start the project.
By default the API is listening on port 3000

```bash
npm start
```

When posting a transaction it is recommended to use string for the amount (bigDecimal) as it circumvents the issue of precision with JS native float implementation and max limit for integer.

## Testing

Mocha chai and supertest are used to test the project.
make sure that the project is not already running before testing (otherwise the test instance won't be able to use port 3000).
To run the tests type :

```bash
npm run test
```

## Used technologies and dependencies

javascript
node.js
express.js
mocha chai
supertest
js-big-decimal

## License

[MIT](https://choosealicense.com/licenses/mit/)
