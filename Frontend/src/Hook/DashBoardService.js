import { getBudget } from "../Services/Dasboard/budget";
import { getTransaction } from "../Services/Dasboard/transaction";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUser } from "../Services/Dasboard/user";

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
            if (
              !refreshing ||
              (controller === refreshLogic.current && refreshing)
            ) {
              setBudget(budgetData);
              setTransaction(transactionData.filtered);
              setUser(userData.user);
            }
          }
        } catch (err) {
          if (err.message === "ERR_CANCELED") {
            return;
          }
          if (isMounted.current && !refreshing) {
            setError(err);
          }
          // including "controller === refreshLogic.current" as it will help to check race confition in refreshLogic //
          if (
            isMounted.current &&
            controller === refreshLogic.current &&
            refreshing
          ) {
            setError(err);
          }
        } finally {
          // if abortA reaches FINALLY it shouldnt make refLogic null thats why condition belongs here //
          if (
            isMounted.current &&
            controller === refreshLogic.current &&
            refreshing
          ) {
            refreshLogic.current = null;
            setIsRefreshing(false);
          }
          if (isMounted.current && !refreshing) {
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
