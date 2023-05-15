
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/session';
import image from '../../assets/RackOverflowLogo.png';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import Modal from '../../modal/Modal';
import './NavBar.css';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [showModalSignup, setShowModalSignup] = useState(false);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
    setShowModal(false);
    setShowModalSignup(false);
    let path = '/';
    history.push(path);
  }

  const loginDemo = e => {
    e.preventDefault();
    dispatch(login({ email: 'demo@user.com', password: 'password' }));
  }

  const goToProfile = e => {
    e.preventDefault();
    let path = '/profile';
    history.push(path);
  };

  // This line below will be for the search
  const [valueSearch, setValueSearch] = useState("");

  const getLinks = () => {
    if (loggedIn) {
      return (
          <div id="nav-bar">
            <div id='container-links-main'>
              <Link id='link-main' to={'/'} >
                <img src={image} width='40px' height='40px' id='img-main' ></img>
                <label id='name-webpage'>Rack Overflow</label>
              </Link>
            </div>
            <label id='container-search'> <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
              <input type='text' placeholder='Search Rack Overflow' id='search-bar'
                onChange={(e) => setValueSearch(e.target.value)}
              />
            </label>
            <div id='conteiner-buttons'>
              <div id='container-logout'>
                <Link onClick={logoutUser} id='link-logout'>Log out</Link>
              </div>
              <div id='conteiner-profile'>
                <button onClick={goToProfile} id='button-profile'>
                  <div id='container-profile-logo'>
                    <i className="fa-regular fa-address-card" id='profile-logo'></i>
                  </div>
                </button>
              </div>
              <div id='dropdown'>
                <button id='dropbtn'>
                  <div id='container-info-logo'>
                    <i className="fa-solid fa-circle-info" id='info'></i>
                  </div>
                </button>
                <div id='dropdown-content'>
                  <Link to={'/about'} id='link-about'>About Rack Overflow</Link>
                </div>
              </div>
            </div>
          </div>
      );
    } else {
      return (
        <>
        {showModal && (
          <Modal closeModal={() => setShowModal(false)} component={<LoginForm />} />
        )}
        {showModalSignup && (
          <Modal closeModal={() => setShowModalSignup(false)} component={<SignupForm />} />
        )}
          <div id="nav-bar">
            <div id='container-links-main'>
              <Link id='link-main' to={'/'} >
                <img src={image} width='45px' height='45px' id='img-main' ></img>
                <label id='name-webpage'>Rack Overflow</label>
              </Link>
            </div>
            <label id='container-search'> <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
              <input type='text' placeholder='Search Rack Overflow' id='search-bar'
                onChange={(e) => setValueSearch(e.target.value)}
              />
            </label>
            <div id='conteiner-buttons'>
              <label>
                <button onClick={loginDemo} id='button-demo-user'><i className="fa-solid fa-user-secret"></i> Demo User</button>
              </label>
              <label>
                <button onClick={() => setShowModal(prev => !prev)} id='link-login'>Login</button>
              </label>
              <label>
                <button onClick={() => setShowModalSignup(prev => !prev)} id='link-signup'>Sign up</button>
              </label>
              {/* <div id='dropdown'>
                <button id='dropbtn'>
                  <div id='container-info-logo'>
                    <i className="fa-solid fa-circle-info" id='info'></i>
                  </div>
                </button>
                <div id='dropdown-content'>
                  <Link to={'/about'} id='link-about'>About Rack Overflow</Link>
                </div>
              </div> */}
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;