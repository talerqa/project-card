import {HeaderTable, Sort, Table} from "@/components/ui/table";
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
import {Typography} from "@/components/ui/typography";
import s from './deck.module.scss'
import {TabSwitcher} from "@/components/ui/tab-switcher";
import {SliderWithUseState} from "@/components/ui/slider/slider.stories.tsx";
import {IconSvgButton} from "@/components/ui/button/button.stories.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";

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

  return (<div className={s.deck}>
      <div className={s.packListBlock}>
        <Typography variant={'large'} as={'p'} children={'Packs list'}/>
        <Button type={"button"} children={'Add New Pack'}
                onClick={() => createDeck({name: '4444'})}/>
      </div>
      <div className={s.packListFind}>
        <Inputs type="search"
                placeholder="Input search"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
        />
        <TabSwitcher tabs={['My Cards', 'All Cards']} activeTab={1}/>
        <SliderWithUseState label='Number of cards'
                            value={[0, 20]}
                            step={1}
                            minStepsBetweenThumbs={1}/>
        <Button type={'button'}
                variant='secondaryWithIcon'
                children={<Typography variant={'subtitle2'}
                                      as={'span'}
                                      children={'Clear Filter'}/>}
                icon={<IconSvgButton className={s.iconTrash}
                                     children={<TrashIcon/>}/>}/>
      </div>
      <Root className={s.rootTable}>
        <HeaderTable columns={[
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
        ]} sort={orderBy} onSort={setSort}

        />
        <Body  className={s.headerTable}>
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

    </div>
  );
};
