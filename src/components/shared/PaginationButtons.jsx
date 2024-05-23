import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const PaginationButtons = ({ page, setPage, isLastPage = true }) => {
  return (
    <div className="flex items-center gap-2 text-sm sm:text-base border-gray-">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        <FaArrowLeft />
      </button>
      <p className="text-center text-sm sm:text-base">Page {page + 1}</p>
      <button
        onClick={() => {
          if (!isLastPage) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isLastPage}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

PaginationButtons.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
};

export default PaginationButtons;
