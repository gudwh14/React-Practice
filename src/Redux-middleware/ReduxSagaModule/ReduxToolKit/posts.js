/*
    Redux-toolkit 을 이용해서 리덕스 구성하기
    npm install @reduxjs/toolkit
    Redux 사용시 문제점
    - 저장소 구성의 복잡성
    - 많은 패키지 필요성(의존성)
    - 한 작업 시 필요한 수 많은 코드양(boilerplate)

    리덕스를 라이브러리 없이 사용 시 1개의 액션을 생성해도 액션타입 정의 -> 액션함수 생성 -> 리듀서 정의 의 작업이 필요하다.
    많아지는 액션을 관리하기 위해 redux-actions 을, 불변성 보존을 위한 immer, store 값을 효율적으로 핸들링하여
    불필요한 리렌더링을 막기 위해 reselect, 비동기 작업을 위한 thunk 와 saga 등 리덕스의 유효한 기능을 사용하기 위해
    4~5개의 라이브러리를 사용해야 했다.
    하지만 Redux Toolkit 은 내장된 기능으로 saga 를 제외한 위의 모든 기능을 제공한다.
 */
import {createSlice} from "@reduxjs/toolkit";
import {reducerUtils ,createPromiseSaga , createPromiseSagaById , handleAsyncActions , handleAsyncActionsById} from "../../lib/asyncUtils";

// createSlice = createAction + createReducer 의 형태로 DUCKS 패턴을 가진다.

const postsSlice = createSlice({
    name : 'posts',
    initialState : {
        posts : reducerUtils.initial(),
        post : reducerUtils.initial()
    },
    reducers : {
        GET_POSTS(state, action) {
            state.posts = reducerUtils.loading();
        },
        GET_POSTS_SUCCESS(state, action) {
            state.posts = reducerUtils.success(action.payload);
        },
        GET_POSTS_ERROR(state, action) {
            state.posts = reducerUtils.error(action.error);
        },
        GET_POST(state, action) {
            state.post[action.meta] = reducerUtils.loading();
        }
        ,
        GET_POST_SUCCESS(state, action) {
            state.post[action.meta] = reducerUtils.success(action.payload);
        },
        GET_POST_ERROR(state, action) {
            state.post[action.meta] = reducerUtils.error(action.error);
        }
    },
});

// reducer , actions 들을 가져와서 export 시켜준다.
const { reducer, actions } = postsSlice;
export const {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_ERROR
} = actions;

export default reducer;