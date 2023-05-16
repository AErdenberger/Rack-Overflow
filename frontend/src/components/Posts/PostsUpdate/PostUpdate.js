import './PostUpdate.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, updatePost, fetchPosts } from '../../../store/posts';
import PostBox from '../PostBox/PostBox';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostUpdate = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const history = useHistory();
    const [text, setText] = useState(post[0].text);
    const [title, setTitle] = useState(post[0].title);
    const [tags, setTags] = useState(post[0].tags);
    
    const userPosts = useSelector(state => state.posts.user);
    const post = userPosts.filter(userPost => {
        return userPost._id === postId;
    })

    if(post.length > 1){
        setText(post[0].text);
        setTitle(post[0].title);
        setTags(["hello"]);
    }

    useEffect(() => {
        dispatch(fetchPosts());
        return () => dispatch(clearPostErrors());
    }, [dispatch]);

    // const update = () => {
    //     dispatch(updatePost({_id, text, title, tags}))
    // }

    const updateTitle = e => setTitle(e.currentTarget.value);
    const updateText = e => setText(e.currentTarget.value);

    const handleSubmit = (e) => {
        const postToBeUpdated = { postId, text, title, tags, author }
        e.preventDefault();
        dispatch(updatePost(postToBeUpdated));
        let path = `/posts/${postId}`;
        history.push(path);
    }

    let author;
    if(post.length > 0){
        author = post[0].author;
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text'
                    value={title}
                    onChange={updateTitle}
                    placeholder='Change title...'
                    required
                />
                <input 
                    type="textarea"
                    value={text}
                    onChange={updateText}
                    placeholder="Change post..."
                    required
                />
                {/* <div className="errors">{errors?.text}</div> */}
                <input type="submit" value="Submit" />  
            </form>
            <div>
                <h3>Post Preview</h3>
                {text ? <PostBox post={{text, author}} /> : undefined}
            </div>
        </>
    )
}

export default PostUpdate;
