import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const MessageSlice = createSlice({
   name: "chat",
   initialState: {
      chat: [],
      seen: null,
      groupmessage: [],
      userInfo: [], // huz-stg
      onlineStatus: [], // huz-stg
   },
   reducers: {
      Messages: (state, action) => {
         state.chat = action.payload;
         // console.log("Messages", state.chat);
      },
      addNewMessage: (state, action) => {
         const copyMessgaes = [...state.chat];
         copyMessgaes.unshift(action.payload);
         state.chat = copyMessgaes;
         // console.log("state.chat", state.chat);
      },
      groupMessages: (state, action) => {
         state.groupmessage = action.payload;
         // console.log('group Message', state?.groupmessage);
      },
      groupNewmessage: (state, action) => {
         const messgaes = [...state.groupmessage];
         messgaes.unshift(action.payload);
         state.groupmessage = messgaes;
         // console.log('group copyMessgaes', state?.groupmessage);
      },
      concateChatMsg: (state, action) => {
         const newChatMessages = _.concat(state.chat, action.payload);
         state.chat = newChatMessages;
      },
      Media: (state, action) => {
         const messgaes = [action.payload, ...state.chat];
         state.chat = messgaes;
      },
      newData: (state, action) => {
         const message = [action.payload, ...state.chat];
         state.chat = message;
      },
      newGroupImage: (state, action) => {
         const messgaes = [action.payload, ...state.groupmessage];
         state.groupmessage = messgaes;
      },
      concateGroupChatMsg: (state, action) => {
         const newChatMessages = _.concat(state.groupmessage, action.payload);
         state.groupmessage = newChatMessages;
      },
      markSeenTrue: (state, action) => {
         state.chat = action?.payload;
      },

      seenMsg: (state, action) => {
         state.seen = action.payload;
      },

      setChatPartner: (state, action) => {
         state.seen = action.payload;
      },

      clearChat: (state, action) => {
         state.chat = [];
         state.groupmessage = [];
      },
      // huza-stg
      userInfoNotify: (state, action) => {
         state.userInfo = action.payload.i_mute_this_group;
      },
      statusChat: (state, action) => {
         state.onlineStatus = action?.payload;
      },
      mute: (state, action) => {
         // console.log('here is mute action', action?.payload);
         state.userInfo = action.payload;
      },
   },
});

export const {
   Messages,
   addNewMessage,
   clearChat,
   Media,
   newData,
   concateChatMsg,
   groupNewmessage,
   groupMessages,
   newGroupImage,
   seenMsg,
   concateGroupChatMsg,
   markSeenTrue,
   setChatPartner,
   userInfoNotify,
   statusChat,
   mute,
} = MessageSlice.actions;
export default MessageSlice.reducer;
