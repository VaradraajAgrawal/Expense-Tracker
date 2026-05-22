const { paginationHelper } = require("../utils/HelperFunction");

// ================= ALL TRANSACTION  =================
const normalView = async (user, page) => {
  const allTra = { user: user._id };

  let { maxPage, filtered, parse, totalDocuments } = await paginationHelper(
    page,
    allTra,
  );

  return {
    maxPage,
    filtered,
    parse,
    totalDocuments,
  };
};

// ================= CURRENT MONTH =================
const monthFilter = async (user, page) => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const limitAmt = 10;
  const fil = {
    user: user._id,
    createdAt: {
      $gte: thisMonth,
      $lt: nextMonth,
    },
  };

  let { maxPage, filtered, parse, totalDocuments } = await paginationHelper(
    page,
    fil,
  );
  return { maxPage, filtered, parse, totalDocuments };
};

// ================= SPECIFIC MONTH =================
const specificMonth = async (month, user, page) => {
  const parsedDate = new Date(month);

  if (isNaN(parsedDate)) {
    throw new ErrorHandler("Invalid Month", 400);
  }

  const startMonth = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    1,
  );

  const nextMonth = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    1,
  );

  let fil = {
    user: user._id,
    createdAt: { $gte: startMonth, $lt: nextMonth },
  };

  let { maxPage, filtered, parse, totalDocuments } = await paginationHelper(
    page,
    fil,
  );
  return { maxPage, filtered, parse, totalDocuments };
};

// ================= SPECIFIC YEAR =================
const oneYear = async (year, user, page) => {
  const startYear = new Date(Number(year), 0, 1);
  const nextYear = new Date(Number(year) + 1, 0, 1);

  if (isNaN(startYear) || isNaN(nextYear)) {
    throw new ErrorHandler("Invalid Year", 400);
  }

  const fil = {
    user: user._id,
    createdAt: {
      $gte: startYear,
      $lt: nextYear,
    },
  };

  let { maxPage, filtered, parse, totalDocuments } = await paginationHelper(
    page,
    fil,
  );

  return { maxPage, filtered, parse, totalDocuments };
};

// ================= CUSTOM DATE RANGE =================
const rangeFilter = async (startDate, endDate, user, page) => {
  const start = new Date(startDate);

  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    throw new ErrorHandler("Invalid Date Range", 400);
  }

  const fil = {
    user: user._id,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  };

  let { maxPage, filtered, parse, totalDocuments } = await paginationHelper(
    page,
    fil,
  );

  return { maxPage, filtered, parse, totalDocuments };
};

module.exports = {
  rangeFilter,
  oneYear,
  specificMonth,
  normalView,
  monthFilter,
};
