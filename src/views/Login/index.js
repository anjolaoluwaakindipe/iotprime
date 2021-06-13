import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// installed packages
import { Link, Redirect, useHistory } from 'react-router-dom';

// css
import './Login.scss';

// components
import Button from '../sharedcomponents/Button';
import TextField from '../sharedcomponents/TextField';
import userServices from '../../services/user.services';

// redux actions
import {
  loginUserFailure,
  loginUserSuccess,
} from '../../redux/Auth/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await userServices.login(email, password);
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    if (tokenStorage) {
      await userServices
        .userData(tokenStorage.token)
        .then((data) => {
          if (data.success) {
            dispatch(loginUserSuccess(data.data));

            history.push('/dashboard');
          }
        })
        .catch((error) => {
          dispatch(loginUserFailure);
        });
    }
  };

  if (isLogged) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='Login_container'>
      <div className='Login_content'>
        <div className='Login_jumbo'>
          <p className='Login__jumbo-text'>
            “The IoT is big news because it ups the ante: ‘Reach out and touch
            somebody’ is becoming ‘reach out and touch everything’.” — Parker
            Trewin
          </p>
        </div>
        <div className='Login_fade'></div>
        <div className='Login_form-container'>
          <div className='Login_form'>
            <h1 className='Login_title'>Sign In</h1>

            <form action=''>
              <label htmlFor='' className='Login_form-label'>
                Email
              </label>
              <TextField
                className='Login_input'
                type='email'
                name='email'
                onChange={onChangeEmail}
                value={email}
              />
              <label htmlFor='' className='Login_form-label'>
                Password
              </label>
              <TextField
                className='Login_input'
                type='password'
                name='pasword'
                onChange={onChangePassword}
                value={password}
              />
              <Button
                type='submit'
                className='Button_primary Login__button'
                to='/dashboard'
                onClick={onSubmit}
                isDisabled={isDisabled}
              >
                Sign In
              </Button>
            </form>

            <p className='Login_footer'>
              Don't have an account? &nbsp;
              <Link to='/register' className='Login_link'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
