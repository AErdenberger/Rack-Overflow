import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from './PostBox/PostBox.js';
import PostsSidebar from './PostsSidebar/PostsSidebar';
import './Posts.css'

function Posts () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  
  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  if (posts.length === 0) return <div>There are no Posts</div>;
  
  return (
    <div className='posts-container'>
      <div className='posts-sidebar'>
        <PostsSidebar /> 
      </div>
      <div className='posts-index'>
        <h2>All Posts</h2>
        {posts.map(post => (
          <div key={post._id}>
            
              <PostBox  post={post} />
            
          </div>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
}

export default Posts;