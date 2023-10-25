import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    userStore: userReducer,
    noteStore: noteReducer,
  },
});

export default store;
