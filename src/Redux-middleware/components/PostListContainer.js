import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import PostList from "./PostList";
import {getPosts} from "../modules/posts";
/*
    Container 컴포넌트입니다
    redux store 에 접근하는 컴포넌트
 */

const PostListContainer = () => {
    const {data , loading , error } = useSelector(state => state.posts.posts)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPosts());
    },[dispatch])

    if (loading) return (<div>로딩중.....</div>)
    if (error) return (<div>에러발생</div>)
    if (!data) return null;
    return (
        <PostList
            posts={data}
        />
    )
};

export default PostListContainer