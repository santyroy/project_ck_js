import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex justify-center items-center p-14">
      <FaSpinner className="animate-spin text-4xl text-green-700" />
    </div>
  );
};

export default Loading;
