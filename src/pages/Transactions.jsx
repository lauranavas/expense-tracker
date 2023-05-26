import React from "react";
import TransactionsList from "../components/Transactions/TransactionsList";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const Transactions = () => {
  return (
    <div className='bg-pink-100 px-5 py-3 rounded-xl flex-grow'>
      <div className='flex flex-row justify-between items-center mb-3'>
        <h3 className='text-4xl font-bold mb-3'>Transactions</h3>

        <Link to='/new' className='py-1 px-2 rounded-lg text-center text-white font-bold bg-pink-600 hover:bg-pink-500 inline-flex items-center'>
          <FiPlusCircle className="mr-1" />
          Add new
        </Link>
      </div>
      <TransactionsList />
    </div>
  );
};

export default Transactions;
