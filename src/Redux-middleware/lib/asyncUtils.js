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

/*
    API 재로딩 문제 해결하기
    포스트 목록 data 가 있다면 로딩을 새로 하지만 , 로딩중... 을 띄우지 않는것 입니다.
    뒤로가기를 통해 다시 포스트 목록을 조회 할때 최신 데이터를 보여 줄 수 있습니다.
 */
export const handleAsyncActions = (type , key , keepData = false) => {
    const [SUCCESS , ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state , action) => {
        switch (action.type) {
            case type :
                return {
                    ...state ,
                    [key] : reducerUtils.loading(keepData ? state[key].data : null)
                    // keepData 를 파라미터로 전달하여 로딩할 때 이전 데이터가 유지하도록 설정 할 수 있다.
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

/*
    POST 재로딩을 막기위해서 비동기 관련된 액션에 ID 를 가르켜서 사용한다
    action.meta 에 id 를 넣어주도록 하겠습니다.
    createPromiseThunkById
    handleAsyncActionsById
    를 새로 만들어 주도록 하겠습니다.
 */

const defaultIdSelector = (param) => param;
// idSelector : 파라미터에서 id 어떻게 선택할지 정의하는 함수 입니다.
// 기본 값으로는 파라미터를 그대로 id로 사용합니다.
// 하지만 만약 파라미터가 { id: 1, details: true } 이런 형태라면
// idSelector 를 param => param.id 이런식으로 설정 해서 id 를 선택하면 된다.
export const createPromiseThunkById = (type, promiseCreator, idSelector = defaultIdSelector) => {
    const [SUCCESS , ERROR] = [`${type}_SUCCESS` , `${type}_ERROR`];

    return param => async (dispatch) => {
        const id = idSelector(param);
        dispatch({type , meta : id});
        try {
            const payload = await promiseCreator(param);
            dispatch({type : SUCCESS , payload , meta : id});
        }
        catch (e) {
            dispatch({type : ERROR, error : true , payload : e, meta : id});
        }
    };
};

export const handleAsyncActionsById = (type, key , keepData = false) => {
    const [SUCCESS , ERROR] = [`${type}_SUCCESS` , `${type}_ERROR`];

    return (state,action) => {
        const id = action.meta;

        switch (action.type) {
            case type :
                return {
                    ...state,
                    [key] : {
                        ...state[key],
                        // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
                        [id] : reducerUtils.loading( keepData ? state[key][id] && state[key][id].data : null)
                    }
                }
            case SUCCESS :
                return {
                    ...state,
                    [key] : {
                        ...state[key],
                        [id] : reducerUtils.success(action.payload)
                    }
                }
            case ERROR :
                return {
                    ...state,
                    [key] : {
                        ...state[key],
                        [id] : reducerUtils.error(action.payload)
                    }
                }
            default :
                return state;
        }
    };
};