import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCommentErrors, composeComment } from '../../../store/comments';
import './CommentCompose.css';

function CommentCompose(){
    const { postId } = useParams();
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user.username);
    const errors = useSelector(state => state.errors.comments);

    let parentPost = postId;

    useEffect(() => {
        return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeComment({ author: currentUser, parentPost, text, tags }));
        setText('');
        setTags([]);
    };

    const update = e => setText(e.currentTarget.value);
    const updateTags = e => setTags([e.currentTarget.value]);

    return(
        <div id='container-create-comment-form'>
            <form className='compose-comment' onSubmit={handleSubmit}>
                <input type='textarea' value={text}
                    onChange={update} id='text-field'
                    placeholder='What are your recommendations?'
                    required
                />
                {/* <input type='text' value={tags}
                    onChange={updateTags} id='tags-field'
                    placeholder='Write your tags here'
                    required
                /> */}
                <div className='errors'>{errors?.text}</div>
                <input type='submit' value='Create comment' id='submit-button-comment' />
            </form>
        </div>
    );
};

export default CommentCompose;
