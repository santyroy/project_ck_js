import { FaTrashCan } from "react-icons/fa6";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";

import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const TransactionRow = ({ transaction, by }) => {
  const [showModal, setShowModal] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuthContext();
  const {
    id,
    type,
    amount,
    category,
    date,
    budget,
    user: transactionUser,
  } = transaction;
  const timestamp = new Date(date);
  const formattedDate = `${timestamp.getDate()}/${
    timestamp.getMonth() + 1
  }/${timestamp.getFullYear()}`;

  const { mutate } = useDeleteTransaction(axiosPrivate);

  const width = by === "user" ? "sm:w-1/5" : "sm:w-1/6";

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row gap-2 mb-3 py-2 border-l-4 rounded shadow hover:bg-gray-100 ${
          type === "DEBIT" ? "border-l-red-500" : "border-l-green-500"
        }`}
      >
        <p className={`${width} font-bold text-xs sm:text-sm pl-3`}>{amount}</p>
        <p className={`${width} text-xs sm:text-sm pl-3 sm:pl-0`}>{category}</p>
        <p className={`${width} text-xs sm:text-sm pl-3 sm:pl-0`}>
          {formattedDate}
        </p>
        <p className={`${width} text-xs sm:text-sm pl-3 sm:pl-0`}>
          {budget?.name}
        </p>

        {by !== "user" && (
          <p className={`${width} text-xs sm:text-sm pl-3 sm:pl-0`}>
            {transactionUser?.name}
          </p>
        )}

        {/* Check if transaction is added by logged in user */}
        <div className={`${width} pl-3 sm:pl-0`}>
          {user.userId === transactionUser.userId && (
            <button
              onClick={() => {
                setShowModal(true);
                // mutate(id);
              }}
            >
              <FaTrashCan className="text-red-500 hover:animate-bounce text-lg" />
            </button>
          )}
        </div>

        {showModal && (
          <DeleteModal setShowModal={setShowModal} id={id} mutate={mutate} />
        )}
      </div>
    </>
  );
};

TransactionRow.propTypes = {
  transaction: PropTypes.object,
  by: PropTypes.string,
};

export default TransactionRow;
