import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { clearCommentErrors, fetchComments } from '../../store/comments';
import CommentBox from './CommentsBox/CommentBox';
import './Comments.css';

function Comments () {
    const dispatch = useDispatch();
    // const comments = useSelector(state => Object.values(state.comments.all));

    useEffect(() => {
        // dispatch(fetchComments());
        // return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    // if(comments.length === 0) return <label id='no-comments-label'>There are no Comments...</label>

    return(
        <div className='comments-container'>
            <div className='comments-index'>
                <label>All Comments</label>
                {/* {comments.map(comment => (
                    <CommentBox key={comment._id} comment={comment} />
                ))} */}
            </div>
        </div>
    );
}

export default Comments;