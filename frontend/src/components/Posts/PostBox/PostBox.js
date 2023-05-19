import "./PostBox.css"
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../../store/posts";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TagShow from "../../Tags/TagShow";


function PostBox ({ post: { _id, text, author, title, tags }}) {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let username;
  if(author) username = author.username;
  const history = useHistory();

  const remove = () => {
    dispatch(deletePost(_id));
  }

  const goUpdatePost = () => {
    let path = `/posts/${_id}/update/`;
    history.push(path);
  }

  const goShowPost = () => {
    let path = `/posts/${_id}`;
    history.push(path);
  };

  let returnButton;
  if(currentUser){
    if(currentUser._id === author._id){
      returnButton = (
        <>
          <button onClick={remove} id="button-delete">Delete Post</button>
          <button onClick={goUpdatePost} id="button-update">Update Post</button>
        </>
      )
    }
  } else {
    returnButton = (
      undefined
    )
  }

  if(!tags){
    return undefined;
  }

  return (
    <div className="post">

      <div id="container-link-show-page">
        <Link to={`/posts/${_id}`}  className='posts-show-link'>
          {title}
        </Link>
      </div>
      <div>
        <p className="post-box-body">{text}</p>
      </div>
      <div>
        <div className="post-box-tags-div">
           {tags.map( tag=>{ 
              return <TagShow
                  tagName = {tag.tag}
              />
            })}
        </div>
        <div className="post-box-ratings-comments-username">
          <div className="post-box-ratings-comments">
            <button onClick={goShowPost} id="button-comments">
              Comments
            </button>
          </div>
          <div className="post-box-username">
            <div><span>{String.fromCodePoint(0x2B24)}</span> {username}</div>
          </div>
        </div>
      </div>
      <div id="container-bottons-functional">
        {returnButton}
      </div>
    </div>
  );
}

export default PostBox;