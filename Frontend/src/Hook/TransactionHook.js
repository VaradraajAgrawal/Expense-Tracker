import { useCallback, useEffect, useRef, useState } from "react";
import { createTransactionService } from "../Services/Transaction/createTransaction";
import { getTransaction } from "../Services/Dasboard/transaction";
import { updateTransactionService } from "../Services/Transaction/updateTransactionService";
import { deleteTransactionService } from "../Services/Transaction/deleteTransactionService";
const initialFilters = {
  minAmount: null,
  maxAmount: null,
  type: null,
  sort: null,
  category: null,
  startDate: null,
  endDate: null,
  thisMonth: null,
};

export const useTransaction = () => {
  // =========================
  // Server Data
  // =========================

  const [transaction, setTransaction] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  // =========================
  // Filter State
  // =========================

  // What the user is currently selecting
  const [draftFilters, setDraftFilters] = useState(initialFilters);

  // What is currently being used for the server request
  const [appliedFilters, setAppliedFilters] = useState({
    ...initialFilters,
    page: 1,
  });

  // =========================
  // Request State
  // =========================

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // Request Lifecycle
  // =========================

  const isMounted = useRef(true);
  const currentReq = useRef(null);

  // =========================
  // Fetch Transactions
  // =========================

  const fetchTransaction = useCallback(
    async ({ controller, refreshing = false, query } = {}) => {
      const { signal } = controller;

      if (!isMounted.current) {
        return;
      }

      if (refreshing) {
        setIsRefreshing(true);
      }

      setError(null);

      try {
        const data = await getTransaction({
          signal,
          query,
        });

        if (isMounted.current && currentReq.current === controller) {
          setTransaction(data.filtered);
          setTotalDocuments(data.totalDocuments);
          setMaxPage(data.maxPage);
        }
      } catch (err) {
        if (!isMounted.current) {
          return;
        }

        if (err.message === "ERR_CANCELED") {
          return;
        }

        if (currentReq.current === controller) {
          setError(err);
        }
      } finally {
        if (isMounted.current && currentReq.current === controller) {
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  // =========================
  // Start New Request
  // =========================

  const startRequest = useCallback(
    ({ query, refreshing = false } = {}) => {
      if (!isMounted.current) {
        return;
      }

      // Previous request is no longer needed
      if (currentReq.current) {
        currentReq.current.abort();
      }

      // New request becomes the owner
      const controller = new AbortController();

      currentReq.current = controller;

      fetchTransaction({
        controller,
        refreshing,
        query,
      });
    },
    [fetchTransaction],
  );

  // =========================
  // Apply Filters
  // =========================

  const applyFilters = useCallback(() => {
    const newAppliedFilters = {
      ...draftFilters,
      page: 1,
    };

    setAppliedFilters(newAppliedFilters);

    startRequest({
      query: newAppliedFilters,
      refreshing: true,
    });
  }, [draftFilters, startRequest]);

  // =========================
  // Initial Request
  // =========================

  useEffect(() => {
    isMounted.current = true;

    startRequest({
      query: appliedFilters,
      refreshing: false,
    });

    return () => {
      isMounted.current = false;

      if (currentReq.current) {
        currentReq.current.abort();
      }

      currentReq.current = null;
    };
  }, []);

  // CRUD OPERATIONS //

  const refetchAppliedRequest = () => {
    startRequest({
      refreshing: true,
      query: appliedFilters,
    });
  };

  const createTransaction = async ({ amount, type, category } = {}) => {
    await createTransactionService({ amount, type, category });
    // we dont need to setTransaction as it is added in backend we just need to apply prev filter again and fetch data //
    refetchAppliedRequest();
  };

  const updateTransaction = async ({ data, id } = {}) => {
    // 2 API are being run 1st is to update the transaction and then we are refetching transaction from backend again so that the updates are visible //
    await updateTransactionService({ data, id });
    refetchAppliedRequest();
  };

  const deleteTransaction = async ({ id } = {}) => {
    await deleteTransactionService({ id });
    refetchAppliedRequest();
  };

  return {
    transaction,
    totalDocuments,
    maxPage,

    draftFilters,
    setDraftFilters,

    appliedFilters,
    applyFilters,

    isRefreshing,
    error,

    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
