const Budget = require("../models/Budget");

const budgetService = async (limit, currentDate, user) => {
  let budget = await Budget.findOne({ user: user._id });
  let datenow = new Date();
  let tryDate = new Date(
    datenow.getFullYear(),
    datenow.getMonth(),
    currentDate,
  );
  let prevDate = budget.history;
  let startDate;
  let endDate;
  let data;
  if (prevDate.length === 0) {
    endDate = new Date(
      tryDate.getFullYear(),
      tryDate.getMonth() + 1,
      tryDate.getDate(),
    );
    data = { startDate: tryDate, endDate, limit };
    prevDate.push(data);
  } else {
    let lstInd = prevDate.at(-1).endDate;
    let nxt = new Date(
      lstInd.getFullYear(),
      lstInd.getMonth(),
      lstInd.getDate(),
    );
    if (tryDate >= nxt) {
      prevDate.push({
        startDate: tryDate,
        endDate: new Date(
          tryDate.getFullYear(),
          tryDate.getMonth() + 1,
          currentDate,
        ),
        limit,
      });
    } else {
      prevDate.forEach((dates) => {
        if (tryDate < dates.endDate) {
          let ind = prevDate.indexOf(dates);
          prevDate[ind].startDate = tryDate;
          prevDate[ind].endDate = new Date(
            tryDate.getFullYear(),
            tryDate.getMonth() + 1,
            tryDate.getDate(),
          );
          prevDate[ind].limit = limit;
        }
      });
    }
  }

  let updatedBudget = await Budget.findOneAndUpdate(
    {
      user: user._id,
    },
    { limit, currentDate: tryDate, history: prevDate },
    { new: true },
  );

  return updatedBudget;
};

module.exports = budgetService;
