import useDocumentTitle from "@/hooks/useDocumentTitle";
import React from "react";

const ErrorPage = ({ error }) => {
  useDocumentTitle("ErrorPage");
  if (!error) return <p>No error Provided</p>;
  return (
    <div className="text-center font-bold text-xl my-5">
      <div className="text-red-600">{error?.response?.data?.message}</div>
    </div>
  );
};

export default ErrorPage;
