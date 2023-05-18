import { useDispatch, useSelector} from 'react-redux';
import { clearCommentErrors, updateComment, fetchComments } from '../../../store/comments';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CommentUpdate.css';

const CommentUpdate = ({comment}) => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const { commentId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    // console.log(currentUser, 'update');
    // console.log(postId, 'post');

    // const author = currentUser.username;

    const [text, setText] = useState(comment.text);
    const [tags, setTags] = useState(comment.tags);

    useEffect(() => {
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    const updateText = e => setText(e.currentTarget.value);
    const updateTags = e => setTags([e.currentTarget.value]);

    const handleSubmit = e => {
        const commentToBeUpdated = { parentPost: postId, text, tags, currentUser, commentId: commentId }
        e.preventDefault();
        dispatch(updateComment(commentToBeUpdated));
    };

    return (
        <div id='container-update-comment-form'>
            <form className='update-comment' onSubmit={handleSubmit}>
                <input type='textarea' id='update-text'
                    value={text}
                    onChange={updateText}
                    placeholder='Change text...'
                    required
                />
                <input type='text' id='update-tags'
                    value={tags}
                    onChange={updateTags}
                    placeholder='Change tags...'
                    required
                />
                <input type='submit' value={'Update comment'} id='update-button-comment' />
            </form>
        </div>
    )
};

export default CommentUpdate