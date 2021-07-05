import {combineReducers} from "redux";
import counter, {counterSaga} from "../ReduxSagaModule/counter";
import {all} from 'redux-saga/effects';
import posts , {postsSaga} from "../ReduxSagaModule/posts";
import {postsToolKitSaga} from "../ReduxSagaModule/ReduxToolKit/postsSaga";
import reducer from "../ReduxSagaModule/ReduxToolKit/posts";

const rootMiddleReducer = combineReducers({
    counter,
    posts
})

// 프로젝트의 여러개의 사가를 합쳐서 루트사가로 만들어 준다.
export function* rootSaga() {
    yield all([counterSaga(), postsSaga(),postsToolKitSaga()]) // all 함수는 배열안의 여러 사가를 동시에 실행시켜주는 함수 입니다.
}


// toolkit 사가 포함
/*export function* rootSaga() {
    yield all([counterSaga(), postsSaga(),postsToolKitSaga()])
}*/



export default rootMiddleReducer;