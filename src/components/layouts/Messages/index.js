import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import { auth } from "../../../features/api/firebaseApi"

export default function Messages({ message, senderId, date }) {
  const user = useSelector(state => state.message.data.users);
  const order  = new Date(date).toLocaleString();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message]);

  return senderId === auth.currentUser.uid ? (
    <MessageBoxRight ref={ref}>
      <MessageTop>
        <ProfilePicture src={user[senderId].photoURL} />
        <TextRight>{message}</TextRight>
      </MessageTop>
      <MessageBottom>{order}</MessageBottom>
    </MessageBoxRight>
  ) : (
    <MessageBox ref={ref}>
      <MessageTop>
        <ProfilePicture src={user[senderId].photoURL} />
        <Text>{message}</Text>
      </MessageTop>
      <MessageBottom>{order}</MessageBottom>
    </MessageBox>
  );
}

const MessageBoxRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 40px 20px 0 0;
`

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 0 20px;
`

const MessageTop = styled.div`
  display: flex;
`

const MessageBottom = styled.div`
  font-size: 12px;
  margin: 10px 0 0 0;
`

const ProfilePicture = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 20px 0 0;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.2);
`

const Text = styled.div`
  padding: 10px;
  max-width: 25vw;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.2);
`

const TextRight = styled.div`
  padding: 10px;
  max-width: 25vw;
  border-radius: 20px;
  background-color: rgb(245, 241, 241);
  color: black;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.2);
`
