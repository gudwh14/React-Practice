/*
    Promise 에 기반한 Thunk 함수를 만들어주는 함수입니다.
 */
export const createPromiseThunk = (type , promiseCreator) => {
    const [SUCCESS , ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    // 이 함수는 promiseCreator 가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
    // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
    // 예: writeComment({ postId: 1, text: '댓글 내용' });
    return param => async (dispatch) => {
        //요청 시작
        dispatch({type , param});
        try {
            // 결과물의 이름은 payload 로 통일 합니다.
            const payload = await promiseCreator(param);
            dispatch({type : SUCCESS, payload}); // 성공
        }
        catch (e) {
            dispatch({type : ERROR , payload : e , error : true});// 실패
        }
    }
}

/*
    리듀서 에서 사용할 수 있는 유틸 함수들 입니다.
 */

export const reducerUtils = {
    // 초기 상태 , 초기 data 값은 null 이지만 바꿀 수 있습니다.
    initial : (initialData = null) => {
        return {
            loading : false,
            data : initialData,
            error : null
        }
    },
    // 로딩중 상태 , prevState 기본 값은 null 이지만 값을 지정하면 null 값이 아닌 다른값을 유지시킬 수 있다.
    loading : (prevState = null) => {
        return {
            loading : true,
            data : prevState,
            error : null
        }
    },
    // 성공 상태
    success : (payload) => {
        return {
            loading : false,
            data : payload,
            error : null
        }
    },
    // 실패상태
    error : (error) => {
        return {
            loading : false,
            data : null,
            error : error
        }
    }
}

/*
    비동기 관련 액션들을 처리해주는 리듀서 함수를 생성 해줍니다.
    type 은 액션의 타입 , key 는 상태의 key ( 예 : posts , post ) 에 해당합니다.
 */

export const handleAsyncActions = (type , key) => {
    const [SUCCESS , ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state , action) => {
        switch (action.type) {
            case type :
                return {
                    ...state ,
                    [key] : reducerUtils.loading()
                };
            case SUCCESS :
                return {
                    ...state ,
                    [key] : reducerUtils.success(action.payload)
                }
            case ERROR :
                return {
                    ...state ,
                    [key] : reducerUtils.error(action.error)
                }
            default :
                return state;
        }
    };
};
