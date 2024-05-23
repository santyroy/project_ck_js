import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-3/4 m-4">
      <FaSpinner className="animate-spin text-4xl text-green-700" />
    </div>
  );
};

export default Loading;
