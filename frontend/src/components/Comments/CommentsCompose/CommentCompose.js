import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { clearCommentErrors, composeComment } from '../../store/comments';
import './CommentCompose.css';

function ComponentCompose(){
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    // const errors = useSelector(state => state.errors.comments);

    useEffect(() => {
        // return () => dispatch(clearCommentErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        // dispatch(composeComment({ content }));
        setContent('');
    };

    const update = e => setContent(e.currentTarget.value);

    return(
        <form className='compose-comment' onSubmit={handleSubmit}>
            <input type='text' value={content}
                onChange={update}
                placeholder='What are your recommendations?'
                required
            />
            {/* <div className='errors'>{errors?.text}</div> */}
            <input type='submit' value='Submit' id='submit-button' />
        </form>
    );
};

export default ComponentCompose;