import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../layouts/Header";
import Messages from "../layouts/Messages";
import { auth } from "../../features/api/firebaseApi";
import { getDatabase, onValue, push, ref, serverTimestamp, update } from "firebase/database";
import { v4 as uuid } from "uuid";
import { getUserChats } from "../../features/reducers/message";

export default function ChatBox() {
  const dispatch = useDispatch();
  const database = getDatabase();
  const [chatMessage, setChatMessage] = useState("");
  const [message, setMessage] = useState("");
  const users = useSelector(state => state.message.data.users);
  const selectedUserId = useSelector(state => state.message.selectedUser.id);
  const chatId = useSelector(state => state.message?.selectedUser?.chatId);
  const chats = useSelector(state => state.message.data.chats);
  const selectedUser = useSelector(state => state.message.selectedUser);

  const handleSendMessage = useCallback(async(e) => {
    e.preventDefault();
    const reference = ref(database, "chats/" + chatId);

    if (!selectedUserId) {
      return alert('대화 상대를 선택해주세요');
    }

    push(reference, {
      messages: {
        id: uuid(),
        message,
        senderId:auth.currentUser.uid,
        date: serverTimestamp(),
      }
    });

    update(ref(database, "userChats/" + auth.currentUser.uid), {
      [chatId]: {
        id: users[selectedUserId].id,
        chat: chatId,
        displayName: users[selectedUserId].displayName,
        photoURL: users[selectedUserId].photoURL,
        lastMessage: message,
        senderId: auth.currentUser.uid,
        date: serverTimestamp(),
      }
    });

    update(ref(database, "userChats/" + selectedUserId), {
      [chatId]: {
        id: auth.currentUser.uid,
        chat: chatId,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        lastMessage: message,
        senderId: auth.currentUser.uid,
        date: serverTimestamp(),
      }
    });

    onValue(ref(database, "userChats/"), (snapshot) => {
      const data = snapshot.val();
      dispatch(getUserChats(data));
    });

    setMessage('');
  }, [chatId, database, dispatch, message, selectedUserId, users]);

  useEffect(() => {
    function updateMessage() {
      const chat = Object.keys(chats).map(chat => chat)
        .filter(chat => chat !== "undefined");
      const selectedChat = chat.map(id => id)
        .filter((selectedId) => selectedId === selectedUser.chatId)[0];

      if (selectedChat) {
        const selectedChatId = Object.keys(chats[selectedChat]);
        const messages = selectedChatId.map(
          chatId => chats[selectedChat][chatId]?.messages
        );
        setChatMessage(messages);
      }
    }

    updateMessage();
  }, [chats, database, selectedUser?.chatId]);

  return (
      <ChatBoxWrapper>
        <ContentsWrapper>
          <Header text={users[selectedUserId]?.displayName} />
          <ChatBoxTop>
            {chatMessage !== "" &&
              chatMessage?.map((message) =>
                <Messages key={message.id}
                  senderId={message.senderId}
                  date={message.date}
                  message={message.message}
                />
            )}
          </ChatBoxTop>
          <ChatBoxBottom>
            <ChatMessageInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Something..."
            />
            <ChatSubmitButton onClick={handleSendMessage} >Send</ChatSubmitButton>
          </ChatBoxBottom>
        </ContentsWrapper>
      </ChatBoxWrapper>
  );
}

const ContentsWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
`

const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ChatBoxTop = styled.div`
  height: 70vh;
  overflow-y: scroll;
  padding: 20px 10px;
`

const ChatBoxBottom = styled.form`
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
`

const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 100px;
  margin: 30px 10px;
  border-radius: 5px;
  flex: 1;
`

const ChatSubmitButton = styled.button`
  height: 100px;
  width: 70px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
