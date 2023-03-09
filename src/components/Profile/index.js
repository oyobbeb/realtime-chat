import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { auth } from "../../features/api/firebaseApi";
import { updateSelectedUser } from "../../features/reducers/message";
import CurrentUsersChatListsByDate from "../layouts/CurrentUsersChatListsByDate";

export default function Profile({ id }) {
  const currentId = auth.currentUser;
  const dispatch = useDispatch();

  const selectChat = (value) => {
    const selectUserName = value;
    const combinedId = currentId.uid > selectUserName ? currentId.uid + selectUserName : selectUserName + currentId.uid;

    dispatch(updateSelectedUser({selectUserName, combinedId}))
  };

  return (
      <ProfileWrapper onClick={() => selectChat(id.id)}>
        <ProfilePicture src={id.photoURL} />
        <DescriptionWrapper>
          <ProfileName>
            {id.displayName}
          </ProfileName>
          <ProfileDescription>
            {id.lastMessage}
          </ProfileDescription>
        </DescriptionWrapper>
      <CurrentUsersChatListsByDate date={id.date} />
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 10px 0 10px 0;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfilePicture = styled.img`
  height: 52px;
  width: 52px;
  border-radius: 50%;
  object-fit: cover;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 0 0 20px;
`;

const ProfileName = styled.div`
  flex: 1;
`;

const ProfileDescription = styled.div`
`;
