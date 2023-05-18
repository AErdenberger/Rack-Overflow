import CommentButton from '../CommentButton/CommentButton';
import { useSelector } from 'react-redux';
import './CommentBox.css';

function CommentBox ({ comment, author }){
    const text = comment.text;
    const username = comment.author.username;
    const currentUser = useSelector(state => state.session.user);

    return(
        <div className='comment'>
            <div id='container-info-button'>
                <div id='container-author-comment'>
                    <label id='label-username'>{username} said:</label>
                </div>
                {comment.author._id === currentUser._id ? <div id='container-comment-button'>
                    <CommentButton comment={comment} />
                </div> : undefined}
            </div>
            <div id='container-content-comment'>
                <label id='label-text'>{text}</label>
            </div>
        </div>
    );
};

export default CommentBox;