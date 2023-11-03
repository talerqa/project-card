import {useNavigate, useParams} from "react-router-dom";
import {CardType, useGetCardsQuery, useGetDeckQuery} from "@/services/decks";
import {useAuthMeQuery} from "@/services/auth";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import s from './deck.module.scss'
import {HeaderTable, Table} from "@/components/ui/table";
import {Page} from "@/components/ui/page";
import {AddNewCardModal} from "@/pages/deck/addNewCardModal";
import {BackToPage} from "@/components/common/backToPage";
import {DropDown, ItemDropDown} from "@/components/ui/dropdown";
import play from "@/assets/img/play.svg";
import edit from "@/assets/img/edit.svg";
import trash from "@/assets/img/trash.svg";
import {TriggerDropDown} from "@/assets/components/triggerDropDown.tsx";
import {Inputs} from "@/components/ui/inputs";


export const Deck = () => {

  let {id} = useParams();
  const [answer, setName] = useState<string>("");
  const {data} = useGetDeckQuery({id})
  const {data: auth} = useAuthMeQuery()
  const {data: cards} = useGetCardsQuery({
    id,
    answer

  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  console.log(id)
  const {Root, Body, Row, Cell} = Table;

  return <Page className={s.deck}>
    <div className={s.backToDecks}>
      <BackToPage link={'/decks'}/>
    </div>
    <div>
      {data?.userId === auth?.id ?
        <div className={s.blockTitleDeck}>
          <Typography className={s.title}
                      variant={'large'} as={'h2'}
                      children={'My Pack'}/>
          <DropDown
            className={s.dropDown}
            children={
              <div className={s.menu}>
                <ItemDropDown img={play} title={'Learn'}
                              onClick={() => navigate(`../decks/${data?.id}/learn`)}/>
                <ItemDropDown img={edit} title={'Edit'}
                              onClick={() => console.log(213432)}/>
                <ItemDropDown img={trash} title={'Delete'}
                              onClick={() => console.log(213432)}/>
              </div>}
            trigger={<button className={s.trigger}>
              <TriggerDropDown/>
            </button>}/>
        </div>
        : <>
          <Typography className={s.title}
                      variant={'large'} as={'h2'}
                      children={"Friend\'s Pack"}/>

        </>

      }
    </div>
    <AddNewCardModal open={open} setOpen={setOpen} card={data}/>
    <Inputs
      type="search"
      placeholder="Input search"
      className={s.searchInput}
      value={answer}
      onChange={(event) => {
        setName(event.target.value);
      }}
    />

    {data?.userId === auth?.id ?
      <div className={s.mainBlock}>
        {cards?.items.length === 0 ?
          <>
            <Typography variant={'body1'}
                        as={'span'}
                        className={s.emptyDeck}
                        children={'This pack is empty. Click add new learnCard to fill this pack'}/>
            <Button className={s.buttonAddNewCard}
                    type={'button'}
                    children={'Add New Card'}
                    onClick={() => setOpen(true)}
            />
          </>
          : <>
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
                  {/*  return <RowTable*/
                  }
                  {/*    key={item.id}*/
                  }
                  {/*    item={item}*/
                  }
                  {/*    setActiveMenu={setOpenMenu}*/
                  }
                  {/*    setPack={setPack}*/
                  }
                  {/*    setShowModal={setShowModal}*/
                  }
                  {/*  />*/
                  }
                  {/*})}*/
                  }

                  return (<Row key={item.id}>
                    <Cell className={s.cell}>
                      <p className={s.name}>
                        {item.question}
                        {item.questionImg ?
                          <img src={item?.questionImg as string}
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
                  </Row>)
                })}
              </Body>
              {/*<DeckModal*/}
              {/*  activeMenu={openMenu}*/}
              {/*  setActiveMenu={setOpenMenu}*/}
              {/*  item={pack}*/}
              {/*  setShowModal={setShowModal}*/}
              {/*  showModal={showModal}*/}
              {/*/>*/}
            </Root></>}


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
        {cards?.items.map((item: CardType) => {
          return <div key={item.id}>
            <p>        {item.id}</p>
            <p>    {item.answer}</p>
            <p>    {item.question}</p>
            <p>   {item.rating}</p>
            <p>   {item.grade}</p>
          </div>
        })}
        OTHER DECK
      </div>
    }

  </Page>
}

