import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Column, Sort, SortCard, Table } from ".";

const { Root, Row, Body, Head, HeadCell, Cell } = Table;

const meta = {
  title: "Components/Table",
  component: Root,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Head>
          <Row>
            <HeadCell>Head Example 1</HeadCell>
            <HeadCell>Head Example 2</HeadCell>
            <HeadCell>Head Example 3</HeadCell>
            <HeadCell>Head Example 4</HeadCell>
            <HeadCell>Head Example 5</HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>Row 1 Cell 1</Cell>
            <Cell>Row 1 Cell 2</Cell>
            <Cell>Row 1 Cell 3</Cell>
            <Cell>Row 1 Cell 4</Cell>
            <Cell>Row 1 Cell 5</Cell>
          </Row>
          <Row>
            <Cell>Row 2 Cell 1</Cell>
            <Cell>Row 2 Cell 2</Cell>
            <Cell>Row 2 Cell 3</Cell>
            <Cell>Row 2 Cell 4</Cell>
            <Cell>Row 2 Cell 5</Cell>
          </Row>
        </Body>
      </>
    ),
  },
};

const data = [
  {
    title: "Project A",
    cardsCount: 10,
    updated: "2023-07-07",
    createdBy: "John Doe",
  },
  {
    title: "Project B",
    cardsCount: 5,
    updated: "2023-07-06",
    createdBy: "Jane Smith",
  },
  {
    title: "Project C",
    cardsCount: 8,
    updated: "2023-07-05",
    createdBy: "Alice Johnson",
  },
  {
    title: "Project D",
    cardsCount: 3,
    updated: "2023-07-07",
    createdBy: "Bob Anderson",
  },
  {
    title: "Project E",
    cardsCount: 12,
    updated: "2023-07-04",
    createdBy: "Emma Davis",
  },
];

const columns: Column[] = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "cardsCount",
    title: "Cards",
  },
  {
    key: "updated",
    title: "Last Updated",
  },
  {
    key: "createdBy",
    title: "Created by",
  },
];

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort | SortCard>(null);

    return (
      <Table.Root>
        <Table.Header columns={columns} sort={sort} onSort={setSort} />
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.title}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.createdBy}</Table.Cell>
              <Table.Cell>icons...</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    );
  },
};
