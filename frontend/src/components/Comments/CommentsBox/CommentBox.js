import './CommentBox.css';

function CommentBox ({ comment: { text, author }}){
    const { username } = author;

    return(
        <div className='comment'>
            <div id='container-content-comment'>
                <label>{text}</label>
            </div>
            <div id='container-author-comment'>
                <label>{username}</label>
            </div>
        </div>
    );
};

export default CommentBox;