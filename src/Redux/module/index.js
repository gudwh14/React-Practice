import {combineReducers} from "redux";
import counter from "./counter";
import todos from "./todos";
/*
    루트 리듀서 만들기
    여러개의 리듀서 모듈을 사용할 경우 한개의 리듀서로 합쳐서 사용한다.
    이때 합치는 작업은 Redux 의 combineReducers 함수를 이용한다.
 */

const rootReducer = combineReducers({
    counter,
    todos
})

export default rootReducer;