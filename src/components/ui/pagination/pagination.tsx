import { useEffect, useState } from "react";

import s from "./pagination.module.scss";

import { ArrowLeftSvg } from "@/assets/components/arrowLeftSvg.tsx";
import { ArrowRightSvg } from "@/assets/components/arrowRightSvg.tsx";
import { Select, Typography } from "@/components";
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

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

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

  return (
    <div className={s.paginationContainer + " " + className}>
      <button onClick={onPreviousClick} className={s.paginationArrow}>
        <ArrowLeftSvg />
      </button>
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
      <button onClick={onNextClick} className={s.paginationArrow}>
        <ArrowRightSvg />
      </button>
      <Typography as={"p"} variant={"body2"} className={s.selectText}>
        Show
      </Typography>
      <div className={s.selectMenu}>
        <Select
          placeholder={itemsPerPage}
          array={pageSizeValue}
          onChange={onSelectValueChange}
          className={s.paginationSelect}
        />
      </div>
      <Typography as={"p"} variant={"body2"} className={s.selectText}>
        on page
      </Typography>
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
