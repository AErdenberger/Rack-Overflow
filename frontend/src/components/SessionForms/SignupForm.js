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
  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;
  
    switch (field) {
      case 'email':
        setState = value => {
          setEmailTouched(true);
          setEmail(value);
        };
        break;
      case 'username':
        setState = value => {
          setUsernameTouched(true);
          setUsername(value);
        };
        break;
      case 'password':
        setState = value => {
          setPasswordTouched(true);
          setPassword(value);
        };
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

  const testValidEmail = (email) => {
    const emailRegEx = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const isValidEmail = emailRegEx.test(email);
    return isValidEmail;
  }

  const testPasswordLength = (password) => {
    if (password.length >= 6 && password.length <= 30) {
      return true
    }
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
      <div className="signup-errors">
        <div>
          {errors?.email}
        </div>
        <div>
          {emailTouched && email.trim() === '' && 'Email is required'}
        </div>
        <div>
          {emailTouched && !testValidEmail(email) && 'Must conform to valid email format'}
        </div>
      </div>
      <div id='container-email-signup'>
        <input
          type="text"
          id="email-signup"
          value={email}
          onChange={update('email')}
          onBlur={() => setEmailTouched(true)}
          placeholder="Email"
        />
      </div>
      <div className="signup-errors">
        <div>
          {errors?.username}
        </div>
        <div>
          {usernameTouched && username.trim() === '' && 'Username is required'}
        </div>
      </div>
      <div id='container-username-signup'>
        <input type="text" id='username'
          value={username}
          onChange={update('username')}
          onBlur={() => setUsernameTouched(true)}
          placeholder="Username"
        />
      </div>
      <div className="signup-errors">
        <div>
          {errors?.password}
        </div>
        <div>
          {passwordTouched && password.trim() === '' && 'Password is required'}
        </div>
        <div>
          {passwordTouched && !testPasswordLength(password) && 'Must be between 6 and 30 characters'}
        </div>
      </div>
      <div id='container-password-signup'>
        <input type="password" id='password-signup'
          value={password}
          onChange={update('password')}
          onBlur={() => setPasswordTouched(true)}
          placeholder="Password"
        />
      </div>
      <div className="signup-errors">
        <div>
          {password !== password2 && 'Confirm Password field must match'}
        </div>
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
          disabled={!email || !testValidEmail(email) || !username || !password || password !== password2}
        />
      </div>
    </form>
  );
}

export default SignupForm;