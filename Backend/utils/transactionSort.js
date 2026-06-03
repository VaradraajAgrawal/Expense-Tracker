const transactionSort = (sort) => {
  let sorted = {
    createdAt: -1,
  };

  if (sort === "highest") {
    sorted = {
      amount: -1,
    };
  }
  if (sort === "lowest") {
    sorted = {
      amount: 1,
    };
  }
  if (sort === "oldest") {
    sorted = {
      createdAt: 1,
    };
  }

  return sorted;
};

module.exports = transactionSort;
