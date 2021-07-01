import {combineReducers} from "redux";
import counter from "./counter";
import posts from "./posts";

const rootMiddleReducer = combineReducers({
    counter,
    posts
})

export default rootMiddleReducer;