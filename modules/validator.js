const bigDecimal = require("js-big-decimal");

const isIsoDate = async (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str);
  return d.toISOString() === str;
};

const validator = async (transaction) => {
  let date = Date.now();

  if (typeof transaction !== "object" || !transaction || !transaction.timestamp || !transaction.amount) {
    return 400;
  }
  if (
    !(await isIsoDate(transaction.timestamp)) ||
    !new bigDecimal(transaction.amount) ||
    Date.parse(transaction.timestamp) > date
  ) {
    return 422;
  }
  if (date - Date.parse(transaction.timestamp) > 60000) {
    return 204;
  }
  //to delete
  //   if (Date.parse(transaction.timestamp) > date) {
  //     return 201;
  //   }
  return 201;
};

module.exports = { validator };
