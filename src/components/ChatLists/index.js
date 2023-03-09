import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../../features/api/firebaseApi";
import { updateChatsLists } from "../../features/reducers/message";
import Profile from "../Profile";

export default function ChatLists() {
  const database = getDatabase();
  const dispatch = useDispatch();
  const currentUser = auth.currentUser.uid;
  const userChats = useSelector(state => state.message.data?.userChats);
  const keyByCurrentUsersChats = Object.keys(userChats[currentUser]).map(id => id);
  const currentUsersChatsSentAt = keyByCurrentUsersChats.map(id => userChats[currentUser][id]);

  useEffect(() => {
    function handleData() {
      onValue(ref(database, "userChats/" + auth.currentUser.uid),
        (snapshot) => {
          const data = snapshot.val();
          dispatch(updateChatsLists(data));
        }
      );
    }

    handleData();
  }, [database, dispatch]);

  return (
    <Wrapper>
      <ListWrapper>
            {currentUsersChatsSentAt
              .sort((a, b) => b.date - a.date)
              .map((id) =>
              <Profile key={id.chat} id={id} />
            )}
      </ListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
