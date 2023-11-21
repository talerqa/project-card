import { ChangeEvent, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import s from "./editProfile.module.scss";

import { EditSvg } from "@/assets/components/edit";
import { Loader } from "@/assets/components/loader";
import { Logout } from "@/assets/components/logout";
import { defaultAva } from "@/assets/defaultAva";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ControlledInput } from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";
import { useEditProfileMutation, useLogoutMutation } from "@/services/auth";
import { useAppSelector } from "@/services/store";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3" + " characters"),
});

export const EditProfile = (): JSX.Element => {
  const [editProfile] = useEditProfileMutation({
    fixedCacheKey: "shared-edit",
  });

  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);
  const [isNameUpdating, setIsNameUpdating] = useState(false);

  const [nameEditMode, setNameEditMode] = useState(false);

  const { avatar, name, email } = useAppSelector((state) => state.userReducer);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChangeClick = () => {
    inputRef && inputRef.current?.click();
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const formData = new FormData();

      file && formData.append("avatar", file);

      setIsAvatarUpdating(true);
      await editProfile(formData);
      setIsAvatarUpdating(false);
    }
  };

  const handleNameEditClick = () => {
    setNameEditMode(true);
  };

  const handleFormSubmit = async (data: any) => {
    setIsNameUpdating(true);
    await editProfile({ name: data.name });
    setIsNameUpdating(false);

    setNameEditMode(false);
  };

  return (
    <Card className={s.editProfileCard}>
      <Typography variant={"large"} as={"span"} className={s.heading}>
        Personal Information
      </Typography>
      {isAvatarUpdating ? (
        <Loader class={s.avaLoader} />
      ) : (
        <AvaInterface
          handleUpload={handleUpload}
          inputRef={inputRef}
          handleImageChangeClick={handleImageChangeClick}
          avatar={avatar}
        />
      )}
      {isNameUpdating ? (
        <Loader class={s.nameLoader} />
      ) : (
        <NameInterface
          nameEditMode={nameEditMode}
          handleFormSubmit={handleFormSubmit}
          name={name || ""}
          email={email || ""}
          handleNameEditClick={handleNameEditClick}
        />
      )}
    </Card>
  );
};

type WithNameEditModeProps = {
  handleFormSubmit: (data: any) => void;
  name: string | undefined;
};

const WithNameEditMode = (props: WithNameEditModeProps) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.name,
    },
  });

  return (
    <form onSubmit={handleSubmit(props.handleFormSubmit)}>
      <ControlledInput
        type="text"
        name="name"
        label="Nickname"
        control={control}
        autoFocus
        className={s.nameInput}
      />
      <Button type="submit" className={s.saveButton}>
        Save Changes
      </Button>
    </form>
  );
};

type WithoutNameEditModeProps = {
  name: string | undefined;
  email: string | undefined;
  handleNameEditClick: () => void;
};

const WithoutNameEditMode = (props: WithoutNameEditModeProps) => {
  const [logout] = useLogoutMutation({ fixedCacheKey: "shared-logout" });
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Typography variant={"h1"} as={"h1"} className={s.name}>
        {props.name}
        <button onClick={props.handleNameEditClick}>
          <EditSvg />
        </button>
      </Typography>
      <Typography variant={"body2"} as={"span"} className={s.email}>
        {props.email}
      </Typography>
      <Button
        type="button"
        className={s.logoutButton}
        onClick={handleLogoutClick}
      >
        <Logout />
        Logout
      </Button>
    </>
  );
};

type AvaInterfacePropsType = {
  avatar?: string;
  inputRef: any;
  handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageChangeClick: () => void;
};

const AvaInterface = ({
  avatar,
  inputRef,
  handleUpload,
  handleImageChangeClick,
}: AvaInterfacePropsType) => {
  return (
    <div className={s.imageContainer}>
      <img
        alt="default-image"
        className={s.userAvatar}
        src={avatar || defaultAva}
      />
      <input
        type="file"
        accept="image/jpg, image/jpeg"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleUpload}
      />
      <button onClick={handleImageChangeClick}>
        <EditSvg />
      </button>
    </div>
  );
};

type NameInterfacePropsType = {
  nameEditMode: boolean;
  handleFormSubmit: (data: any) => void;
  name: string;
  handleNameEditClick: () => void;
  email: string;
};

const NameInterface = ({
  nameEditMode,
  handleFormSubmit,
  name,
  handleNameEditClick,
  email,
}: NameInterfacePropsType) => {
  if (nameEditMode) {
    return <WithNameEditMode handleFormSubmit={handleFormSubmit} name={name} />;
  } else {
    return (
      <WithoutNameEditMode
        handleNameEditClick={handleNameEditClick}
        name={name}
        email={email}
      />
    );
  }
};
