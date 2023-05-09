import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import './SignupForm.css';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <form className="session-form-signup" onSubmit={handleSubmit}>
      <label id='signup-title'>Sign Up</label>
      <div id='container-text-info'>
          <label id='text-info'>By continuing, you are setting up a
            Rack Overflow
            account and agree to our User Agreement.
          </label>
      </div>
      <div className="errors">{errors?.email}</div>
      <div id='container-email-signup'>
        <input type="text" id='email-signup'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </div>
      <div className="errors">{errors?.username}</div>
      <div id='container-username-signup'>
        <input type="text" id='username'
          value={username}
          onChange={update('username')}
          placeholder="Username"
        />
      </div>
      <div className="errors">{errors?.password}</div>
      <div id='container-password-signup'>
        <input type="password" id='password-signup'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </div>
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <div id='container-confirm-pass'>
        <input type="password" id='confirm-password'
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
        />
      </div>
      <div id='container-submit-signup'>
        <input
          type="submit" id='submit-signup'
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </div>
    </form>
  );
}

export default SignupForm;