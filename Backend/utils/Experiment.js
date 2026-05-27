const middleware = require("../middleware/errorFun");
const ErrorHandler = require("../utils/prac");

const oneMonth = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
};

const specificMonth = (month) => {
  const parsedDate = new Date(month);

  if (isNaN(parsedDate)) {
    throw new ErrorHandler("Invalid Month", 400);
  }
  const start = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
  const end = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);

  return {
    start,
    end,
  };
};

const oneYear = (year) => {
  const start = new Date(Number(year), 0, 1);
  const end = new Date(Number(year) + 1, 0, 1);

  if (isNaN(start) || isNaN(end)) {
    throw new ErrorHandler("Invalid Year", 400);
  }
  return {
    start,
    end,
  };
};

const customDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    throw new ErrorHandler("Invalid Date Range", 400);
  }
  return {
    start,
    end,
  };
};

// ================= Calculation Main Function ================= //
const filterBoth = (query) => {
  const { thisMonth, startDate, endDate, thisYear } = query;

  let cal;
  // Current Month
  if (thisMonth && !startDate && !endDate && !thisYear) {
    cal = oneMonth();
  }

  // Specific Month
  else if (startDate && !endDate && !thisYear) {
    cal = specificMonth(startDate);
  }

  // Date Range
  else if (startDate && endDate && !thisYear) {
    cal = customDate(startDate, endDate);
  }

  // Specific Year
  else if (thisYear) {
    cal = oneYear(thisYear);
  } else if (!thisYear && !startDate && !thisMonth && !endDate) {
    cal = null;
  } else {
    throw new ErrorHandler("Invalid Query Parameters", 400);
  }

  return cal;
};

module.exports = filterBoth;
