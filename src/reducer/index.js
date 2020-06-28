import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import articleReducer from "./articles";
import filter from "./filter";
import comments from "./comments";

export default combineReducers({
	counter: counterReducer,
	articles: articleReducer,
	filter,
	comments
});
