import { getContext, takeEvery} from 'redux-saga/effects';
import * as postsAPI from '../api/posts';
import {reducerUtils, handleAsyncActionsById , handleAsyncActions, createPromiseSaga , createPromiseSagaById} from "../lib/asyncUtils";

/*
    리덕스 - 사가
    posts 모듈
 */

/*
    액션 타입 생성
 */

// 포스트 리스트 조회
const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR';

// 포스트 아이템 조회
const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

const GO_TO_HOME = 'posts/GO_TO_HOME';

/*
    액션 생성 함수
    기존에 redux-thunk 로 구현 할 때에는 getPosts 와 getPost 는 thunk 함수였는데
    이제는 redux-saga 를 사용하니까 순수 액션 객체를 반환하는 액션 생성 함수로 구현 할 수 있습니다.

    액션을 모니터링해서 특정 액션이 발생했을 때 호출할 사가 함수에서는 파라미터로 해당 액션을 받아올 수 있습니다.
    그래서 getPostSaga 의 경우엔 액션을 파라미터로 받아와서 해당 액션의 id 값을 참조 할 수 있죠.
    예를 들어서, dispatch({ type: GET_POST, payload: 1, meta: 1 })이란 코드가 실행 되면
    액션에서 action.payload 값을 추출하여 API 를 호출 할 때 인자로 넣어서 호출하는 것 입니다.
    여기서 meta 값이 있는 이유는 우리가 이전에 만들었던 handleAsyncActionsById 를 호환시키기 위함입니다.
    만약 handleAsyncActionsById를 사용하지 않는다면 meta 를 생략하셔도 됩니다.
    그리고 추후 우리가 리팩토링 과정에서 프로미스를 처리하는 사가 함수를 쉽게 만드는 함수를 만들건데요
    만약에 리팩토링을 하지 않을거라면 사실상 { type: GET_POST, id } 이런식으로 파라미터를 꼭 payload 라고 설정 할 필요는 없습니다.

 */

export const getPosts = () => ({ type : GET_POSTS });
// payload 는 파라미터 용도 , meta 는 리듀서에게 id 알려주기 위한 용도
export const getPost = (id) => ({ type : GET_POST , payload : id , meta : id});
export const goToHome = () => ({ type : GO_TO_HOME});

/*function* getPostsSaga() {
    try {
        // call 함수를 사용하면 특정 함수를 호출하고 , 결과가 반환될때 까지 대기합니다.
        const payload = yield call(postsAPI.getPosts);
        yield put({
            type : GET_POSTS_SUCCESS,
            payload : payload
        })
    }
    catch (e) {
        yield put({
            type : GET_POSTS_ERROR,
            error : true,
            payload : e
        })
    }
}*/
const getPostsSaga = createPromiseSaga(GET_POSTS,postsAPI.getPosts);

// 액션이 지니고 있는 값을 조회하고 싶다면 action 을 파라미터로 받아와서 사용 할 수 있습니다.
/*function* getPostSaga(action) {
    const param  = action.payload;
    const id = action.id;
    try {
        // call 함수의 두번째 인자부터 , 실행하고 싶은 함수의 인자를 넣어 주면 됩니다.
        const payload = yield call(postsAPI.getPostById,param);
        yield put ({
            type : GET_POST_SUCCESS,
            payload : payload,
            meta : id
        });
    }
    catch (e) {
        yield put({
            type : GET_POST_ERROR,
            error : true,
            payload : e,
            meta : id
        });
    }
}*/
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

function* goToHomeSaga() {
    const history = yield getContext('history');
    history.push("/");
}
// 사가들을 합차기
export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

// 초기값 설정
const initialState = {
    posts : reducerUtils.initial(),
    post : reducerUtils.initial()
}

// 리듀서 만들기
export default function posts(state = initialState , action ) {
    switch (action.type) {
        case GET_POSTS :
        case GET_POSTS_SUCCESS :
        case GET_POSTS_ERROR :
            return handleAsyncActions(GET_POSTS, 'posts' , true)(state, action);
        case GET_POST :
        case GET_POST_SUCCESS :
        case GET_POST_ERROR :
            return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
        default :
            return state;
    }
}