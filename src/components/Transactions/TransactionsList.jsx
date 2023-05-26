import React from "react";
import { useQuery } from "@tanstack/react-query";

import Tag from "./Tag";
import { getExpenses } from "../../firebase/expenses";
import TransactionItem from "./TransactionItem";

const TransactionsList = () => {
  const {
    isLoading,
    isError,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className='flex flex-col justify-start items-start'>
      {transactions?.length &&
        transactions.map((transaction, index) => <TransactionItem key={index} transaction={transaction} />)}
    </div>
  );
};

export default TransactionsList;
