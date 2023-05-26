import React from "react";
import PropTypes from "prop-types";

import Tag from "./Tag";
import { formatTimeAgo, toUSDFormat } from "../../utils/utils";
import { useRef } from "react";

function TransactionItem({ transaction }) {
  const ele = useRef(null);
  const formattedAmount = toUSDFormat(transaction.amount);
  const formattedDate = formatTimeAgo(new Date(transaction.date));

  return (
    <div
      ref={ele}
      className='bg-pink-300 flex flex-row justify-between items-center py-3 px-5 w-full rounded-lg mb-3'
    >
      {/* begin::Left */}
      <div className='flex flex-col justify-start items-start'>
        <div className='inline-flex items-center gap-2 flex-wrap'>
          <h5 className='text-lg font-bold text-pink-950'>{transaction.expense}</h5>
          <Tag text={transaction.category} />
        </div>
        <span>{formattedDate}</span>
      </div>
      {/* end::Left */}

      {/* begin::Right */}
      <div className='flex flex-col justify-start items-end'>
        <span className='text-3xl font-bold'>{formattedAmount}</span>
        <span className='text-right'>
          paid by <b>{transaction["payment-method"]}</b>
        </span>
      </div>
      {/* end::Right */}
    </div>
  );
}

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default TransactionItem;
