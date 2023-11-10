import { useState } from "react";

import s from "./pagination.module.scss";

import { Select } from "@/components";
import { usePagination } from "@/components/ui/pagination/usePagination.ts";

type PaginationProps = {
  className?: string;
  pageSizeValue: Array<{ title: string; value: string }>;
  onClick?: any;
  totalPages?: any;
  itemsPerPage?: any;
  currentPage?: any;
  onChangePerPage?: any;
};

export const Pagination = ({
  pageSizeValue,
  onClick,
  totalPages,
  currentPage,
  itemsPerPage,
  onChangePerPage,
  className,
}: PaginationProps) => {
  const [activePage, setActivePage] = useState<number>(currentPage);
  const [pageSize, setPageSize] = useState<number>(itemsPerPage);

  const paginationRange = usePagination({
    pagesCount: totalPages,
    pageSize,
    activePage,
  });

  const onNextClick = () => {
    if (activePage === totalPages) return;
    setActivePage(activePage + 1);
    onClick(activePage + 1);
  };

  const onPreviousClick = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
    onClick(activePage - 1);
  };

  const onPageNumberClick = (value: number) => {
    if (activePage === value) return;
    setActivePage(value);
    onClick(value);
  };

  const onSelectValueChange = (value: string) => {
    onChangePerPage(+value);
    setPageSize(+value);
  };

  console.log(activePage);

  return (
    <div className={s.paginationContainer + " " + className}>
      <span className={s.paginationArrow} onClick={onPreviousClick}>
        &#8249;
      </span>
      <div className={s.paginationPages}>
        {paginationRange?.map((item, index) => {
          return (
            <PageButton
              key={index}
              activePage={activePage}
              pageNumber={item}
              onClick={onPageNumberClick}
            />
          );
        })}
      </div>
      <span className={s.paginationArrow} onClick={onNextClick}>
        &#8250;
      </span>
      <p className={s.selectText}>Показать</p>
      <div className={s.selectMenu}>
        <Select
          placeholder={itemsPerPage}
          array={pageSizeValue}
          onChange={onSelectValueChange}
          className={s.paginationSelect}
        />
      </div>
      <p className={s.selectText}>на странице</p>
    </div>
  );
};

type PageButtonProps = {
  activePage: number;
  pageNumber: number | string;
  onClick: (value: number) => void;
};

const PageButton = ({ activePage, pageNumber, onClick }: PageButtonProps) => {
  const onButtonClick = (value: string | number) => {
    if (isNaN(Number(pageNumber))) return;
    onClick(+value);
  };

  return (
    <div
      onClick={() => onButtonClick(pageNumber)}
      className={
        isNaN(Number(pageNumber))
          ? s.dots
          : activePage == pageNumber
          ? s.paginationPage + " " + s.activePage
          : s.paginationPage
      }
    >
      {pageNumber}
    </div>
  );
};
