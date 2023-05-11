import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCommentErrors, composeComment } from '../../../store/comments';
import './CommentCompose.css';

function CommentCompose(){
    const { postId } = useParams();
    const [text, setText] = useState('');
    const [tags, setTags] = useState(['done']);
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user); //all user information
    const newComment = useSelector(state => state.comments.new);
    const errors = useSelector(state => state.errors.comments);

    let parentPost = postId;

    useEffect(() => {
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeComment({ parentPost, text, tags }));
        setText('');
    };

    const update = e => setText(e.currentTarget.value);
    const updateTags = e => setTags(e.currentTarget.value);

    return(
        <form className='compose-comment' onSubmit={handleSubmit}>
            <input type='textarea' value={text}
                onChange={update}
                placeholder='What are your recommendations?'
                required
            />
            <input type='text' value={tags}
                onChange={updateTags}
                placeholder='Write your tags here'
                required
            />
            <div className='errors'>{errors?.text}</div>
            <input type='submit' value='Submit' id='submit-button-comment' />
        </form>
    );
};

export default CommentCompose;
