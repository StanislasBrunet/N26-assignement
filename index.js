const { json } = require("express");
const express = require("express");
const app = express();
const bigDecimal = require("js-big-decimal");

const { validator } = require("./modules/validator");

app.use(express.json());

app.use(async (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.sendStatus(400);
  } else {
    next();
  }
});

let transactions = [];

const addTransaction = async (transaction) => {
  transactions.push(transaction);
};

const deleteTransactions = async () => {
  return (transactions = []);
};

const getLastTransactions = async () => {
  let date = Date.now();

  // return transactions.filter((t) => date - Date.parse(t.timestamp) > 60000);
  return transactions;
};

const getSum = async () => {
  try {
    const lastTransactions = await getLastTransactions();

    return await new bigDecimal(lastTransactions.reduce((a, b) => bigDecimal.add(a, b.amount), 0))
      .round(2, bigDecimal.RoundingModes.HALF_UP)
      .getValue();
  } catch (error) {
    console.log("Error in getSum : ", error);
    return 0;
  }
};

const getAvg = async () => {
  try {
    const length = (await getLastTransactions()).length;
    const sum = await getSum();
    let res =
      !sum || !length
        ? "0.00"
        : await new bigDecimal(bigDecimal.divide(sum, length)).round(2, bigDecimal.RoundingModes.HALF_UP).getValue();
    return res;
  } catch (error) {
    console.log("Error in getAvg", error);
    return 0;
  }
};

const getMax = async () => {
  try {
    const lastTransactions = await getLastTransactions();
    let res =
      lastTransactions.length === 0
        ? "0.00"
        : await new bigDecimal(
            Math.max.apply(
              Math,
              lastTransactions.map((o) => {
                return o.amount;
              })
            )
          )
            .round(2, bigDecimal.RoundingModes.HALF_UP)
            .getValue();
    return res;
  } catch (error) {
    console.log("Error in getMax", error);
    return 1;
  }
};

const getMin = async () => {
  try {
    const lastTransactions = await getLastTransactions();
    let res =
      lastTransactions.length === 0
        ? "0.00"
        : await new bigDecimal(
            Math.min.apply(
              Math,
              lastTransactions.map((o) => {
                return o.amount;
              })
            )
          )
            .round(2, bigDecimal.RoundingModes.HALF_UP)
            .getValue();
    return res;
  } catch (error) {
    console.log("Error in getMin : ", error);
    return 0;
  }
};

const getCount = async () => {
  try {
    return (await getLastTransactions()).length;
  } catch (error) {
    console.log("Error in getCount : ", error);
    return 0;
  }
};

app.get("/", (req, res) => {
  res.send(transactions);
});

app.post("/transactions", async (req, res) => {
  try {
    const transaction = {
      amount: new bigDecimal(req.body.amount).getValue(),
      timestamp: req.body.timestamp,
    };
    const code = await validator(req.body);
    if (code === 201) {
      await addTransaction(transaction);
    }
    res.sendStatus(code);
  } catch (error) {
    console.log("Error invalid Json : ", error);
    res.sendStatus(400);
  }
});

app.post("/transactions/:copies", async (req, res) => {
  try {
    const transaction = {
      amount: new bigDecimal(req.body.amount).getValue(),
      timestamp: req.body.timestamp,
    };
    const code = await validator(req.body);
    if (code === 201) {
      for (let i = 0; i < req.params.copies; i++) await addTransaction(transaction);
    }
    res.sendStatus(code);
  } catch (error) {
    console.log("Error invalid Json : ", error);
    res.sendStatus(400);
  }
});

app.get("/statistics", async (req, res) => {
  try {
    const statistics = {
      sum: await getSum(),
      avg: await getAvg(),
      max: await getMax(),
      min: await getMin(),
      count: await getCount(),
    };
    res.send(statistics);
  } catch (error) {
    console.log("Error in get /statistics", error);
  }
});

app.delete("/transactions", async (req, res) => {
  await deleteTransactions();
  res.send("DELETED");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));

module.exports = app;
