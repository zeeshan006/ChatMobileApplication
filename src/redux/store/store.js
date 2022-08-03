import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
