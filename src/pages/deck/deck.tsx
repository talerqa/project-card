import {useParams} from "react-router-dom";
import {CardType, useGetCardsQuery, useGetDeckQuery} from "@/services/decks";
import {useAuthMeQuery} from "@/services/auth";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import s from './deck.module.scss'
import {HeaderTable, Table} from "@/components/ui/table";
import {Page} from "@/components/ui/page";
import {BackToPage} from "@/components/common/backToPage";
import {Pagination} from "@/components/ui/pagination";
import {EditSvg} from "@/assets/components/edit.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";
import {ShowModalType} from "@/pages/decks";
import {HeaderDeck} from "@/pages/deck/headerDeck";
import {Grade} from "@/components/ui/grade";

export type ModalType = '' | 'Delete Card' | 'Edit Card' | 'Learn' |
  'Add New Card'

export const Deck = () => {

  let {id} = useParams();
  const [question, setQuestion] = useState<string>("");
  const {data} = useGetDeckQuery({id})
  const {data: auth} = useAuthMeQuery()
  const {data: cards} = useGetCardsQuery({
    id,
    question,
  })

  const [open, setOpen] = useState(false)
  const {Root, Body, Row, Cell} = Table;
  const [showModal, setShowModal] = useState<ModalType | ShowModalType>('')
  // const [pack, setPack] = useState()

  return <Page className={s.deck}>
    <BackToPage className={s.backToDecks}/>
    <HeaderDeck open={open}
                setOpen={setOpen}
                showModal={showModal}
                auth={auth}
                setShowModal={setShowModal}
                deck={data}
                cards={cards}
                setQuestion={setQuestion}
                question={question}
    />
    {data?.userId === auth?.id ?

      <div className={s.mainBlock}>
        <>
          </>
        {data?.cardsCount === 0 ?
          <>
            <Typography variant={'body1'}
                        as={'span'}
                        className={s.emptyDeck}
                        children={'This pack is empty. Click add new learnCard to fill this pack'}/>
            <Button className={s.buttonAddNewCard}
                    type={'button'}
                    variant={'primary'}
                    children={'Add New Card'}
                    onClick={() => {
                      setShowModal('Add New Card')
                      setOpen(true)
                    }}
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
                {data?.cardsCount && cards?.items.map((item: CardType) => {
                  console.log(item.questionImg)
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
                    <Cell className={s.cell + ' ' + s.createdByRow}>
                      <Grade value={item.grade} maxRating={5}/>
                      <div className={s.buttonBlock}>
                        <button
                          className={s.button}
                          onClick={() => {
                            // setPack(item)
                            setOpen(true)
                            // setShowModal('Edit Pack')
                          }}>
                          <EditSvg/>
                        </button>
                        <button
                          className={s.button}
                          onClick={() => {
                            // setPack(item)
                            setOpen(true)
                            // setShowModal('Delete Pack')
                          }}>
                          <TrashIcon/>
                        </button>
                      </div>
                    </Cell>
                  </Row>)
                })}
              </Body>
            </Root>
            <Pagination
              pageSizeValue={[
                {title: "10", value: "10"},
                {title: "20", value: "20"},
              ]}
              totalPages={cards?.pagination.totalPages}
              itemsPerPage={cards?.pagination.itemsPerPage}
              // currentPage={currentPage}
              // className={s.pagination}
              // onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
              // onClick={(value: number) => setCurrentPage(value)}
            />
          </>}
      </div>
      : <div>
        {cards?.items.map((item: CardType) => {
          return <div key={item.id}>
            <p>        {item.id}</p>
            <p>    {item.answer}</p>
            <p>    {item.question}</p>
            <p>   {item.rating}</p>
            <Grade value={item.grade} maxRating={5}/>
          </div>
        })}
        OTHER DECK
      </div>
    }

  </Page>
}


{/*<div className={s.blockHeaderDeck}>*/
}
{/*  {data?.userId === auth?.id ?*/
}
{/*    <>*/
}
{/*      <div className={s.blockTitleDeck}>*/
}
{/*        <Typography className={s.title}*/
}
{/*                    variant={'large'} as={'h2'}*/
}
{/*                    children={'My Pack'}/>*/
}
{/*        {data?.cardsCount !== 0 &&*/
}
{/*            <>*/
}
{/*                <DropDown className={s.dropDown}*/
}
{/*                          children={<div className={s.menu}>*/
}
{/*                            <ItemDropDown img={play} title={'Learn'}*/
}
{/*                                          onClick={() => navigate(`../decks/${data?.id}/learn`)}/>*/
}
{/*                            <ItemDropDown img={edit} title={'Edit'}*/
}
{/*                                          onClick={() => {*/
}
{/*                                            setOpen(true)*/
}
{/*                                            setShowModal('Edit Pack')*/
}
{/*                                          }}/>*/
}
{/*                            <ItemDropDown img={trash} title={'Delete'}*/
}
{/*                                          onClick={() => {*/
}
{/*                                            setOpen(true)*/
}
{/*                                            setShowModal('Delete Pack')*/
}
{/*                                          }}/>*/
}
{/*                          </div>}*/
}
{/*                          trigger={<button className={s.trigger}>*/
}
{/*                            <TriggerDropDown/>*/
}
{/*                          </button>}/>*/
}
{/*            </>*/
}
{/*        }*/
}
{/*        <DeckModal*/
}
{/*          activeMenu={open}*/
}
{/*          setActiveMenu={setOpen}*/
}
{/*          item={data}*/
}
{/*          setShowModal={setShowModal}*/
}
{/*          showModal={showModal}*/
}
{/*        />*/
}
{/*      </div>*/
}
{/*      {cards?.items.length !== 0 ?*/
}
{/*        <Button className={s.buttonAddNewCardHeader}*/
}
{/*                type={'button'}*/
}
{/*                variant={'primary'}*/
}
{/*                children={'Add New Card'}*/
}
{/*                onClick={() => {*/
}
{/*                  setShowModal('Add New Card')*/
}
{/*                  setOpen(true)*/
}
{/*                }}*/
}
{/*        /> : <></>}*/
}
{/*    </>*/
}
{/*    : <>*/
}
{/*      <Typography className={s.title}*/
}
{/*                  variant={'large'} as={'h2'}*/
}
{/*                  children={"Friend\'s Pack"}/>*/
}
{/*      <Button className={s.buttonAddNewCardHeader}*/
}
{/*              type={'button'}*/
}
{/*              variant={'primary'}*/
}
{/*              children={'Learn to Pack'}*/
}
{/*              onClick={() => navigate(`../decks/${data?.id}/learn`)}*/
}
{/*      />*/
}
{/*    </>}*/
}
{/*</div>*/
}

