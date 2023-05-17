// import { useParams } from 'react-router-dom';
import './CommentBox.css';

function CommentBox ({ comment, author }){
    // const { postId } = useParams();
    // const { username } = author;
    // console.log(comment);
    const text = comment.text;
    console.log(comment);
    // const username = comment.author;
    // if(author) username = author.username;

    return(
        <div className='comment'>
            <div id='container-content-comment'>
                <label id='label-text'>{text}</label>
            </div>
            <div id='container-author-comment'>
                {/* <label id='label-username'>{username}</label> */}
            </div>
        </div>
    );
};

export default CommentBox;