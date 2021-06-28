import {useContext, useReducer, createContext} from 'react';

const UserStateContext = createContext(null);
const UserDispatcherContext = createContext(null);

// Global state 의 초기값 설정
const initialUsers = [
    {
        name : "JJo",
        age : 25
    }
]


/*
    Context Provider 를 만들어 주겠습니다. children 을 props 로 받습니다.기
    0. state , dispatcher context 를 따로 생성 ( createContext 이용 )
    1. reducer 함수 만들어 주기
    2. useReducer 로 global state 변수 만들기
    3. Context.Provider 제공하기
 */
const UserContextProvider = ({children}) => {
    const reducer = (state ,action) => {
        switch (action.type) {
            case 'ADD' :
                return state.concat(action.user);
            case 'DELETE' :
                return state.filter(user=> user.name !== action.name);
            default :
                throw new Error(`Unhandled action type: ${action.type}`);
        }

    }

    const [state, dispatcher] = useReducer(reducer, initialUsers);

    // Provider 를 렌더링해주고 value 을 설정 해줍니다.
    return (
        <UserStateContext.Provider value={state}>
            <UserDispatcherContext.Provider value={dispatcher}>
                {children}
            </UserDispatcherContext.Provider>
        </UserStateContext.Provider>
    )
}


// 커스텀 훅을 만들어서 컨텍스트를 사용하기 편하게 만들어 줍니다.
export function useUserState () {
    const context = useContext(UserStateContext);
    if(!context) {
        throw new Error('UserContextProvider 를 찾을 수 없습니다.');
    }
    return context;
}

export function useUserDispatcher() {
    const context = useContext(UserDispatcherContext);
    if(!context) {
        throw new Error('UserContextProvider 를 찾을 수 없습니다.');
    }
    return context;
}

export default UserContextProvider;