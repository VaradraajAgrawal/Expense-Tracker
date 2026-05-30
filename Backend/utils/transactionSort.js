const transactionSort = (query) => {
  let sort = {
    createdAt: -1,
  };

  if (query.sort === "highest") {
    sort = {
      amount: -1,
    };
  }
  if (query.sort === "lowest") {
    sort = {
      amount: 1,
    };
  }
  if (query.sort === "oldest") {
    sort = {
      createdAt: 1,
    };
  }

  return sort;
};

module.exports = transactionSort;
