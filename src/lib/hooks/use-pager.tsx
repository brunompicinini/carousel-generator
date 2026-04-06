import { useState } from "react";
import { DocumentFormReturn } from "../document-form-types";

export function usePager(initialPage: number) {
  const [currentPage, _setCurrentPage] = useState(initialPage);
  const [forceScroll, setForceScroll] = useState(0);

  const onPreviousClick = () => {
    _setCurrentPage(currentPage - 1);
  };

  const onNextClick = () => {
    _setCurrentPage(currentPage + 1);
  };

  const setCurrentPage = (pageNum: number) => {
    _setCurrentPage(pageNum);
  };

  const scrollToPage = (pageNum: number) => {
    _setCurrentPage(pageNum);
    setForceScroll((v) => v + 1);
  };

  return {
    currentPage,
    forceScroll,
    onPreviousClick,
    onNextClick,
    setCurrentPage,
    scrollToPage,
  };
}
