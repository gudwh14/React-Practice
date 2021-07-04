import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {goToHome} from "../modules/posts";
import {getPost} from "../ReduxSagaModule/posts";
import Post from "./Post";
/*
    컨테이너 컴포넌트
 */
const PostContainer = ({postId}) => {
    // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록 기본값을 설정해준다.
    const {data , loading , error} = useSelector(state => state.posts.post[postId]) || { loading : false ,data : null , error : null}
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getPost(postId));
    }, [dispatch,postId])

    if (loading && !data) return (<div>로딩중...</div>);
    if (error) return (<div>에러 발생</div>);
    if (!data) return null;
    return (
        <div>
            <button onClick={()=>{dispatch(goToHome())}}>홈으로 이동</button>
            <Post
                post={data}
            />
        </div>
    )
}

export default PostContainer;