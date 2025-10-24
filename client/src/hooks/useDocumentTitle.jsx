import React, { useEffect } from "react";

const useDocumentTitle = (title, fallback = "no title") => {
  useEffect(() => {
    document.title = title || fallback;
  }, [title, fallback]);
};

export default useDocumentTitle;
