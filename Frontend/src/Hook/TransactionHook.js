import { useState } from "react";

const useTransaction = () => {
  const [maxPage, setMaxPage] = useState(1);
  const [transaction, setTransaction] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState({});
  const [totalDocuments, setTotalDocuments] = useState();

  const [draftFilter, setDraftFilter] = useState({
    page: 1,
    query: {
      minAmount: null,
      maxAmount: null,
      type: null,
      sort: null,
      category: null,
      startDate: null,
      endDate: null,
      thisMonth: null,
    },
  });
};
