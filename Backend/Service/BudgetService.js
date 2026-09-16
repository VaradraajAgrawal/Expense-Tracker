const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const budgetService = async ({ limit, currentDate, user } = {}) => {
  // VARIABLES AND FUNCTIONS REQUIRED //
  let budget = await Budget.findOne({ user });
  let oldData;
  let newData;
  let updatedData;
  let isActive = false;
  let datenow = new Date();
  let tryDate;
  if (currentDate) {
    tryDate = new Date(datenow.getFullYear(), datenow.getMonth(), currentDate);
  }
  let prevDate = budget.history;
  let startDate;
  let endDate;
  let data;

  // ------------------------------------------------------------------------ //

  // UPDATE ONLY IF LIMIT GIVEN BY FRONTEND //
  if (limit && !currentDate) {
    // tryDate would be the currentdate and we are adding the data in prevDate //
    if (prevDate.length === 0) {
      endDate = new Date(
        datenow.getFullYear(),
        datenow.getMonth() + 1,
        datenow.getDate(),
      );
      data = {
        oldData: null,
        newData: { startDate: datenow, endDate, limit },
        isActive: true,
        leftOut: {},
      };
      prevDate.push(data);
    } else {
      // Updating the value of limit in prevDate so the currentDate remains the same only updating limit //
      const lastData = prevDate.at(-1);
      console.log(lastData);
      lastData.newData.limit = limit;
      tryDate = lastData.newData.startDate;
    }
  }

  if (currentDate && !limit) {
    let limiter;
    prevDate.forEach((item) => {
      if (
        item.isActive === true &&
        (item.newData.limit === null || item.newData.startDate === null)
      ) {
        throw new Error("Need to Mention Limit");
      } else if (item.isActive === true) {
        item.isActive = false;
        oldData = {
          startDate: item.newData.startDate,
          endDate: item.newData.endDate,
          limit: item.newData.limit,
        };
        newData = {
          startDate: tryDate,
          endDate: new Date(
            tryDate.getFullYear(),
            tryDate.getMonth() + 1,
            tryDate.getDate(),
          ),
          limit: item.newData.limit,
        };
        item.leftOut = {
          startDate: oldData.startDate,
          endDate: newData.startDate,
        };
      }
    });
    prevDate.push({ newData, oldData, isActive: true });
  }

  // First Time Registring Budget //
  if (currentDate && limit) {
    if (prevDate.length === 0) {
      endDate = new Date(
        tryDate.getFullYear(),
        tryDate.getMonth() + 1,
        tryDate.getDate(),
      );
      data = {
        oldData: null,
        newData: { startDate: tryDate, endDate, limit },
        isActive: true,
        leftOut: {},
      };
    }
    // Already Has Budget //
    else {
      let lstInd = prevDate.at(-1).newData.endDate;
      let lastIndex = prevDate.at(-1);
      // If user just Registered then the value in newData and oldData fields would be null so we change that to current date //
      if (lstInd === null) {
        lstInd = tryDate;
      }
      let nxt = new Date(
        lstInd.getFullYear(),
        lstInd.getMonth(),
        lstInd.getDate(),
      );

      // New Date Being Registered FOR NEXT MONTH //
      if (tryDate >= nxt) {
        lastIndex.isActive = false;
        prevDate.push({
          oldData: null,
          newData: {
            startDate: tryDate,
            endDate: new Date(
              tryDate.getFullYear(),
              tryDate.getMonth() + 1,
              currentDate,
            ),
            limit,
          },
          isActive: true,
          leftOut: {},
        });
      }
      // Current Month Budget Being Changed //
      else {
        prevDate.forEach((dates) => {
          if (tryDate < dates.newData.endDate) {
            let ind = prevDate.indexOf(dates);
            // Setting OLD DATA AND NEW DATA //
            prevDate[ind].isActive = false;
            oldData = {
              startDate: prevDate[ind].newData.startDate,
              endDate: prevDate[ind].newData.endDate,
              limit: prevDate[ind].newData.limit,
            };
            newData = {
              startDate: tryDate,
              endDate: new Date(
                tryDate.getFullYear(),
                tryDate.getMonth() + 1,
                tryDate.getDate(),
              ),
              limit,
            };
            prevDate[ind].leftOut = {
              startDate: oldData.startDate,
              endDate: newData.startDate,
            };
          }
        });
        updatedData = {
          oldData,
          newData,
          isActive: true,
        };
        prevDate.push(updatedData);
      }
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
