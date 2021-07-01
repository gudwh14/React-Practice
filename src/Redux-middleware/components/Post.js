
const Post = ({post}) => {
    const {title , body} = post;

    return (
        <div>
            <h1>{title}</h1>
            <span>{body}</span>
        </div>
    )
}

export default Post;