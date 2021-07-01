import {Link} from "react-router-dom";
/*
    Presentational 컴포넌트 입니다
    post
 */
const PostList = ({posts}) => {
    return (
      <div>
          { posts.map((post)=> {
              return (
                  <li key={post.id}>
                      <Link to={`/${post.id}`}>{post.title}</Link>
                  </li>
              )
          })}
      </div>
    );
};

export default PostList;