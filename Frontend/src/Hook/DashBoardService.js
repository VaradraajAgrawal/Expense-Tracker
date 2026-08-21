import { getTransaction } from "../Services/transaction";
import { getBudget } from "../Services/budget";
import { getUser } from "../Services/user";
import { useCallback, useEffect, useRef, useState } from "react";

export const useDashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [budget, setBudget] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const isMounted = useRef(true);
  const refreshLogic = useRef(null);
  const fetchDashboard = useCallback(
    async ({ controller, refreshing = false } = {}) => {
      const signal = controller.signal;
      if (isMounted.current) {
        setError(null);
        if (refreshing) {
          setIsRefreshing(true);
        }
        try {
          const [budgetData, userData, transactionData] = await Promise.all([
            getBudget({
              signal,
            }),
            getUser({ signal }),
            getTransaction({ signal }),
          ]);
          if (isMounted.current) {
            setBudget(budgetData);
            setTransaction(transactionData);
            setUser(userData);
          }
        } catch (err) {
          if (err.message === "ERR_CANCELED") {
            return;
          }
          if (isMounted.current) {
            setError(err);
          }
        } finally {
          // if abortA reaches FINALLY it shouldnt make refLogic null thats why condition belongs here //
          if (controller === refreshLogic.current) {
            refreshLogic.current = null;
          }
          if (isMounted.current) {
            setIsRefreshing(false);
            setInitialLoad(false);
          }
        }
      }
    },
    [],
  );

  const refreshClicked = () => {
    // Previous Refresh getting aborted which is the first controller A, when useEffect ran for 1st time //
    if (refreshLogic.current) {
      refreshLogic.current.abort();
    }

    // New controller being created for 1st Refresh //
    const controller = new AbortController();
    refreshLogic.current = controller;

    fetchDashboard({ controller, refreshing: true });
  };

  useEffect(() => {
    const controller = new AbortController();
    isMounted.current = true;
    fetchDashboard({ controller });
    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [fetchDashboard]);

  return { budget, transaction, user, error, isRefreshing, initialLoad };
};
