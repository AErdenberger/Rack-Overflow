import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCommentErrors, fetchComments } from '../../store/comments';
import CommentBox from './CommentsBox/CommentBox';
import './Comments.css';

function Comments () {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments.all));

    useEffect(() => {
        dispatch(fetchComments(postId));
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    if(comments.length === 0) return <label id='no-comments-label'>There are no Comments... yet.</label>

    return(
        <div className='comments-container'>
            <div className='comments-index'>
                <label id='label-all-comments'>{comments.length} answers </label>
                {comments.length > 0 ? comments.map(comment => (
                    <div>
                        <CommentBox comment={comment} />
                    </div>
                )) : undefined}
            </div>
        </div>
    );
}

export default Comments;