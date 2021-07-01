/*
    리덕스 모듈 생성
    액션 타입 , 액션 생성 함수 , 리듀서
 */

/*
    액션타입
 */
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";


/*
    액션 생성 함수
 */

export const increase = () => ({
    type : INCREASE
})

export const decrease = () => ({
    type : DECREASE
})

// 함수를 디스패치 하기 위해서는 dispatch 와 getState 를 파라미터로 받아와야합니다.
export const increaseAsync = () => (dispatch) => {
    setTimeout(()=> {
        dispatch(increase())
    },1000)
}

export const decreaseAsync = () => (dispatch) => {
    setTimeout(()=> dispatch(decrease()),1000);
}
/*
    초기 상태
 */
const initialState = 0;

/*
    리듀서
 */

export default function counter (state = initialState , action) {
    switch (action.type) {
        case INCREASE :
            return state + 1 ;
        case DECREASE :
            return state - 1 ;
        default :
            return state;
    }
}