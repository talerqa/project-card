import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import s from "./deck.module.scss";

import { EditSvg } from "@/assets/components/edit.tsx";
import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { TriggerDropDown } from "@/assets/components/triggerDropDown.tsx";
import edit from "@/assets/img/edit.svg";
import play from "@/assets/img/play.svg";
import trash from "@/assets/img/trash.svg";
import { BackToPage } from "@/components/common/backToPage";
import { Button } from "@/components/ui/button";
import { DialogsModal } from "@/components/ui/dialogs";
import { DropDown, ItemDropDown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/inputs";
import { Page } from "@/components/ui/page";
import { Pagination } from "@/components/ui/pagination";
import { HeaderTable, Table } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { AddNewCardModal } from "@/pages/deck/addNewCardModal";
import { useAuthMeQuery } from "@/services/auth";
import { CardType, useGetCardsQuery, useGetDeckQuery } from "@/services/decks";

export type ModalType =
  | ""
  | "Delete Card"
  | "Edit Card"
  | "Learn"
  | "Add New Card";

export const Deck = () => {
  let { id } = useParams();
  const [answer, setName] = useState<string>("");
  const { data } = useGetDeckQuery({ id });
  const { data: auth } = useAuthMeQuery();
  const { data: cards } = useGetCardsQuery({
    id,
    answer,
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { Root, Body, Row, Cell } = Table;
  const [showModal, setShowModal] = useState<ModalType>("");
  // const [pack, setPack] = useState()

  const closeModalHandler = () => {
    setOpen(false);
    setShowModal("");
  };

  return (
    <Page className={s.deck}>
      <div className={s.backToDecks}>
        <BackToPage link={"/decks"} />
      </div>
      <div>
        {data?.userId === auth?.id ? (
          <div className={s.blockHeaderDeck}>
            <div className={s.blockTitleDeck}>
              <Typography className={s.title} variant={"large"} as={"h2"}>
                My Pack
              </Typography>
              {cards?.items.length !== 0 && (
                <>
                  {" "}
                  <DropDown
                    className={s.dropDown}
                    children={
                      <div className={s.menu}>
                        <ItemDropDown
                          img={play}
                          title={"Learn"}
                          onClick={() => navigate(`../decks/${data?.id}/learn`)}
                        />
                        <ItemDropDown
                          img={edit}
                          title={"Edit"}
                          onClick={() => console.log(213432)}
                        />
                        <ItemDropDown
                          img={trash}
                          title={"Delete"}
                          onClick={() => console.log(213432)}
                        />
                      </div>
                    }
                    trigger={
                      <button className={s.trigger}>
                        <TriggerDropDown />
                      </button>
                    }
                  />
                </>
              )}
            </div>
            {cards?.items.length !== 0 && (
              <Button
                className={s.buttonAddNewCardHeader}
                type={"button"}
                variant={"primary"}
                children={"Add New Card"}
                onClick={() => {
                  setShowModal("Add New Card");
                  setOpen(true);
                }}
              />
            )}
          </div>
        ) : (
          <>
            <Typography
              className={s.title}
              variant={"large"}
              as={"h2"}
              children={"Friend's Pack"}
            />
          </>
        )}
      </div>

      <DialogsModal open={open} setOpen={setOpen} title={showModal}>
        {showModal === "Add New Card" && (
          <AddNewCardModal
            //item={pack}
            closeModalHandler={closeModalHandler}
          />
        )}

        {/*{showModal === 'Delete Pack' &&*/}
        {/*    <DeleteDeckModal item={pack}*/}
        {/*                     closeModalHandler={closeModalHandler}/>}*/}
        {/*{showModal === 'Edit Pack' &&*/}
        {/*    <EditModalForm item={pack} closeModalHandler={closeModalHandler}/>}*/}
        {/*{showModal === 'Add New Pack' &&*/}
        {/*    <AddNewCardModal item={pack} closeModalHandler={closeModalHandler}/>}*/}
      </DialogsModal>

      {data?.userId === auth?.id ? (
        <div className={s.mainBlock}>
          {cards?.items.length === 0 ? (
            <>
              <Typography
                variant={"body1"}
                as={"span"}
                className={s.emptyDeck}
                children={
                  "This pack is empty. Click add new learnCard to fill this pack"
                }
              />
              <Button
                className={s.buttonAddNewCard}
                type={"button"}
                variant={"primary"}
                children={"Add New Card"}
                onClick={() => {
                  setShowModal("Add New Card");
                  setOpen(true);
                }}
              />
            </>
          ) : (
            <>
              <Input
                type="search"
                placeholder="Input search"
                className={s.searchInput}
                value={answer}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
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
                  {cards?.items.length &&
                    cards.items.map((item: CardType) => {
                      return (
                        <Row key={item.id}>
                          <Cell className={s.cell}>
                            <p className={s.name}>
                              {item.question}
                              {item.questionImg ? (
                                <img
                                  src={item?.questionImg as string}
                                  alt="cover"
                                  className={s.image}
                                />
                              ) : (
                                <></>
                              )}
                            </p>
                          </Cell>
                          <Cell className={s.cell}>{item.answer}</Cell>
                          <Cell className={s.cell}>
                            {new Date(item.updated).toLocaleDateString()}
                          </Cell>
                          <Cell>
                            {item.grade}
                            <button
                              onClick={() => {
                                // setPack(item)
                                setOpen(true);
                                // setShowModal('Edit Pack')
                              }}
                            >
                              <EditSvg />
                            </button>
                            <button
                              onClick={() => {
                                // setPack(item)
                                setOpen(true);
                                // setShowModal('Delete Pack')
                              }}
                            >
                              <TrashIcon />
                            </button>
                          </Cell>
                        </Row>
                      );
                    })}
                </Body>
              </Root>
              <Pagination
                pageSizeValue={[
                  { title: "10", value: "10" },
                  { title: "20", value: "20" },
                ]}
                totalPages={cards?.pagination.totalPages}
                itemsPerPage={cards?.pagination.itemsPerPage}
                // currentPage={currentPage}
                // className={s.pagination}
                // onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
                // onClick={(value: number) => setCurrentPage(value)}
              />
            </>
          )}
        </div>
      ) : (
        <div>
          {cards?.items.map((item: CardType) => {
            return (
              <div key={item.id}>
                <p> {item.id}</p>
                <p> {item.answer}</p>
                <p> {item.question}</p>
                <p> {item.rating}</p>
                <p> {item.grade}</p>
              </div>
            );
          })}
          OTHER DECK
        </div>
      )}
    </Page>
  );
};
