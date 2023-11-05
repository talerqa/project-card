import s from "./infoTable.module.scss";

import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Button } from "@/components/ui/button";
import { IconSvgButton } from "@/components/ui/button/button.stories.tsx";
import { Input } from "@/components/ui/inputs";
import { SliderWithUseState } from "@/components/ui/slider/slider.stories.tsx";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { Typography } from "@/components/ui/typography";
import { ShowModalType } from "@/pages/decks";

type Props = {
  setShowModal: (value: ShowModalType) => void;
  setOpenMenu: (value: boolean) => void;
  setName: (name: string) => void;
  name: string;
  maxCardsCount?: number;
};

export const InfoTable = (props: Props) => {
  const { setShowModal, setOpenMenu, setName, name } = props;

  return (
    <>
      <div className={s.packListBlock}>
        <Typography variant={"large"} as={"p"}>
          Packs list
        </Typography>
        <Button
          type={"button"}
          onClick={() => {
            setShowModal("Add New Pack");
            setOpenMenu(true);
          }}
        >
          Add New Pack
        </Button>
      </div>
      <div className={s.packListFind}>
        <Input
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
            value={[0, 61]}
            step={1}
            minStepsBetweenThumbs={1}
          />
        </div>
        <Button
          type={"button"}
          variant="secondaryWithIcon"
          icon={
            <IconSvgButton className={s.iconTrash}>
              {" "}
              <TrashIcon />{" "}
            </IconSvgButton>
          }
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
    </>
  );
};
