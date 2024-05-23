import {
  FaCircleInfo,
  FaCirclePlus,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";
import { useDeleteBudget } from "../../hooks/useDeleteBudget";
import useAuthContext from "../../hooks/useAuthContext";

import PropTypes from "prop-types";
import { useState } from "react";
import BudgetModal from "./BudgetModal";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DeleteModal from "../Transactions/DeleteModal";

const BudgetRow = ({ budget }) => {
  const { budgetId, name, type, goal, openDate, members, userId } = budget;
  const date = new Date(openDate).toDateString();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuthContext();
  const { mutate } = useDeleteBudget(axiosPrivate, budgetId);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const emails = members.map((member) => (
    <span key={member.id} className="text-gray-500 text-sm">
      {member.email}&nbsp;
    </span>
  ));

  return (
    <div
      key={budgetId}
      className="flex bg-white px-3 sm:px-5 py-2 mb-1 hover:bg-slate-50 duration-300"
    >
      <div className="grow flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-bold text-gray-700 sm:text-xl">
            {name}
          </span>
          <button
            className="cursor-pointer"
            onClick={() => navigate(`/budgets/${budgetId}`, { state: budget })}
          >
            <FaCircleInfo className="text-orange-500 text-xl" />
          </button>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">{type}</p>
        {emails}
      </div>

      <div className="w-1/4 flex flex-col gap-2">
        <p className="text-green-700 font-bold">&#8377; {goal}</p>
        <p className="text-xs sm:text-base">{date}</p>
      </div>

      <div className="flex flex-col gap-6 items-center ml-3 py-1">
        <button
          title="Add Transaction"
          onClick={() =>
            navigate("/addTransaction", { state: { budgetId, name } })
          }
        >
          <FaCirclePlus className="text-xl text-green-600 hover:text-green-700" />
        </button>

        {userId === user.userId && (
          <>
            <button onClick={() => setShowEditModal(true)} title="Edit Budget">
              <FaPenToSquare className="text-xl text-blue-600 cursor-pointer hover:text-blue-700" />
            </button>

            <button
              onClick={() => {
                setShowDeleteModal(true);
                // mutate(budgetId);
              }}
              title="Delete Budget"
            >
              <FaTrashCan className="text-xl text-red-500 cursor-pointer hover:text-red-600 hover:animate-bounce" />
            </button>
          </>
        )}
      </div>

      {showEditModal && (
        <BudgetModal
          budget={budget}
          setShowModal={setShowEditModal}
          isEdit={true}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          id={budgetId}
          mutate={mutate}
        />
      )}
    </div>
  );
};

BudgetRow.propTypes = {
  budget: PropTypes.object.isRequired,
};
export default BudgetRow;
