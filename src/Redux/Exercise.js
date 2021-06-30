import {createStore} from "redux";
import {act} from "@testing-library/react";
// createStore 는 스토어를 만들어 주는 함수 입니다.


// 리덕스에서 관리할 상태 정의
const initialState = {
    counter : 0,
    text : '',
    list : []
};

/* 액션 타입 정의 */
// 액션타입은 주로 대문자로 정의합니다.
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

/* 액션 생성함수 정의*/
// 액션 객채를 반환합니다.
// 액션 생성함수는 주로 camelCase 로 작성합니다.
const increase = () => {
    return {
        type : INCREASE // 액션 객체에서 type 값이 필수 입니다.
    };
}

const decrease = () => {
    return {
        type : DECREASE
    };
}

const changeText = (text) => {
    return {
        type : CHANGE_TEXT,
        text // 액션 생성 함수에는 type 필드 외 추가적으로 필드를 마음대로 넣을 수 있습니다.
    };
}

const addToList = (item) => {
    return {
        type : ADD_TO_LIST,
        item
    };
}

/*
    리듀서 만들기
    액션 생성 함수를 통해서 생성된 액션 객채들을 참조 하여 새로운 상태를 만드는 함수합니다.
    리듀서에서는 불변성을 꼭 지켜야 합니다!!
 */

function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE :
            return {
                ...state,
                counter : state.counter + 1
            }
        case DECREASE :
            return {
                ...state,
                counter: state.counter -1
            }
        case CHANGE_TEXT :
            return {
                ...state,
                text: action.text
            }
        case ADD_TO_LIST :
            return {
                ...state,
                list : state.list.concat(action.item)
            }
        default :
            return state;  // 리덕스에서 사용하는 reducer 는 default 일 경우 원래 state 반환해야한다.
    }
}

// 스토어 만들기
// reducer 를 인자로 넣어 store 를 생성합니다.
const store = createStore(reducer)

// store 안 상태를 조회 합니다.
console.log("현재 store 상태", store.getState());


// 스토어 안에 들어있는 상태가 바뀔때 마다 호출되는 리스너 함수 입니다.
const listener = () => {
    const state = store.getState();
    console.log(state);
}

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을때는 unsubscribe() 를 호출하면 됩니다.


// 액션들을 dispatch 해봅시다.
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("Redux Exercise"));
store.dispatch(addToList({id : 1 , text : "Hello"}));
