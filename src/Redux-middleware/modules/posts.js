import * as postsApi from '../api/posts';
import {createPromiseThunk , reducerUtils , handleAsyncActions,createPromiseThunkById,handleAsyncActionsById} from "../lib/asyncUtils";
/*
    프로미스를 다루는 리덕스 모듈 만들기
 */
// 프로미스를 다루는 모듈을 만들때는 다음과 같은 사항을 고려 해야 한다
// 1. 프로미스가 시작 , 성공 , 실패 했을때 다른 액션을 디스패치 해줘야한다.
// 2. 각 프로미스 마다 thunk 함수를 만들어 줘야 한다.
// 3. 리듀서에서 액션에 따라 로딩중 , 결과 , 에러 상태를 변경해줘야 한다.

/*
    액션 타입 만들기
 */

// 여러 POSTS 조회 하기
const GET_POSTS = "posts/GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR'; // 요청 실패

// 단일 POST 조회
const GET_POST = "posts/GET_POST"; // 요청 시작
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS'; // 요청 성공
const GET_POST_ERROR = 'posts/GET_POST_ERROR'; // 요청 실패

/*
    액션 생성 함수 만들기
 */
// thunk 를 사용 할 때 , 모든 액션들에 대해서 액션함수를 만들 필요는 없다.
// thunk 함수에서 바로 액션 객채를 만들어줘도 괜찮다.

export const getPosts = createPromiseThunk(GET_POSTS, postsApi.getPosts);

// thunk 함수에서도 파라미터를 받아서 사용 할 수 있습니다.
export const getPost = createPromiseThunkById(GET_POST, postsApi.getPostById);

// history 객채를 받아서 라우터 이동하기
// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
export const goToHome = () => (dispatch , getState , {history}) => {
    history.push("/");
}


/*
    기존 상태 구조

    {
      posts: {
        data,
        loading,
        error
      },
      post: {
        data,
        loading,
        error,
      }
    }
 */

/*
    POST 재로딩을 막기 위해 변경한 상태 구조
    {
      posts: {
        data,
        loading,
        error
      },
      post: {
        '1': {
          data,
          loading,
          error
        },
        '2': {
          data,
          loading,
          error
        },
        [id]: {
          data,
          loading,
          error
        }
      }
    }
 */

const initialState = {
    posts : reducerUtils.initial(),
    post : {}
};

export default function posts (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS :
        case GET_POSTS_SUCCESS :
        case GET_POSTS_ERROR :
            // 이전 값 유지를 위해서 keepData : true 로 넘겨준다.
            const postsReducer = handleAsyncActions(GET_POSTS,'posts',true);
            return postsReducer(state, action);
        case GET_POST :
        case GET_POST_SUCCESS :
        case GET_POST_ERROR :
            const postReducer = handleAsyncActionsById(GET_POST,'post',true);
            return postReducer(state,action);
        default :
            return state;
    }
}