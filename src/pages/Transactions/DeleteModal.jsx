import { ButtonOutline } from "../../components/shared/Button";
import PropTypes from "prop-types";

const DeleteTransactionModal = ({ setShowModal, id, mutate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center px-5">
      <div className="bg-white p-7 flex flex-col gap-3 rounded">
        <h2>Are your sure to delete?</h2>
        <div className="flex gap-3">
          <ButtonOutline content="Yes" onClick={() => mutate(id)} />
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-800 py-1 px-3 text-white font-semibold rounded hover:bg-red-900 w-full sm:w-auto shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteTransactionModal.propTypes = {
  setShowModal: PropTypes.func,
  id: PropTypes.number,
  mutate: PropTypes.func,
};

export default DeleteTransactionModal;
