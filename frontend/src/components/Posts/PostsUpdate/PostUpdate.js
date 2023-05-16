import './PostUpdate.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, updatePost, fetchPosts } from '../../../store/posts';
import PostBox from '../PostBox/PostBox';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';



const PostUpdate = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    // const errors = useSelector(state => state.errors.posts);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState(["hello"]);
    
    const userPosts = useSelector(state => state.posts.user);
    const post = userPosts.filter(userPost => {
        return userPost._id === postId;
    })
    // const newPost = useSelector(state => state.posts.new)

    // console.log(newPost, "new post");
    // console.log(postId, "postId");
    let author;
    // if (newPost) {
    //     setTitle(newPost.title);
    //     setText(newPost.text)
    //     author = newPost.author;
    // } else {
        setTitle(post[0].title);
        setText(post[0].text);
        author = post[0].author;
    // }


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