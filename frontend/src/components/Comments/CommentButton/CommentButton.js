import { deleteComment } from '../../../store/comments';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../../store/comments';
import './CommentButton.css';

function CommentButton ({comment}) {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteComment(comment._id));
        dispatch(fetchComments(postId));
    }

    return(
        <div id='dropdown'>
            <button id='dropbtn'>
                <div id='container-info-logo'>
                    <i className="fa-solid fa-ellipsis" id='options-button'></i>
                </div>
            </button>
            <div id='dropdown-content'>
                <button id='button-edit-comment'>Edit comment</button>
                <button onClick={remove} id='button-delete-comment'>Delete comment</button>
                {/* <Link to={'/about'} id='link-about'>About Rack Overflow</Link> */}
            </div>
        </div>
    )
};

export default CommentButton;