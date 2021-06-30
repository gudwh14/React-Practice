/* 액션 타입 선언하기 */

const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";

/* 액션 생성 함수 선언하기 */
let nextId = 1 ; // todo 데이터에서 사용할 고유 id

export const addTodo = (text) => ({
    type : ADD_TODO,
    todo : {
        id : nextId++, // 새로운 항목을 추가하고 id 값을 1 증가 시켜준다.
        text
    }
})

export const toggleTodo = (id) => ({
    type : TOGGLE_TODO,
    id
})

/*
    초기 상태 선언
    리듀서의 초기상태는 객채일 필요는 없다. 모든 타입 가능
*/
const initialState = [];

/*
    리듀서 함수 선언하기
 */

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO :
            return state.concat(action.todo);
        case TOGGLE_TODO :
            return state.map((todo)=> {
                return todo.id === action.id ? {...todo, done : !todo.done} : todo
            })
        default :
            return state;
    }
}