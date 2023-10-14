import { useEffect, useState } from "react";
import { Select } from "../select";
import s from "./pagination.module.scss";
import { usePagination } from "./usePagination";

type PaginationProps = {
  totalItemsCount: number;
  pageSizeValue: Array<{ title: string; value: string }>;
};

export const Pagination = ({
  totalItemsCount,
  pageSizeValue,
}: PaginationProps) => {
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  console.log(activePage)
  const paginationRange = usePagination({
    pagesCount,
    pageSize,
    activePage,
  });

  useEffect(() => {
    setPagesCount(Math.ceil(totalItemsCount / pageSize));
  }, [totalItemsCount, pageSize]);

  const onNextClick = () => {
    if (activePage === pagesCount) return;
    setActivePage(activePage + 1);
  };

  const onPreviousClick = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  };

  const onPageNumberClick = (value: number) => {
    if (activePage === value) return;
    setActivePage(value);
  };

  const onSelectValueChange = (value: string) => {
    setPageSize(+value);
  };

  return (
    <div className={s.paginationContainer}>
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
          disabled={false}
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
