import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, set, getDatabase, onValue } from "firebase/database";
import { auth } from "../../features/api/firebaseApi";
import { getChatMessages, getUsers, getUserChats } from "../../features/reducers/message";
import styled from "styled-components";

import SideHeader from "../layouts/SideHeader";
import ChatBox from "../ChatBox";

export default function Home() {
  const dispatch = useDispatch();
  const database = getDatabase();
  const data = useSelector(state => state.message.data);
  const reference = ref(database, "users/" + auth.currentUser.uid);

  useEffect(() => {
    function writeCurrentUser() {
      set(reference, {
        id: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });
    }
    writeCurrentUser();
  }, [data, reference]);

  useEffect(() => {
    function handleData() {
      if (data.userChats['text'] === "") {
        onValue(ref(database, "userChats"), (snapshot) => {
          const data = snapshot.val();
          dispatch(getUserChats(data));
        },
        {
          onlyOnce: true
        }
      );

        onValue(ref(database, "users/"), (snapshot) => {
          const data = snapshot.val();
          dispatch(getUsers(data));
        });

        onValue(ref(database, "chats/"), (snapshot) => {
          const data = snapshot.val();
          dispatch(getChatMessages(data));
        });
      }
    }

    handleData();
  }, [data.userChats, database, dispatch, reference]);

  return (
    <HomeWrapper>
      <SideHeader />
      <ChatWrapper>
        <ChatBox />
      </ChatWrapper>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.main`
  display: flex;
  margin: 0 2vh 0 2vh;
`;

const ChatWrapper = styled.div`
  flex: 6;
`;
