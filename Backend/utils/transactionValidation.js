const transactionValidation = (query) => {
  const allTypes = ["Income", "Expense"];
  const allSort = ["Highest", "Lowest", "Latest", "Oldest"];
  const allCategory = [
    "Electronics",
    "Rent",
    "Food",
    "Salary",
    "Daily",
    "Groceries",
  ];
  let data = {};
  let page = Math.ceil(Number(query.page));
  let type = query.type;
  let category = query.category;
  let sort = query.sort;
  let thisMonth = query.thisMonth;
  let endDate = query.endDate;
  let startDate = query.startDate;
  let min = Number(query.min);
  let max = Number(query.max);

  if (!page || (page && page <= 0) || typeof page === "String") {
    data.page = 1;
  } else {
    data.page = page;
  }

  if (type && !allTypes.includes(type)) {
    throw new Error("Invalid Type enter Valid Input!!");
  }

  if (category && !allCategory.includes(category)) {
    throw new Error("Invalid category Applied");
  }

  if (!sort || (sort && !allSort.includes(sort))) {
    data.sort = "Latest";
  }

  if (thisMonth) {
    const parsed = new Date(thisMonth);
    if (isNaN(parsed.getTime())) {
      throw new Error("Invalid Date Input");
    }
    data.thisMonth = parsed;
  }

  if (startDate) {
    const parsed = new Date(startDate);
    if (isNaN(parsed)) {
      throw new Error("Not a Valid Date!!");
    }
    data.startDate = parsed;
  }

  if (endDate) {
    const parsed = new Date(endDate);
    if (isNaN(parsed)) {
      throw new Error("Not a Valid Date!!");
    }
    data.endDate = parsed;
  }

  if (data.startDate >= data.endDate) {
    throw new Error("Enter Valid Output!!");
  }

  if (min || max) {
    if (isNaN(min)) {
      //   throw new Error("Invalid value in min or max");
      data.max = max;
    } else if (isNaN(max)) {
      data.min = min;
    } else if (min > max) {
      data.max = min;
      data.min = max;
    } else {
      data.min = min;
      data.max = max;
    }
  }
  console.log(data);
  return data;
};

module.exports = transactionValidation;
