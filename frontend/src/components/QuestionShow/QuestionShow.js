import './QuestionShow.css'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts, deletePost } from '../../store/posts';
import PostsSidebar from '../Posts/PostsSidebar/PostsSidebar';
// import PostBox from '../Posts/PostBox/PostBox';
import Comments from '../Comments/Comments';
import CommentCompose from '../Comments/CommentsCompose/CommentCompose';
import './QuestionShow.css';



const QuestionShow = () => {
    const { postId } = useParams();
    const post = useSelector(state => Object.values(state.posts.all).find(post => post._id === postId));
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

   


    if(!post) return null;
    const { username } = post.author;

    return(
        <div className='questions-container'>
            <div className='questions-sidebar'>
                <PostsSidebar /> 
            </div>
            <div className='question'>
                <label id='label-title'>{post.title}</label>
                <div>
                    <p className="question-body">{post.text}</p>
                </div>
                <div>
                    <div className="question-tags-div">
                        <span>tag 1</span><span>tag 2</span><span>tag 3</span><span>tag 4</span><span>tag 5</span><span>tag 6</span>
                    </div>
                    <div className="questions-ratings-comments-username">
                        <div className="questions-ratings-comments">
                            <button id='button-comments'>
                                Comments
                            </button>
                            <button id='button-ratings'>
                                Ratings
                            </button>
                        </div>
                        <div className="questions-username">
                            <div><span>{String.fromCodePoint(0x2B24)}</span> {username}</div>
                        </div>
                    </div>
                </div>
                
                <div id='container-comments'>
                    <Comments />
                </div>
                <div id='container-comment-compose'>
                    <CommentCompose />
                </div>
            </div>
        </div>
    )
}

export default QuestionShow;


