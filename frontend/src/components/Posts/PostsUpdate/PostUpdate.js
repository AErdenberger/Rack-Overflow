import './PostUpdate.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, updatePost, fetchPosts } from '../../../store/posts';
import PostBox from '../PostBox/PostBox';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';



const PostUpdate = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const errors = useSelector(state => state.errors.posts);
    const history = useHistory();
    
    
    const userPosts = useSelector(state => state.posts.user);
    const post = userPosts.filter(userPost => {
        return userPost._id === postId;
    })
    // console.log(post[0].author, "post");
    // console.log(postId, "postId");

    const [text, setText] = useState(post[0].text);
    const [title, setTitle] = useState(post[0].title);
    const [tags, setTags] = useState(["hello"]);


    useEffect(() => {
        dispatch(fetchPosts());
        return () => dispatch(clearPostErrors());
      }, [dispatch])

    // const update = () => {
    //     dispatch(updatePost({_id, text, title, tags}))
    // }

    const updateTitle = e => setTitle(e.currentTarget.value);
    const updateText = e => setText(e.currentTarget.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost({...post[0], text, title, tags}));
        let path = `/posts/${postId}`;
        history.push(path);
    }

    const author = post[0].author;
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='texarea'
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
                <div className="errors">{errors?.text}</div>
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