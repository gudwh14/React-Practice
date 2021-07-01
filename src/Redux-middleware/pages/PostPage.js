import PostContainer from "../components/PostContainer";

const PostPage = ({match}) => {
    const {id} = match.params;

    return (
        <PostContainer
            postId={parseInt(id,10)}
        />
    );
}

export default PostPage;