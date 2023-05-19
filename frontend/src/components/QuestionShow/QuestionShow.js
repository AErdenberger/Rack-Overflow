import './QuestionShow.css'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPosts, deletePost, fetchPost } from '../../store/posts';
import PostsSidebar from '../Posts/PostsSidebar/PostsSidebar';
import Comments from '../Comments/Comments';
import CommentCompose from '../Comments/CommentsCompose/CommentCompose';
import './QuestionShow.css';
import TagShow from '../Tags/TagShow';
import Vote from '../Vote/Vote';
import { fetchPostVotes, createPostVote, fetchPostVote, fetchAnswerVotes, createAnswerVote } from '../../store/votes';



const QuestionShow = () => {
    const { postId } = useParams();
    const post = useSelector(state => Object.values(state.posts.all).find(post => post._id === postId));
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const vote = useSelector(state => state.votes.vote);
    const history = useHistory();

    
    useEffect(() => {
        dispatch(fetchPost(postId));
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchPostVotes(postId));
        dispatch(fetchPostVote(postId, currentUser._id))
    }, [dispatch, fetchPostVotes, fetchPostVote, postId, currentUser._id]);

    useEffect(() => {
        const fetch = dispatch(fetchPostVote(postId, currentUser._id));
    }, [dispatch, fetchPostVote, postId, currentUser._id])

    const remove = () => {
        dispatch(deletePost(postId));
        let path = '/profile';
        history.push(path);
    }
    
    const goUpdatePost = () => {
        let path = `/posts/${postId}/update/`;
        history.push(path);
    }
    
    
    let returnButton;
    if(currentUser){
        if(post){
            if(currentUser._id === post.author._id){
                returnButton = (
                    <>
                <button onClick={remove}>Delete Post</button>
                <button onClick={goUpdatePost}>Update Post</button>
              </>
            )
        }
    }
} else {
    returnButton = (
        undefined
        )
    }
    
    
    
    if(!post) return null;
    const { username } = post.author;
    
    return(
        <div className='questions-container'>
            <div className='questions-sidebar'>
                <PostsSidebar /> 
            </div>
            <div className='question'>
                <label id='label-title'>{post.title}</label>
                <div className='vote-div'>
                    <Vote 
                    fetchVotes={fetchPostVotes}
                     createVote={createPostVote}
                      fetchVote={fetchPostVote}
                       postId={postId}
                        currentUser={currentUser}
                        vote={vote}
                         className='vote-compoment'
                         />
                    <div>    
                        <div>
                            <p className="question-body">{post.text}</p>
                        </div>
                        <div>
                        <div className="question-tags-div">

                            {post.tags.map( tag=>{ 
                                return <TagShow
                                    tagName = {tag.tag}
                                />
                            })}

                        </div>
                            <div className="questions-ratings-comments-username">
                                <div className="questions-ratings-comments">
                                    {returnButton}
                                </div>
                                <div className="questions-username">
                                    <div><span>{String.fromCodePoint(0x2B24)}</span> {username}</div>
                                </div>
                            </div>
                            <div>
                    </div>
                            
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


