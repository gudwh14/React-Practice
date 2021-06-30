/*
    Ducks 패턴으로 리덕스 모듈 만들기
    모듈 => 액션 타입, 액션 생성 함수 , 리듀서 항목이 모두 포함된 JS 파일
 */

/*
    액션 타입 만들기
    Ducks 패턴을 따를때는 액션의 이름에 접두사를 넣는것이 좋다.
    다른 모듈과 액션이 중복되는것을 방지 할 수 있습니다.
 */
const SET_DIFF = "counter/SET_DIFF";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

/*
    액션 생성함수 만들기
    액션 생성함수를 export 사용하여 내보내 주기
*/
export const setDiff = (diff) => ({type : SET_DIFF, diff})
export const increase = () => ({type : INCREASE})
export const decrease = () => ({type : DECREASE})

/* 초기 상태 선언  */
const initialState = {
    number : 0,
    diff : 1
};

/*
    리듀서를 선언해 줍니다.
    리듀서는 export default 로 내보내 줍니다.
 */
export default function counter (state = initialState , action) {
    switch (action.type) {
        case SET_DIFF :
            return {
                ...state,
                diff : action.diff
            }
        case INCREASE :
            return {
                ...state,
                number : state.number + state.diff
            }
        case DECREASE :
            return {
                ...state,
                number : state.number - state.diff
            }
        default :
            return state;
    }
}