import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';
import Modal from '../../modal/Modal';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} component={<SignupForm />} />
      )}
      <form className="session-form" onSubmit={handleSubmit}>
        <label id='login-title'>Log In</label>
        <div id='container-text-info'>
          <label id='text-info'>By continuing, you are setting up a
            Rack Overflow
            account and agree to our User Agreement.
          </label>
        </div>
        <label className="errors">{errors?.email}</label>
        <div id='container-email'>
          <input type="text" id='email'
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <div id='container-password'>
          <input type="password" id='password'
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        <div id='container-submit'>
          <input
            type="submit" id='submit-button'
            value="Log In"
            disabled={!email || !password}
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;