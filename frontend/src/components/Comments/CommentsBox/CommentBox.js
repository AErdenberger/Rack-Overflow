import './CommentBox.css';

function CommentBox ({ comment: { content, author }}){
    const { username } = author;

    return(
        <div className='comment'>
            <div id='container-content-comment'>
                <label>{content}</label>
            </div>
            <div id='container-author-comment'>
                <label>{username}</label>
            </div>
        </div>
    );
};

export default CommentBox;