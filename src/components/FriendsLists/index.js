import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, getDatabase, ref, serverTimestamp, set } from "firebase/database";
import { auth } from "../../features/api/firebaseApi";
import styled from "styled-components";

import { sortsNameByAscending, sortsNameByDecending, updateSelectedUser } from "../../features/reducers/message";
import SearchInput from "../layouts/SearchInput";

export default function FriendsList() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const database = getDatabase();
  const users = useSelector((state) => state.message.data.users);
  const currentId = auth.currentUser;

  const startChats = useCallback(
    async (e) => {
      const selectUserName = e.target.name;
      const combinedId = currentId.uid > selectUserName ? currentId.uid + selectUserName : selectUserName + currentId.uid;
      const reference = ref(database, "chats/", combinedId);
      const userChatsData = await get(reference);

      if (!userChatsData.exists()) {
        set(ref(database, "userChats/" + selectUserName), {
          [combinedId]: {
            chatId: combinedId,
            id: auth.currentUser.uid,
            displayName: currentId.displayName,
            photoURL: currentId.photoURL,
            date: serverTimestamp(),
          },
        });
      }

      dispatch(updateSelectedUser({selectUserName, combinedId}));
    },
    [currentId.displayName, currentId.photoURL, currentId.uid, database, dispatch]
  );

  function sortName(e) {
    if (e.target.value === "descending") {
      dispatch(sortsNameByDecending());
    }

    if (e.target.value === "ascending") {
      dispatch(sortsNameByAscending());
    }
  }

  return (
    <Wrapper>
      <FriendsHeader>
        <InputWrapper>
          <SearchInput onKeywordSubmit={setKeyword} />
        </InputWrapper>
        <SortName onChange={sortName}>
          <option value="ascending" >오름차순 정렬</option>
          <option value="descending" >내림차순 정렬</option>
        </SortName>
      </FriendsHeader>
      <ListWrapper>
        {users?.allIds?.map(
          (user) =>
            users[user]?.id !== currentId?.uid &&
            users[user]?.displayName.includes(keyword) && (
              <Profile key={users[user].id}>
                <ProfilePicture src={users[user].photoURL} />
                <ProfileName>{users[user]?.displayName}</ProfileName>
                <ChatButton
                  name={users[user].id}
                  value={users[user]?.displayname}
                  onClick={startChats}
                >
                  대화하기
                </ChatButton>
              </Profile>
            )
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

const FriendsHeader = styled.header`
  display: flex;
  background-color: white;
  justify-content: space-between;
  padding: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 3;
`;

const ProfilePicture = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  flex: 3;
  padding: 0 0 0 20px;
`;

const ChatButton = styled.button`
  flex: 1;
`;

const InputWrapper = styled.header`
`;

const SortName = styled.select`
  flex: 1fr;
`;
