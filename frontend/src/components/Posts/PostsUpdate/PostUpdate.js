import './PostUpdate.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, updatePost, fetchPosts } from '../../../store/posts';
import PostBox from '../PostBox/PostBox';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserPosts } from '../../../store/posts';

const PostUpdate = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const userPosts = useSelector(state => state.posts.user);

    const post = userPosts.filter(userPost => {
        return userPost._id === postId;
    })

    const author = currentUser.username;

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');

    if(post.lenght > 0){
        setText(post[0].text);
        setTitle(post[0].title);
        setTags(post[0].tags);
    }

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUserPosts(currentUser._id));
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    const updateTitle = e => setTitle(e.currentTarget.value);
    const updateText = e => setText(e.currentTarget.value);

    const handleSubmit = (e) => {
        const postToBeUpdated = { postId, text, title, tags, author }
        e.preventDefault();
        dispatch(updatePost(postToBeUpdated));
        let path = `/posts/${postId}`;
        history.push(path);
    }
    
    return(
        <>
            <div id="container-update-post-form">
                <form className="update-post" onSubmit={handleSubmit}>
                    <input type='text' id='update-title'
                        value={title}
                        onChange={updateTitle}
                        placeholder='Change title...'
                        required
                    />
                    <input id='update-text-content'
                        type="textarea"
                        value={text}
                        onChange={updateText}
                        placeholder="Change post..."
                        required
                    />
                    {/* <div className="errors">{errors?.text}</div> */}
                    <input type="submit" value="Submit" id='update-button-submit' />  
                </form>
                <div className='update-post-preview'>
                    <h3 id='update-post-preview-header'>Post Preview</h3>
                    {text ? <PostBox post={{text, author}} /> : undefined}
                </div>
            </div>
        </>
    )
}

export default PostUpdate;
