import { useEffect, useState, useCallback } from "react";
import { getBudgetService } from "../Services/Budget/getBudgetService";
import { useRef } from "react";

export const useBudget = () => {
  const [budgetData, setBudgetData] = useState({});
  const [error, setError] = useState(null);
  let data;
  let isMounted = useRef(true);

  const fetchBudget = useCallback(async ({ signal } = {}) => {
    if (isMounted.current) {
      try {
        const data = await getBudgetService({ signal });
        if (isMounted.current) {
          setBudgetData(data);
        }
      } catch (err) {
        if (err.name !== "AbortError" && err.name !== "CanceledError") {
          setError(err);
        }
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const controller = new AbortController();
    fetchBudget({ signal: controller.signal });

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [fetchBudget]);

  return { budgetData, error };
};
