import { combineReducers } from "redux";
import articlesReducer from "./articlesReducer";

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export default rootReducer;
