import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getPost} from "../modules/posts";
import Post from "./Post";
/*
    컨테이너 컴포넌트
 */
const PostContainer = ({postId}) => {
    const {data , loading , error} = useSelector(state => state.posts.post);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPost(postId));
    }, [dispatch])

    if (loading) return (<div>로딩중...</div>);
    if (error) return (<div>에러 발생</div>);
    if (!data) return null;
    return (
        <Post
            post={data}
        />
    )
}

export default PostContainer;