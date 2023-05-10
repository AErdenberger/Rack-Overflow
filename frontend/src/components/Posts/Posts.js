import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from './PostBox/PostBox.js';
import PostsSidebar from './PostsSidebar/PostsSidebar';
import './Posts.css'
import { Link } from 'react-router-dom';

function Posts () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 5));
  
  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  const loadMore = () => {
    const nextVisiblePosts = posts.slice(0, visiblePosts.length + 5);
    setVisiblePosts(nextVisiblePosts);
  }

  if (posts.length === 0) return <div>There are no Posts</div>;
  
  return (
    <>
      <div className='posts-container'>
        <div className='posts-sidebar'>
          <PostsSidebar /> 
        </div>
        <div className='posts-index'>
          <h2>All Posts</h2>
          {visiblePosts.map(post => (
            <div key={post._id}>
              <Link to={`posts/${post._id}`}  className='posts-show-link'>
                <PostBox  post={post} />
              </Link>
            </div>
          ))}
          {visiblePosts.length < posts.length && (
            <button onClick={loadMore}>Load More</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;