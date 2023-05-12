import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCommentErrors, composeComment } from '../../../store/comments';
import './CommentCompose.css';
import CommentBox from '../CommentsBox/CommentBox';

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

    const colors = ["tomato", "brown", "salmon", "cyan",
        "green", "orange", "gold", "violet", "pink"
    ]

    const changeColor = e => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];
        const label = document.getElementById("label-loading-comment");
        if(label){
            label.style.color = color;
        }
    };

    setInterval(function(){
        changeColor();
    }, 1500);

    const update = e => setText(e.currentTarget.value);
    const updateTags = e => setTags(e.currentTarget.value);

    return(
        <div id='container-create-comment-form'>
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
            <div className='comment-preview'>
                <label id='label-comment-preview'>Comment preview</label>
                <div>
                    {text ? <CommentBox comment={{text, author}} /> : <label id='label-loading-comment'> Loading...</label>}
                </div>
            </div>
            {/* <div className='previous-comment'>
                <label id='label-comment-previous'>Previous Comment</label>
                <div>
                    {newComment ? <CommentBox comment={newComment} /> : <label id='label-no-previous-post'>No previous comment, go ahead and create one!</label>}
                </div>
            </div> */}
        </div>
    );
};

export default CommentCompose;
