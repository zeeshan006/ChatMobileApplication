// import { configureStore } from "@reduxjs/toolkit";
// import Color_theme from "../reducer/Color_theme";
// import { combineReducers } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const persistConfig = {
//    key: "root",
//    storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//    Color_theme: Color_theme,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//    reducer: persistedReducer,

//    middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//          immutableCheck: false,
//          serializableCheck: false,
//       }),
// });
// export const persistor = persistStore(store);

// import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// REDUX-PERSIST TRIAL
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Color_theme from "../reducer/Color_theme";
import chat from "../reducer/chat";
import allUsers from "../reducer/allUsers";
import { combineReducers } from "redux";
import {
   FLUSH,
   PAUSE,
   PERSIST,
   persistReducer,
   persistStore,
   PURGE,
   REGISTER,
   REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
   ColorTheme: Color_theme,
   chat: chat,
   allUsers: allUsers,
});

const persistConfig = {
   key: "root",
   storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,

   // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
   middleware: getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
});

export const persistor = persistStore(store);
export default store;
