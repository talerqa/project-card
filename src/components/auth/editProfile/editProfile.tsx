import { ChangeEvent, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import s from "./editProfile.module.scss";

import { EditSvg } from "@/assets/components/edit";
import { Logout } from "@/assets/components/logout";
import { defaultAva } from "@/assets/defaultAva";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ControlledInput } from "@/components/ui/controlled";
import { Typography } from "@/components/ui/typography";
import {
  AuthMeResponseType,
  useEditProfileMutation,
  useLogoutMutation,
} from "@/services/auth";
import { useAppSelector } from "@/services/store";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3" + " characters"),
});

type UserData = Partial<Pick<AuthMeResponseType, "avatar" | "name" | "email">>;

export const EditProfile = (): JSX.Element => {
  const [editProfile] = useEditProfileMutation();

  const [nameEditMode, setNameEditMode] = useState(false);

  const { avatar, name, email } = useAppSelector((state) => state.userReducer);

  const [userData, setUserData] = useState<UserData>({
    avatar,
    name,
    email,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChangeClick = () => {
    inputRef && inputRef.current?.click();
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const formData = new FormData();

      file && formData.append("avatar", file);

      editProfile(formData);
    }
  };

  const handleNameEditClick = () => {
    setNameEditMode(true);
  };

  const handleFormSubmit = (data: UserData) => {
    setNameEditMode(false);
    if (data.name === userData.name) return;
    setUserData({ ...userData, name: data.name });
    editProfile({
      name: data.name,
    });
  };

  return (
    <Card className={s.editProfileCard}>
      <Typography variant={"large"} as={"span"} className={s.heading}>
        Personal Information
      </Typography>
      <div className={s.imageContainer}>
        <img
          alt="default-image"
          className={s.userAvatar}
          src={userData.avatar || defaultAva}
        />
        <input
          type="file"
          accept="image/jpg, image/jpeg"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleUpload}
        />
        <EditSvg onClick={handleImageChangeClick} />
      </div>
      {nameEditMode ? (
        <WithNameEditMode
          handleFormSubmit={handleFormSubmit}
          userData={userData}
        />
      ) : (
        <WithoutNameEditMode
          handleNameEditClick={handleNameEditClick}
          name={name}
          email={email}
        />
      )}
    </Card>
  );
};

type WithNameEditModeProps = {
  handleFormSubmit: (data: UserData) => void;
  userData: UserData;
};

const WithNameEditMode = (props: WithNameEditModeProps) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.userData.name,
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
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Typography variant={"h1"} as={"h1"} className={s.name}>
        {props.name}
        <EditSvg onClick={props.handleNameEditClick} />
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
