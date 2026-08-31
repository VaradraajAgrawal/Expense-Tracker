import React from "react";
import { useTransaction } from "../Hook/TransactionHook";

const Transaction = () => {
  const data = useTransaction();

  console.log(data);

  return (
    <div>
      <h1>Transaction</h1>
    </div>
  );
};

export default Transaction;
