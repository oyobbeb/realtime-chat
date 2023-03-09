import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../api/firebaseApi";

const data = {
  users: {
    allIds: [],
  },
  userChats: {
    text: "",
  },
  chats: {}
}

const initialState = {
  data,
  mode: "friends",
  selectedUser: {},
};

export const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    getUserChats: (state, action) => {
      state.data.userChats = action.payload;
    },
    getUsers: (state, action) => {
      const newUserId = Object.keys(action.payload);

      newUserId.map(id => {
        if (!state.data.users[id]) {
          state.data.users[id] = {
            id: action.payload[id].id,
            displayName: action.payload[id].displayName,
            photoURL: action.payload[id].photoURL,
          }

          state.data.users.allIds.push(id);
        }
      });
    },
    getChatMessages: (state, action) => {
      state.data.chats = action.payload
    },
    updateSelectedUser: (state, action) => {
      state.selectedUser = {
        id: action.payload.selectUserName,
        chatId: action.payload.combinedId,
      }
    },
    updateChatsLists: (state, action) => {
      if (!state.data.userChats[auth.currentUser?.uid]) {
        state.data.userChats = {
          [auth.currentUser.uid]: action.payload,
        }
      }
    },
    sortsNameByAscending: (state) => {
      state.data.users.allIds.sort();
    },
    sortsNameByDecending: (state) => {
      state.data.users.allIds.sort().reverse();
    },
  }
})

export const {
  changeMode,
  getUsers,
  getUserChats,
  getChatMessages,
  updateSelectedUser,
  updateChatsLists,
  sortsNameByAscending,
  sortsNameByDecending,
} = messageReducer.actions;
export default messageReducer.reducer;
