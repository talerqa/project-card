import {ComponentProps, ComponentPropsWithoutRef} from "react";

import s from "./table.module.scss";
import {Direction, Field} from "@/services/decks";

type RootProps = ComponentProps<"table">;

const Root = ({className, children, ...rest}: RootProps) => {
  return (
    <table className={s.table} {...rest}>
      {children}
    </table>
  );
};

type HeadProps = ComponentProps<"thead">;

const Head = ({children, ...rest}: HeadProps) => {
  return <thead {...rest}>{children}</thead>;
};

type BodyProps = ComponentProps<"tbody">;

const Body = ({children, ...rest}: BodyProps) => {
  return <tbody {...rest}>{children}</tbody>;
};

type RowProps = ComponentProps<"tr">;

const Row = ({children, ...rest}: RowProps) => {
  return (
    <tr className={s.tableRow} {...rest}>
      {children}
    </tr>
  );
};

type HeadCellProps = ComponentProps<"th">;

const HeadCell = ({className, children, ...rest}: HeadCellProps) => {
  return (
    <th className={""} {...rest}>
      {children}
    </th>
  );
};

type CellProps = ComponentProps<"td">;

const Cell = ({className, children, ...rest}: CellProps) => {
  return (
    <td className={""} {...rest}>
      {children}
    </td>
  );
};

// Header component with sorting functionality

export type Column = {
  key: any;
  title: any;
};

export type Sort = {
  key: Field;
  direction: Direction;
} | null;

export const Header: React.FC<Omit<ComponentPropsWithoutRef<"thead"> & {
  columns: Column[];
  sort?: Sort;
  onSort?: (sort: Sort) => void;
}, "children">> = ({columns, sort, onSort, ...restProps}) => {
  const handleSort = (key: Field) => {

    if (!onSort) return;
    if (sort?.key !== key) return onSort({key, direction: "asc"});
    if (!sort) return;
    if (sort.direction === "desc") return onSort(null);

    return onSort({
      key,
      direction: sort?.direction === "asc" ? "desc" : "asc",
    });
  };

  const displaySortDirection = (key: Field) => {

    if (sort && sort.key === key) {
      switch (sort.direction) {
        case "asc":
          return "▲";
        case "desc":
          return "▼";
        default:
          return "";
      }
    }
  };



  return (
    <Head {...restProps}>
      <Row>
        {columns.map(({title, key}) => (
          <Table.HeadCell key={key} onClick={() => handleSort(key)}>
            {title}
            {displaySortDirection(key)}
          </Table.HeadCell>
        ))}
      </Row>
    </Head>
  );
};

export const Table = {Root, Head, Body, Row, HeadCell, Cell, Header};
