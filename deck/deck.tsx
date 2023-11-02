import {Link, useParams} from "react-router-dom";
import {CardType, useGetCardsQuery, useGetDeckQuery} from "@/services/decks";
import {useAuthMeQuery} from "@/services/auth";
import {ArrowBackSvg} from "@/assets/components/arrowBackSvg.tsx";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {AddNewCardModal} from "@/pages/deck/deck/addNewCardModal";
import {useState} from "react";
import s from './deck.module.scss'
import {HeaderTable, Table} from "@/components/ui/table";
import {Page} from "@/components/ui/page";

export const Deck = () => {

  let {id} = useParams();

  const {data} = useGetDeckQuery({id})

  const {data: auth} = useAuthMeQuery()

  const {data: cards} = useGetCardsQuery({id})

  const [open, setOpen] = useState(false)

  console.log(cards)

  const {Root, Body, Row, Cell} = Table;


  return <Page className={s.deck}>
    <div className={s.backToDecks}>
      <ArrowBackSvg/>
      <Typography variant={'body2'}
                  to={"/decks"}
                  as={Link}
                  children={'Back to Packs List'}/>
    </div>
    {data?.userId === auth?.id ?
      <div>
        {cards?.items.length === 0 &&
            <Typography variant={'body1'}
                        as={'p'}
                        children={'This pack is empty. Click add new card to fill this pack'}/>}
        <Button type={'button'} children={'Add New Card'}
                onClick={() => setOpen(true)}
        />
        <AddNewCardModal open={open} setOpen={setOpen} card={data}/>
        <Root className={s.rootTable}>
          <HeaderTable
            columns={[
              {
                key: "question",
                title: "Question",
              },
              {
                key: "answer",
                title: "Answer",
              },
              {
                key: "updated",
                title: "Last Updated",
              },
              {
                key: "!!!",
                title: "Grade",
              },
            ]}
            // sort={orderBy}
            // onSort={setSort}
          />
          <Body className={s.headerTable}>
            {cards?.items.length && cards.items.map((item: CardType) => {
              {/*  return <RowTable*/}
              {/*    key={item.id}*/}
              {/*    item={item}*/}
              {/*    setActiveMenu={setOpenMenu}*/}
              {/*    setPack={setPack}*/}
              {/*    setShowModal={setShowModal}*/}
              {/*  />*/}
              {/*})}*/}

              return (<Row key={item.id}>
                  <Cell className={s.cell}>
                    <p className={s.name}>
                      {item.question}
                      {item.questionImg ? <img src={item?.questionImg as string}
                                         alt="cover"
                                         className={s.image}/> : <></>}
                    </p>
                  </Cell>
                  <Cell className={s.cell}>{item.answer}</Cell>
                  <Cell className={s.cell}>
                    {new Date(item.updated).toLocaleDateString()}
                  </Cell>
                <Cell>
                  {item.grade}
                </Cell>
                {/*  <Cell className={`${s.createdByRow} ${s.cell}`}>*/}
                {/*    <span> {item.author.name}</span>*/}
                {/*    <button onClick={() => {*/}
                {/*      setPack(item)*/}
                {/*      setActiveMenu(true)*/}
                {/*      setShowModal('Learn')*/}
                {/*    }}>*/}
                {/*      <PlaySvg/>*/}
                {/*    </button>*/}

                {/*    {data?.id === item.userId && <button onClick={() => {*/}
                {/*      setPack(item)*/}
                {/*      setActiveMenu(true)*/}
                {/*      setShowModal('Edit Pack')*/}
                {/*    }}>*/}
                {/*        <EditSvg/>*/}
                {/*    </button>}*/}

                {/*    {data?.id === item.userId && <button onClick={() => {*/}
                {/*      setPack(item)*/}
                {/*      setActiveMenu(true)*/}
                {/*      setShowModal('Delete Pack')*/}
                {/*    }}>*/}
                {/*        <TrashIcon/>*/}
                {/*    </button>}*/}
                {/*  </Cell>*/}
              </Row>)})}
          </Body>
          {/*<DeckModal*/}
          {/*  activeMenu={openMenu}*/}
          {/*  setActiveMenu={setOpenMenu}*/}
          {/*  item={pack}*/}
          {/*  setShowModal={setShowModal}*/}
          {/*  showModal={showModal}*/}
          {/*/>*/}
        </Root>
        {/*<Pagination*/}
        {/*  pageSizeValue={[*/}
        {/*    {title: "10", value: "10"},*/}
        {/*    {title: "20", value: "20"},*/}
        {/*    {title: "50", value: "50"},*/}
        {/*    {title: "100", value: "100"},*/}
        {/*  ]}*/}
        {/*  totalPages={data?.pagination.totalPages}*/}
        {/*  itemsPerPage={data?.pagination.itemsPerPage}*/}
        {/*  currentPage={currentPage}*/}
        {/*  className={s.pagination}*/}
        {/*  onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}*/}
        {/*  onClick={(value: number) => setCurrentPage(value)}*/}
        {/*/>*/}
      </div>
      : <div>

        OTHER DECK
      </div>
    }

  </Page>
}