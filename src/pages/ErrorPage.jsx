import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-600 mb-3">Oops!</h1>
      <p className="text-xl font-semibold mb-2">
        <i>404 - Page {error.statusText || error.message} 👋</i>
      </p>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to="/" className="mt-4 text-2xl font-bold text-green-800">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
