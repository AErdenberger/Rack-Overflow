import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from '../Posts/PostBox/PostBox';
import "./MainPage.css";

function MainPage() {

  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  
  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  const shuffledPosts = posts.sort(() => 0.5 - Math.random());

  let randomlySelected = shuffledPosts.slice(0, 3);


    return (
      <div className="SplashPage">
        <div className="LogoandIntro">
          <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/Rack-Overflow-Logo-Transparent.png"></img>
          <h1>Welcome to Rack Overflow</h1>
        </div>
        <div className="AboutUs">
          <h1>About Us:</h1>
          <p>Rack Overflow is a crowd sourced information site where people can go to
            get their questions answered about exercise. Whether you are training for an
            event, looking to lose some weight, or need to get advice about how to workout
            based on your physical constraints Rack Overflow is for you!
          </p>
        </div>
        <div className="PostsArea">
          <h1>See What People Are Asking!</h1>
          <div className="RandomPosts">
            {randomlySelected.map(post => (
              <PostBox key={post._id} post={post} />
            ))}
          </div>
        </div>
        <footer>
          Copyright &copy; 2022 RackOverFlow
        </footer>
      </div>
    );
  }
  
  export default MainPage;