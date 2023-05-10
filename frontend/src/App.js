
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes';
import NavBar from './components/NavBar/NavBar';
import FooterBar from './components/FooterBar/Footer';

import MainPage from './components/MainPage/MainPage';
// import LoginForm from './components/SessionForms/LoginForm';
// import SignupForm from './components/SessionForms/SignupForm';
import Posts from './components/Posts/Posts';
import Profile from './components/Profile/Profile';
import PostCompose from './components/Posts/PostsCompose/PostCompose';
import { getCurrentUser } from './store/session';
import QuestionShow from './components/QuestionShow/QuestionShow';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
        <ProtectedRoute exact path="/posts" component={Posts} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/posts/new" component={PostCompose} />
        <ProtectedRoute exact path="/posts/:postId" component={QuestionShow} />
      </Switch>
      <FooterBar />
    </>
  );
}

export default App;

