import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../../features/reducers/message";

import ChatLists from "../../ChatLists";
import FriendsList from "../../FriendsLists";

export default function SideHeader() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.message.mode);

  function handleMode(e) {
    dispatch(changeMode(e.target.value));
  }

  return(
    <ModeWrapper>
      <ModeHeader>
        <ModeButton value="friends" onClick={handleMode}>
          Friends
        </ModeButton>
        <ModeButton value="chat" onClick={handleMode}>
          Chat
        </ModeButton>
      </ModeHeader>
      <Hr />
      {mode === "friends" && <FriendsList />}
      {mode === "chat" && <ChatLists />}
    </ModeWrapper>
  )
}

const ModeWrapper = styled.div`
  background-color: white;
  flex: 3;
  height: 105vh;
  padding: 0 2vh 0 0;
`

const ModeHeader = styled.div`
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModeButton = styled.button`
  flex: 1;
  height: 100%;
  text-align: center;
  border: hidden;
  background-color: white;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const Hr = styled.hr`
  height: 0;
  margin-top: 10px;
  border: 0.5px solid lightgray;
`

