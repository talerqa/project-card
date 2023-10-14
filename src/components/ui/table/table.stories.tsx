import type { Meta, StoryObj } from "@storybook/react";

import { Table } from ".";

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
