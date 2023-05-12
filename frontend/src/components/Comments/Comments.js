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

    // console.log(comments, 'comments')

    let newComments = [];
    comments.forEach((comment => {
        for(const comment in comments){
            if(comments[comment].parentPost === postId) {
                newComments.push(comments[comment])
            }
        };
    }));

    useEffect(() => {
        dispatch(fetchComments());
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    if(newComments.length === 0) return <label id='no-comments-label'>There are no Comments... yet.</label>

    return(
        <div className='comments-container'>
            <div className='comments-index'>
                <label id='label-all-comments'>All Comments</label>
                {newComments.map(comment => (
                    <div>
                        <CommentBox comment={comment} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;