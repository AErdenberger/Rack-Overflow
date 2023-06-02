import { useDispatch, useSelector} from 'react-redux';
import { clearCommentErrors, updateComment, fetchComments } from '../../../store/comments';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CommentUpdate.css';

const CommentUpdate = ({comment}) => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const { commentId } = useParams();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    if (!text){
        if(comment){
            setText(comment.text);
            setTags(comment.tags);
        }
    }

    useEffect(() => {
        dispatch(fetchComments(postId))
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    const updateText = e => setText(e.currentTarget.value);
    const updateTags = e => setTags([e.currentTarget.value]);

    const handleSubmit = e => {
        const commentToBeUpdated = { parentPost: postId, text, tags, currentUser, commentId: commentId }
        e.preventDefault();
        dispatch(updateComment(commentToBeUpdated));
        history.goBack();
    };

    return (
        <div id='container-update-comment-form'>
            <form className='update-comment' onSubmit={handleSubmit}>
                <div>
                    <input type='textarea' id='update-text'
                        value={text}
                        onChange={updateText}
                        placeholder='Change text...'
                        required
                    />
                </div>
                <input type='submit' value={'Update comment'} id='update-button-comment' />
            </form>
        </div>
    )
};

export default CommentUpdate