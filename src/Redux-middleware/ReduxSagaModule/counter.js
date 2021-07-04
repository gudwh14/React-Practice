import {delay , put, takeEvery , takeLatest} from 'redux-saga/effects'

/*
    리덕스 - 사가 에서 사용할 모듈 생성
 */

/*
    액션 타입 선언
 */
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

/*
    액션 생성 함수
    외부에서 사용할수 있도록 export 키워드를 사용한다.
 */
export const increase = () => ({type : INCREASE});
export const decrease = () => ({type : DECREASE});
export const increaseAsync = () => ({type : INCREASE_ASYNC});
export const decreaseAsync = () => ({type : DECREASE_ASYNC});

/*
    사가 생성하기
    리덕스-사가 에서는 제너레이터함수를 사가 라고 표현
 */
function* increaseSaga() {
    yield delay(1000); // 1초를 기다립니다
    yield put(increase()); // put 함수는 특정 액션을 디스패치 해주는 함수입니다.
}

function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease());
}

// takeEvery, takeLatest 액션을 모니터링하는 함수 입니다.
// takeEvery : 특정 액션 타입에 대하여 디스패치 되는 모든 액션들을 처리하는 함수
// takeLatest : 특정 액션 타입에 대하여 디스패치 된 가장 마지막 액션을 처리하는 함수
export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 처리
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);  // 가장 마지막으로 디스패치된 DECREASE_ASYNC 처리
}


// 초기값
const initialState = 0;

/*
    리듀서 생성
 */
export default function counter (state = initialState , action) {
    switch (action.type) {
        case INCREASE :
            return state+1;
        case DECREASE :
            return state-1;
        default :
            return state;
    }
}

