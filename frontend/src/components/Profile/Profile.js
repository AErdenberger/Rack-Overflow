
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import PostBox from '../Posts/PostBox/PostBox';
import './Profile.css';

function Profile () {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))
  
  useEffect(() => {
    dispatch(fetchUserPosts(currentUser._id));
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  const goCreatePost = e => {
    e.preventDefault();
    let path = '/posts/new';
    history.push(path);
  }

  if (userPosts.length === 0) {
    return (
      <div id='container-content-profile'>
        <div id='to-transform'>
          <div id='user-info'>
            <div id='container-user-info'>
              <div id='container-picture'>

              </div>
              <div id='container-user-name'>
                {/* <label>Username: </label> */}
                <label id='current-user-username'>{currentUser.username}</label>
              </div>
              <div id='container-user-email'>
                {/* <label>email: </label> */}
                <label id='current-user-email'>{currentUser.email}</label>
              </div>
              <div id='container-button-create-post'>
                <button onClick={goCreatePost} id='button-create-post'>Create new post</button>
              </div>
            </div>
          </div>
        </div>
        <div id='container-user-posts-2'>
          <label id='label-profile'>{currentUser.username} haven't create any post</label>
        </div>
      </div>
    );
  } else {
    return (
      <div id='container-content-profile'>
        <div id='to-transform'>
          <div id='user-info'>
            <div id='container-user-info'>
              <div id='container-picture'>

              </div>
              <div id='container-user-name'>
                {/* <label>Username: </label> */}
                <label id='current-user-username'>{currentUser.username}</label>
              </div>
              <div id='container-user-email'>
                {/* <label>email: </label> */}
                <label id='current-user-email'>{currentUser.email}</label>
              </div>
              <div id='container-button-create-post'>
                <button onClick={goCreatePost} id='button-create-post'>Create new post</button>
              </div>
            </div>
          </div>
        </div>
        <div id='container-user-posts'>
          <div id='container-post-text'>
            <label id='all-posts-text'>All of {currentUser.username}'s Posts</label>
          </div>
          {userPosts.map(post => (
            <PostBox
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;