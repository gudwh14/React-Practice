import {combineReducers} from "redux";
import counter from "./counter";

const rootMiddleReducer = combineReducers({
    counter
})

export default rootMiddleReducer;