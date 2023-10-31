import {HeaderTable, Sort, Table} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {GetDecks, useGetDecksQuery,} from "@/services/decks";

import {useMemo, useState} from "react";

import {Inputs} from "@/components/ui/inputs";
import {Pagination} from "@/components/ui/pagination";
import {Typography} from "@/components/ui/typography";

import s from "./deck.module.scss";

import {TabSwitcher} from "@/components/ui/tab-switcher";
import {SliderWithUseState} from "@/components/ui/slider/slider.stories.tsx";
import {IconSvgButton} from "@/components/ui/button/button.stories.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";
import {Page} from "@/components/ui/page";
import {EditDeckModal} from "@/pages/deck/editDeckModal/editDeckModal.tsx";
import {PlaySvg} from "@/assets/components/play.tsx";
import {EditSvg} from "@/assets/components/edit.tsx";

export  type ShowModalType = 'delete' | 'edit' | 'learn' | 'addNewPack' | ''

export const Deck = () => {
  const {Root, Body, Row, Cell} = Table;
  const [name, setName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [orderBy, setSort] = useState<Sort>(null);

  const sortedString = useMemo(() => {
    if (!orderBy) return null;
    let sorted: GetDecks["orderBy"] = `${orderBy.key}-${orderBy.direction}`;
    return sorted;
  }, [orderBy]);

  const {data} = useGetDecksQuery({
    currentPage,
    name,
    itemsPerPage,
    orderBy: sortedString,
  });

  const [id, setId] = useState('')

  // const {data: dataDeck} = useGetDeckQuery({id})


  const [showModal, setShowModal] = useState<ShowModalType>('')

  const [pack, setItem] = useState()
  console.log(
    pack
  )
  const [activeMenu, setActiveMenu] = useState(false)

  return (
    <Page className={s.deck}>
      <div className={s.packListBlock}>
        <Typography variant={"large"} as={"p"}>
          Packs list
        </Typography>
        <Button
          type={"button"}
          onClick={() => setShowModal('addNewPack')}
        >
          Add New Pack
        </Button>
      </div>
      <div className={s.packListFind}>
        <Inputs
          type="search"
          placeholder="Input search"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <div>
          <Typography variant={"body2"} as={"span"}>
            Show packs cards
          </Typography>
          <TabSwitcher
            tabs={["My Cards", "All Cards"]}
            activeTab={1}
            title={"Show packs cards"}
          />
        </div>
        <div>
          <Typography variant={"body2"} as={"span"}>
            Number of cards
          </Typography>
          <SliderWithUseState
            label="Number of cards"
            value={[0, 20]}
            step={1}
            minStepsBetweenThumbs={1}
          />
        </div>
        <Button
          type={"button"}
          variant="secondaryWithIcon"
          icon={
            <IconSvgButton className={s.iconTrash} children={<TrashIcon/>}/>
          }
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
      {/*<Modal showModal={showModal} id={id} setShowModal={setShowModal}/>*/}

      <Root className={s.rootTable}>
        <HeaderTable
          columns={[
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
          ]}
          sort={orderBy}
          onSort={setSort}
        />
        <Body className={s.headerTable}>
          {data?.items.length && data.items.map((item: any) => {
            return <> <RowDeck data={item}
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                            setId={setId}
                               setItem={setItem}
            />
            </>
          })}
        </Body>
        <EditDeckModal
          // setShowModal={setShowModal}
          activeMenu={activeMenu}
          // data={dataDeck}
          setActiveMenu={setActiveMenu}
          pack={pack}
          id={id}
        />
      </Root>

      <Pagination
        pageSizeValue={[
          {title: "10", value: "10"},
          {title: "20", value: "20"},
          {title: "50", value: "50"},
          {title: "100", value: "100"},
        ]}
        totalPages={data?.pagination.totalPages}
        itemsPerPage={data?.pagination.itemsPerPage}
        currentPage={currentPage}
        className={s.pagination}
        onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
        onClick={(value: number) => setCurrentPage(value)}
      />
    </Page>
  );
};


const RowDeck = (props: any) => {
  const { Row, Cell} = Table;
  const {data: item, activeMenu, setItem, setActiveMenu, setId} = props



  return (
    <>


      <Row key={item.id}>

        <Cell className={s.cell} onClick={() => {
          setId(item.id)
        }}>{item.name}</Cell>
        <Cell className={s.cell}>{item.cardsCount}</Cell>
        <Cell className={s.cell}>
          {new Date(item.updated).toLocaleDateString()}
        </Cell>
        <Cell className={s.createdByRow + " " + s.cell}>
          <span> {item.author.name}</span>
          <PlaySvg/>

          <button onClick={() => {
            setItem(item)
            setActiveMenu(true)
            setId(item.id)
          }}>

            <EditSvg/>
          </button>

          <TrashIcon/>
        </Cell>
      </Row>
    </>
  )
}