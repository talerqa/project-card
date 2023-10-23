import {Header, Sort, Table} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
  DeckType,
  Direction,
  Field,
  useCreateDeckMutation,
  useGetDecksQuery
} from "@/services/decks";
import {useMemo, useState} from "react";
import {Inputs} from "@/components/ui/inputs";
import {Pagination} from "@/components/ui/pagination";


export const Deck = () => {

  const {Root, Body, Row, Cell} = Table
  const [name, setName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [createDeck] = useCreateDeckMutation()
  const [orderBy, setSort] = useState<Sort>(null);

  type SortedString = `${Field}-${Direction}` | null;

  const sortedString = useMemo(() => {
    if (!orderBy) return null
    let sorted: SortedString = `${orderBy.key}-${orderBy.direction}`
    return sorted
  }, [orderBy])

  const {data} = useGetDecksQuery({
    currentPage,
    name,
    itemsPerPage,
    orderBy: sortedString
  });

  return (
    <>
      <Inputs type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
      />
      <Root>
        <Header columns={[
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
            key: "created",
            title: "Created by",
          },
        ]} sort={orderBy} onSort={setSort}/>
        <Body>
          {data?.items.map((item: DeckType) => {
            return (<Row key={item.id}>
              <Cell>{item.name}</Cell>
              <Cell>{item.cardsCount}</Cell>
              <Cell>{new Date(item.updated).toLocaleDateString()}</Cell>
              <Cell>{item.author.name}</Cell>
              {/*<Cell>{new Date(item.created).toLocaleDateString()}</Cell>*/}
            </Row>)
          })}
        </Body>
      </Root>
      <Pagination
        pageSizeValue={[
          {title: "10", value: "10"},
          {title: "20", value: "20"},
          {title: "50", value: "50"},
          {title: "100", value: "100"}
        ]}
        totalPages={data?.pagination.totalPages}
        itemsPerPage={data?.pagination.itemsPerPage}
        currentPage={currentPage}
        onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
        onClick={(value: number) => setCurrentPage(value)}
      />
      <Button type={"button"} children={'add deck'}
              onClick={() => createDeck({name: '4444'})}/>
    </>
  );
};

