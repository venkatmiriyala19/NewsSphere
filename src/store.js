import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./reducers/articlesReducer";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export default store;
