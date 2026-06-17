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

  const category = (category) => {
    if (!category) {
      return null;
    } else if (!allCategory.includes(category)) {
      throw new Error("No such Category!!");
    } else {
      return category;
    }
  };

  const typeMethod = (type) => {
    if (!type) {
      return null;
    } else if (!allTypes.includes(type)) {
      throw new Error("Invalid type!!");
    } else {
      return type;
    }
  };

  const sortMethod = (sort) => {
    if (!sort) {
      return "Latest";
    } else if (!allSort.includes(sort)) {
      throw new Error("No such Method!!");
    } else {
      return sort;
    }
  };

  const dateValidate = (date) => {
    if (!date) {
      return null;
    }
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      throw new Error("Invalid Date Input!!");
    }
    return parsed;
  };

  const minMax = (min, max) => {
    if (min || max) {
      if (isNaN(min)) {
        return { max };
      } else if (isNaN(max)) {
        return { min };
      } else if (min > max) {
        return {
          max: min,
          min: max,
        };
      } else {
        return {
          min,
          max,
        };
      }
    } else {
      return null;
    }
  };

  if (!page || (page && page <= 0)) {
    data.page = 1;
  } else {
    data.page = page;
  }

  data.type = typeMethod(query.type);
  data.category = category(query.category);
  data.sort = sortMethod(query.sort);
  data.thisMonth = dateValidate(query.thisMonth);
  data.startDate = dateValidate(query.startDate);
  data.endDate = dateValidate(query.endDate);
  data.Amt = minMax(Number(query.min), Number(query.max));

  if (!data.endDate && !data.startDate && !data.thisMonth) {
    data.week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }

  if (data.startDate && data.endDate && data.startDate >= data.endDate) {
    throw new Error("Enter Valid Output!!");
  }

  console.log(data);
  return data;
};

module.exports = transactionValidation;
