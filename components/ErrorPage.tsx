import { AlertTriangle } from "lucide-react";
import React from "react";

const ErrorPage = ({ message }: { message?: String }) => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 rounded-full bg-red-100 p-4 animate-pulse">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Something went wrong 😔
        </h2>
        <p className="mt-2 text-gray-500 max-w-sm">
          {message ??
            "We ran into an unexpected issue. Please try again or come back later."}
        </p>
      </div>

      <button
        // onClick={() => }
        className="mt-6 rounded-xl bg-red-500 px-5 py-2.5 text-white font-medium shadow-md hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
