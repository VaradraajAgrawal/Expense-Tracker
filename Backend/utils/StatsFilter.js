const { facetFunction } = require("../utils/HelperFunction");

const oneYearCalc = async (year, user) => {
  const date = new Date(year);
  const nm = new Date(Number(date.getFullYear()) + 1, 0, 1);

  let calculator = await facetFunction(date, nm, user);
  return calculator;
};

const yearAndMonthCalculator = async (start, end, user) => {
  const strdate = new Date(start);
  const enddate = new Date(end);

  let calculator = await facetFunction(strdate, enddate, user);

  return calculator;
};

const specificMonthCalculator = async (month, user) => {
  const date = new Date(month);
  const sm = new Date(date.getFullYear(), date.getMonth(), 1);
  const nm = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let calculateAmt = await facetFunction(sm, nm, user);
  return calculateAmt;
};

const helpThisMonth = async (user) => {
  const now = new Date();
  let sm = new Date(now.getFullYear(), now.getMonth(), 1);
  let nm = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  let calcu = await facetFunction(sm, nm, user);
  return calcu;
};

module.exports = {
  helpThisMonth,
  specificMonthCalculator,
  yearAndMonthCalculator,
  oneYearCalc,
};
