import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCommentErrors, composeComment } from '../../../store/comments';
import TagInput from '../../Tags/TagInput';
import './CommentCompose.css';

function CommentCompose(){
    const { postId } = useParams();
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags,setSelectedTags] = useState([]);
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
        setTags([]);
        setSelectedTags([])
    };

    // const colors = ["tomato", "brown", "salmon", "cyan",
    //     "green", "orange", "gold", "violet", "pink"
    // ]

    // const changeColor = e => {
    //     const randomIndex = Math.floor(Math.random() * colors.length);
    //     var color = colors[randomIndex];
    //     var label = document.getElementById("label-loading-comment");
    //     if(label){
    //         label.style.color = color;
    //     }
    // };

    // setInterval(function(){
    //     changeColor();
    // }, 1000);

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
                <TagInput 
                    onChange = {updateTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
                
                <div className='errors'>{errors?.text}</div>
                <input type='submit' value='Create comment' id='submit-button-comment' />
            </form>
        </div>
    );
};

export default CommentCompose;
