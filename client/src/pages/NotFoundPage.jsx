import React from "react";
import Loader from "@/components/Loader";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const NotFoundPage = () => {
  useDocumentTitle("Error 404");
  
  return (
    <div className="text-center font-bold text-5xl ">
      <Loader />
      <div className="text-red-600">
        <div>Error 404</div>
        <div>NotFoundPage</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
