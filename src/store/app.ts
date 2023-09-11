import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import scoreReducer from "./scoreSlice";
import isOverReducer from "./isOverSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    score: scoreReducer,
    isOver: isOverReducer,
  },
});
