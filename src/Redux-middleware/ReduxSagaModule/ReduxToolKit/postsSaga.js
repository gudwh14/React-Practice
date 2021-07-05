import * as postsAPI from '../../api/posts';
import {takeEvery} from 'redux-saga/effects';
import {createPromiseSaga, createPromiseSagaById} from "../../lib/asyncUtils";
import {GET_POST,GET_POSTS} from "./posts";

const getPostsSaga = createPromiseSaga(GET_POSTS,postsAPI.getPosts);

const getPostSaga = createPromiseSagaById(GET_POST,postsAPI.getPostById);

export function* postsToolKitSaga() {
    yield takeEvery(GET_POSTS,getPostsSaga);
    yield takeEvery(GET_POST,getPostSaga);
}